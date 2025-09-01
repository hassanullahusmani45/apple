import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../../lib/SupabaseClient";


interface updateFullNameType {
    id: string;
    first_name: string;
    last_name: string;
};


interface ProfileState {
    nameloading: boolean;
    passwordloading: boolean;
    success: boolean;
    nameError: string | null;
    passwordError: string | null;
    updatedUser: {
        id?: string;
        first_name?: string;
        last_name?: string;
    } | null;
}

const initialState: ProfileState = {
    nameloading: false,
    passwordloading: false,
    success: false,
    nameError: null,
    passwordError: null,
    updatedUser: null,
}


export const updateFullName = createAsyncThunk(
    'profile/updateFullName',
    async ({ id, first_name, last_name }: updateFullNameType, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase
                .from('visitors')
                .update({ first_name, last_name })
                .eq('id', id)
                .select("first_name, last_name")
                .single();

            if (error) return rejectWithValue(error.message);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message || "Unexpected error");
        }
    }
);

export const updatePassword = createAsyncThunk(
    'profile/updatePassword',
    async (new_password: string, { rejectWithValue }) => {


        const { data, error: updatePasswordError } = await supabase.auth.updateUser({
            password: new_password,
        });
        if (updatePasswordError) {
            return rejectWithValue(updatePasswordError.message);
        }
        return data;
    }
);


const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // visitors update names
            .addCase(updateFullName.pending, (state) => {
                state.nameloading = true;
                state.nameError = null;
            })
            .addCase(updateFullName.fulfilled, (state, action) => {
                state.nameloading = false;
                state.nameError = null;
                state.updatedUser = action.payload;
            })
            .addCase(updateFullName.rejected, (state, action) => {
                state.nameError = (action.payload as string) || action.error.message || null;
                state.nameloading = false;
            })

            // update password
            .addCase(updatePassword.pending, (state) => {
                state.passwordloading = true;
                state.passwordError = null;
                state.success = false;
            })
            .addCase(updatePassword.fulfilled, (state) => {
                state.passwordloading = false;
                state.success = true;
                state.passwordError = null;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.success = false;
                state.passwordloading = false;
                state.passwordError = action.error.message || "";
            })
    }
});

export default profileSlice.reducer;