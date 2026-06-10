import { Navigate } from "react-router-dom";

function ProtectedRoute({login,children}){
    if(!login){
        return <Navigate to='/login' />
    }
    return (
        children
    );
}
export default ProtectedRoute;