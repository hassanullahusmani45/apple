import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/SupabaseClient";



interface StatsState {
    teamMembers: number;
    articles: number;
    comments: number;
    subscribers: number;
    loading: boolean;
    error: string | null;
    fetched: boolean;
}


const initialState: StatsState = {
    teamMembers: 0,
    articles: 0,
    comments: 0,
    subscribers: 0,
    loading: false,
    error: null,
    fetched: false
}

export const fetchStats = createAsyncThunk(
    'stats/fetchStats',
    async () => {
        const { count: teamMembers } = await supabase
            .from('team_members')
            .select('id', { count: 'exact', head: true });

        const { count: articles } = await supabase
            .from('articles')
            .select('id', { count: 'exact', head: true });

        const { count: comments } = await supabase
            .from('comments')
            .select('id', { count: "exact", head: true });

        const { count: subscribers } = await supabase
            .from('visitors')
            .select('id', { count: "exact", head: true });

            console.log(`Team Members: ${teamMembers}, Articles: ${articles}, Comments: ${comments}, Subscribers: ${subscribers}`);
            

        return { teamMembers, articles, comments, subscribers };
    }
)


const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStats.fulfilled, (state, action) => {
                state.loading = false;
                state.fetched = true;
                state.error = null;
                state.teamMembers = action.payload.teamMembers || 0;
                state.articles = action.payload.articles || 0;
                state.comments = action.payload.comments || 0;
                state.subscribers = action.payload.subscribers || 0;
            })
            .addCase(fetchStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch stats';
                state.teamMembers = 0;
                state.articles = 0;
                state.comments = 0;
                state.subscribers = 0;
            });
    }

});

export default statsSlice.reducer;