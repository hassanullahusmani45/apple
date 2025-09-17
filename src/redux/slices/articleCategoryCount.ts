import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/SupabaseClient";

const initialState = {
    security: 0,
    frontend: 0,
    backend: 0,
    artificialIntelligence: 0,
    loading: false,
    fetched: false
}

export const fetchCategoryCount = createAsyncThunk(
    "categoryCount/fetchCategoryCount",
    async () => {
        // we join articles with categories to get the count of each category
        const { data } = await supabase
            .from("articles")
            .select("id, categories(name)");


        // we will count the articles in each category
        const counts: Record<string, number> = {
            security: 0,
            frontend: 0,
            backend: 0,
            artificialIntelligence: 0,
        };

        data?.forEach((row) => {
            const category = Array.isArray(row.categories) ? row.categories[0] : row.categories;
            const cat = category?.name?.toLowerCase(); // آرایه اول
            if (cat === "security") counts.security += 1;
            else if (cat === "frontend") counts.frontend += 1;
            else if (cat === "backend") counts.backend += 1;
            else if (cat === "artificial intelligence") counts.artificialIntelligence += 1;
        });


        return counts;
    }
);

const articleCategoryCount = createSlice({
    name: "categoryCount",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCategoryCount.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchCategoryCount.fulfilled, (state, action) => {
            state.security = action.payload.security;
            state.frontend = action.payload.frontend;
            state.backend = action.payload.backend;
            state.artificialIntelligence = action.payload.artificialIntelligence;
            state.fetched = true;
            state.loading = false;
        });
    },
});

export default articleCategoryCount.reducer;
