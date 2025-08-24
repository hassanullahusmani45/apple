import { configureStore } from '@reduxjs/toolkit';
import statsReducer from './slices/statsSlice';
import homeReducer from './slices/homeSlice';
import articleCategoryCount from './slices/articleCategoryCount';
import articleReducer from './slices/article/articleSlice'


export const store = configureStore({
    reducer: {
        stats: statsReducer, // this for managing statistics data
        home: homeReducer, // this for managing home page data
        categoryCount: articleCategoryCount, // this for managing article category counts
        article: articleReducer, // this for show article ditails 

    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;