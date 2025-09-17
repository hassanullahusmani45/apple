import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../lib/SupabaseClient";
import type { Article } from "../../../types/type";


interface ArticleState {
    article: Article | null;
    loading: boolean;
    error: string | null;
}

const initialState: ArticleState = {
    article: null,
    loading: false,
    error: null,
};

export const fetchArticleData = createAsyncThunk(
    'article/fetchArticleData'
    , async (title: string) => {
        const { data: article } = await supabase
            .from('articles')
            .select(`*,team_members (*),article_sections (*)`)
            .eq('title', title)
            .single();

        return article;
    }
);


const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchArticleData.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.article = action.payload;
            })
            .addCase(fetchArticleData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch article data"
            })
    }
});

export default articleSlice.reducer;