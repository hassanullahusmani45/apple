import { supabase } from "../../../lib/SupabaseClient";
import { store } from "../../store";
import { setCheckingSession, setUser } from "./authSlice";

export const initAuthListener = async () => {
  store.dispatch(setCheckingSession(true));

  const { data: sessionData } = await supabase.auth.getSession();

  if (sessionData.session?.user) {
    const { data: visitor } = await supabase
      .from("visitors")
      .select("*")
      .eq("id", sessionData.session.user.id)
      .single();

    store.dispatch(setUser(visitor ?? null));
  } else {
    store.dispatch(setUser(null));
  }

  store.dispatch(setCheckingSession(false));

  supabase.auth.onAuthStateChange(async (_event, session) => {
    if (session?.user) {
      const { data: visitor } = await supabase
        .from("visitors")
        .select("*")
        .eq("id", session.user.id)
        .single();

      store.dispatch(setUser(visitor ?? null));
    } else {
      store.dispatch(setUser(null));
    }
  });
};