import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { loginType, registerType } from '../../../types/type'
import { supabase } from "../../../lib/SupabaseClient";
import type { User } from "@supabase/supabase-js";

interface authState {
    loading: boolean;
    error: string | null;
    success: boolean;
    user: User | null;
    checkingSession: boolean;
}

const initialState: authState = {
    loading: false,
    error: null,
    success: false,
    user: null,
    checkingSession: true,
}

export const registeration = createAsyncThunk(
    'auth/registeration',
    async (data: registerType, { rejectWithValue }) => {
        const { email, password, first_name, last_name } = data;

        const { data: visitorUser, error: registerError } = await supabase
            .auth.signUp({
                email, password,
                options: {
                    data: { first_name, last_name }  // This data is go to or stor in user_metadata.
                }
            });

        if (registerError) {
            if (registerError.status === 429) {
                return rejectWithValue("You are doing this too frequently. Please try again later.");
            }
            if (registerError.status === 400) {
                return rejectWithValue("Email address is invalid or already registered.");
            }
            if (registerError.status === 422) {
                return rejectWithValue("A User already registered by this Email address.");
            }
            return rejectWithValue("Something wase wrong during registration.");
        }

        const { error: insertVisitorError } = await supabase
            .from("visitors")
            .insert({
                id: visitorUser.user?.id,
                email,
                first_name,
                last_name,
                role_id: 3
            })

        if (insertVisitorError) {
            return rejectWithValue(insertVisitorError.message);
        }

        return { user: visitorUser.user };
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (data: loginType, { rejectWithValue }) => {

        const { data: userData, error: loginError } = await supabase
            .auth.signInWithPassword({
                email: data.email,
                password: data.password
            });

        if (loginError) {
            if (loginError.status === 429) {
                return rejectWithValue("You are doing this too frequently. Please try again later.");
            }
            if (loginError.status === 400) {
                return rejectWithValue("Please check your email or password.");
            }
            return rejectWithValue("Something wase wrong. Please try again later.");
        }

        return { user: userData.user }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            return rejectWithValue(error.message)
        }
        return true;
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },
        setCheckingSession: (state, action) => {
            state.checkingSession = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registeration.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false
            })
            .addCase(registeration.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.user = action.payload.user;
            })
            .addCase(registeration.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload as string;
            })

            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload as string;
            })

            // Logout
            .addCase(logoutUser.pending, (state) => {
                state.user = null;
                state.success = false;
                state.loading = true;
            });
    }
});

export const { resetStatus, setUser, setCheckingSession } = authSlice.actions;
export default authSlice.reducer;