import { configureStore} from '@reduxjs/toolkit';
import statsReducer from './slices/statsSlice';
import homeReducer from './slices/homeSlice';



export const store = configureStore({
    reducer:{
        stats: statsReducer, // this for managing statistics data
        home:homeReducer, // this for managing home page data

    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;