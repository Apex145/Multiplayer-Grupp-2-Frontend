import { Navigate, Outlet } from "react-router-dom";
import { getPlayerName } from "./session";


export function RequireAuth(){
    return getPlayerName() ? <Outlet/> : <Navigate to="/" replace />
}