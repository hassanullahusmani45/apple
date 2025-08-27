import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../../lib/SupabaseClient";
import type { ContactMessageType } from "../../../types/type";

interface ContactUsState {
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: ContactUsState = {
    loading: false,
    error: null,
    success: false,
};

export const createContact = createAsyncThunk(
    "contactUs/createContact",
    async (data: ContactMessageType, { rejectWithValue }) => {
        const { error } = await supabase
            .from("contact_messages")
            .insert([data]);

        if (error) {
            return rejectWithValue(error.message);
        }

        return true;
    }
);

const contactUsSlice = createSlice({
    name: "contactUs",
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
            .addCase(createContact.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createContact.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(createContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.success = false;
            });
    },
});

export const { resetStatus } = contactUsSlice.actions;
export default contactUsSlice.reducer;
