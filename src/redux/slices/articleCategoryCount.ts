import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/SupabaseClient";

export const fetchCategoryCount = createAsyncThunk(
    "categoryCount/fetchCategoryCount",
    async () => {
        // we join articles with categories to get the count of each category
        const { data } = await supabase
            .from("articles")
            .select("id, categories(name)");

        console.log("Articles with categories:", data);

        // we will count the articles in each category
        const counts: Record<string, number> = {
            security: 0,
            frontend: 0,
            backend: 0,
            artificialIntelligence: 0,
        };

        data?.forEach((row) => {
            const cat = row.categories?.name?.toLowerCase(); // آرایه اول
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
    initialState: {
        security: 0,
        frontend: 0,
        backend: 0,
        artificialIntelligence: 0,
        fetched: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategoryCount.fulfilled, (state, action) => {
            state.security = action.payload.security;
            state.frontend = action.payload.frontend;
            state.backend = action.payload.backend;
            state.artificialIntelligence = action.payload.artificialIntelligence;
            state.fetched = true;
            console.log("ArticlesCategory Count:", action.payload);
        });
    },
});

export default articleCategoryCount.reducer;
