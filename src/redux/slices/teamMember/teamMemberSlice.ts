import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../../lib/SupabaseClient";
import type { Article, TeamMember } from "../../../types/type";

interface TeamMemberState {
    author: TeamMember | null;
    teamMemberArticles: Article[];
    loading: boolean;
    error: string | null;
    savedID: string | null;
}

const initialState: TeamMemberState = {
    author: null,
    teamMemberArticles: [],
    loading: false,
    error: null,
    savedID: null
}


export const fetcheTeamMemberData = createAsyncThunk(
    "teamMember/fetcheTeamMemberData",
    async (id: string) => {
        const { data: author } = await supabase
            .from("team_members")
            .select("*")
            .eq("id", id)
            .single();

        const { data: teamMemberArticles } = await supabase
            .from('articles')
            .select(`*,team_members (id , first_name , last_name)`)
            .eq("author_id", id);

        return { author, teamMemberArticles };
    }
);
const teamMemberSlice = createSlice({
    name: 'teamMember',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetcheTeamMemberData.pending, (state) => {
                state.loading = true;
                state.error = null;

            })
            .addCase(fetcheTeamMemberData.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.author = action.payload.author;
                state.teamMemberArticles = action.payload.teamMemberArticles ?? [];
                state.savedID=action.meta.arg;
            })
            .addCase(fetcheTeamMemberData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to fetch Team Member Data."
            });
    }
});

export default teamMemberSlice.reducer;