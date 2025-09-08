import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks"
import type { JSX } from "react";

export const ProtectedRout = ({ children }: { children: JSX.Element }) => {
    const { user, checkingSession } = useAppSelector(state => state.auth);

    // if (checkingSession) {
    //     return <div className='w-full h-[40vh] flex justify-center items-center text-4xl font-extrabold'>Auth loading</div>
    // }

    if (!user && !checkingSession) {
        return <Navigate to={'/login'} replace />
    }

    return children
};




export const GuestRoute = ({ children }: { children: JSX.Element }) => {
    const { user, checkingSession } = useAppSelector(state => state.auth);

    // if (checkingSession) {
    //     return <div className='w-full h-[40vh] flex justify-center items-center text-4xl font-extrabold'>Auth loading</div>
    // }

    if (user  && !checkingSession) {
        return <Navigate to={'/'} replace />
    }

    return children;
}