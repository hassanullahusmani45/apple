import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { loginType, registerType } from '../../../types/type'
import { supabase } from "../../../lib/SupabaseClient";

interface authState {
    loading: boolean;
    error: string | null;
    success: boolean;
    user: any | null;
}

const initialState: authState = {
    loading: false,
    error: null,
    success: false,
    user: null
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
            return rejectWithValue("Something went wrong during registration.");
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
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
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
            });
    }
});

export const { resetStatus } = authSlice.actions;
export default authSlice.reducer;