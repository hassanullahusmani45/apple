import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../../lib/SupabaseClient";


interface updateFullNameType {
    id: string;
    first_name: string;
    last_name: string
};

interface ProfileState {
    loading: boolean;
    error: string | null;
    updatedUser: {
        id?: string;
        first_name?: string;
        last_name?: string;
    } | null;
}

const initialState: ProfileState = {
    loading: false,
    error: null,
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

export const updateAuthUserMetaData = createAsyncThunk(
    'profile/updateAuthUserMetaData',
    async ({ first_name, last_name }: { first_name: string, last_name: string }, { rejectWithValue }) => {
        try {
            const { error } = await supabase.auth.updateUser({
                data: { first_name, last_name }
            });

            if (error) return rejectWithValue(error.message);
            return true;
        } catch (err: any) {
            return rejectWithValue(err.message || "Unexpected error");
        }
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
                state.loading = true;
                state.error = null;
            })
            .addCase(updateFullName.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.updatedUser = action.payload;
            })
            .addCase(updateFullName.rejected, (state, action) => {
                state.error = (action.payload as string) || action.error.message || null;
                state.loading = false;
            })

            // auth metadata
            .addCase(updateAuthUserMetaData.pending, (state) => {
                // state.loading = true;
                state.error = null;
            })
            .addCase(updateAuthUserMetaData.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updateAuthUserMetaData.rejected, (state, action) => {
                state.error = (action.payload as string) || action.error.message || null;
                state.loading = false;
            });
    }
});

export default profileSlice.reducer;