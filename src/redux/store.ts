import { configureStore } from '@reduxjs/toolkit';
import statsReducer from './slices/statsSlice';
import homeReducer from './slices/homeSlice';
import articleCategoryCount from './slices/articleCategoryCount';
import articleReducer from './slices/article/articleSlice'
import teamMemberReducer from './slices/teamMember/teamMemberSlice'
import contactUsReducer from './slices/contactUs/contactUsSlice'
import authReducer from './slices/auth/authSlice'


export const store = configureStore({
    reducer: {
        stats: statsReducer, // this for managing statistics data
        home: homeReducer, // this for managing home page data
        categoryCount: articleCategoryCount, // this for managing article category counts
        article: articleReducer, // this for show article ditails 
        teamMember: teamMemberReducer, // this slice is used for show the TeamMember info and articles 
        contactUs: contactUsReducer, // this usde for stor and get the contact messages
        auth: authReducer, // that is used for Authantication
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;