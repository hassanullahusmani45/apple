import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../lib/SupabaseClient";
import type { Article, commentType } from "../../../types/type";


interface ArticleState {
    article: Article | null;
    comments: commentType[];
    articleDataLoading: boolean;
    articleCommentsLoading: boolean;
    error: string | null;
}

const initialState: ArticleState = {
    article: null,
    comments: [],
    articleDataLoading: false,
    articleCommentsLoading: false,
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

export const fetchArticleComments = createAsyncThunk(
    'article/fetchArticleComments',
    async (article_id: string) => {
        const { data: comments } = await supabase
            .from('comments')
            .select(`*,team_members (first_name,last_name,profile,role_id), visitors (first_name,last_name,profile,role_id)`)
            .eq("article_id", article_id)
            .eq("isShow", true);
        return comments;
    }
);


const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleData.pending, (state) => {
                state.articleDataLoading = true;
            })
            .addCase(fetchArticleData.fulfilled, (state, action) => {
                state.articleDataLoading = false;
                state.error = null;
                state.article = action.payload;
            })
            .addCase(fetchArticleData.rejected, (state, action) => {
                state.articleDataLoading = false;
                state.error = action.error.message || "Failed to fetch article data"
            })
            .addCase(fetchArticleComments.pending, (state) => {
                state.articleCommentsLoading = true;
            })
            .addCase(fetchArticleComments.fulfilled, (state, action) => {
                state.articleCommentsLoading = false;
                state.error = null;
                state.comments = action.payload || [];
            })
            .addCase(fetchArticleComments.rejected, (state, action) => {
                state.articleCommentsLoading = false;
                state.error = action.error.message || "Failed to fetch article data"
            });
    }
});

export default articleSlice.reducer;