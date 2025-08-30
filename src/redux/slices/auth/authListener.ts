import { supabase } from "../../../lib/SupabaseClient"
import { store } from "../../store";
import { setCheckingSession, setUser } from "./authSlice";


export const initAuthListener = () => {

    store.dispatch(setCheckingSession(true));

    supabase.auth.getSession().then(({ data }) => {
        store.dispatch(setUser(data.session?.user ?? null));
        store.dispatch(setCheckingSession(false));
    });


    supabase.auth.onAuthStateChange((_event, session) => {
        store.dispatch(setUser(session?.user ?? null));
    });
};