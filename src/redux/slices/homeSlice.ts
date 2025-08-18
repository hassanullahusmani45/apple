import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../lib/SupabaseClient";


interface HomeState {
    teamMembers: any[];
    articles: any[];
    newArticles: any[];
    loading: boolean;
    error: string | null;
}

const initialState: HomeState = {
    teamMembers: [],
    articles: [],
    newArticles: [],
    loading: false,
    error: null
};


export const fetchHomeData = createAsyncThunk(
    "home/featcheHomeData",
    async () => {
        const { data: teamMembers } = await supabase
            .from('team_members')
            .select("*");

        const { data: articles } = await supabase
            .from('articles')
            .select("*");

        return { teamMembers, articles };
    }
)

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHomeData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHomeData.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                state.teamMembers = action.payload.teamMembers ?? [];

                state.articles = (action.payload.articles ?? []).map(article => {
                    const author = state.teamMembers.find(tm => tm.id === article.author_id);
                    return {
                        ...article,
                        authorName: author ? `${author.first_name} ${author.last_name}` : "Unknown",
                    };
                });
                state.newArticles = state.articles.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 6);
                console.log("Fetched articles:", state.articles);
                
            })
            .addCase(fetchHomeData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch home data";
            });
    }
});

export default homeSlice.reducer;