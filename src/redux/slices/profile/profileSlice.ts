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
    profileImgloading: boolean;
    successProfileImg: boolean;
    successPassword: boolean;
    nameError: string | null;
    passwordError: string | null;
    profileImgError: string | null;
    profileImage: string | null;
    updatedUser: {
        id?: string;
        first_name?: string;
        last_name?: string;
    } | null;
}

const initialState: ProfileState = {
    nameloading: false,
    passwordloading: false,
    profileImgloading: false,
    profileImgError: null,
    profileImage: null,
    successProfileImg: false,
    successPassword: false,
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

        supabase.auth.updateUser({
            password: new_password
        })
            .then(({ error }) => {
                if (error) throw new Error(error.message);
            })
            .catch((err) => rejectWithValue(err.message));
        return true;
    }
);


export const updateProfileImge = createAsyncThunk(
    'profile/updateProfileImge',
    async ({ profile, id }: { profile: File; id: string }, { rejectWithValue }) => {

        const ext = profile.name.split('.').pop()?.toLowerCase();
        if (!ext) return rejectWithValue("Invalid file extension");

        const sanitizedId = id.replace(/[^a-zA-Z0-9_-]/g, "_");
        const profilePath = `profiles/${sanitizedId}_profile.${ext}`;

        const { error: uploadError } = await supabase.storage
            .from("avatars")
            .upload(profilePath, profile, {
                cacheControl: "3600",
                upsert: true,
            });

        if (uploadError) {
            console.log("Some thing went wrong!");
            return rejectWithValue(uploadError.message || "مشکل بیش آمده هست");
        }

        const { data: signedURLData, error: signedUrlError } = await supabase.storage
            .from("avatars")
            .createSignedUrl(profilePath, 31622400);
        // one year after this image URL is expired

        if (signedUrlError) return rejectWithValue(signedUrlError.message);

        const signedURL = signedURLData.signedUrl;

        // ذخیره لینک در جدول visitors
        const { error: updateUserProfileError } = await supabase
            .from("visitors")
            .update({ profile: signedURL })
            .eq("id", id);

        if (updateUserProfileError) return rejectWithValue(updateUserProfileError.message);

        return signedURL;
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
                state.successPassword = false;
            })
            .addCase(updatePassword.fulfilled, (state) => {
                state.passwordloading = false;
                state.successPassword = true;
                state.passwordError = null;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.successPassword = false;
                state.passwordloading = false;
                state.passwordError = action.error.message || "";
            })
            // update profile Image
            .addCase(updateProfileImge.pending, (state) => {
                state.profileImgloading = true;
                state.profileImgError = null;
                state.successProfileImg = false;
            })
            .addCase(updateProfileImge.fulfilled, (state, action) => {
                state.profileImgloading = false;
                state.successProfileImg = true;
                state.profileImgError = null;
                state.profileImage = action.payload;
            })
            .addCase(updateProfileImge.rejected, (state, action) => {
                state.successProfileImg = false;
                state.profileImgloading = false;
                state.profileImgError = action.error.message || "";
            })
    }
});

export default profileSlice.reducer;