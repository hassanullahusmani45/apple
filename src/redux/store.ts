import { configureStore} from '@reduxjs/toolkit';
import statsReducer from './slices/statsSlice';



export const store = configureStore({
    reducer:{
        stats: statsReducer // this for managing statistics data
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;