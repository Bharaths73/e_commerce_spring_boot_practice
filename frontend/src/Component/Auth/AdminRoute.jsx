import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

export const AdminRoute=({children})=>{
    const {token,role}=useSelector(state=>state.user);

    if(token!==null && role!="USER"){
        return children;
    }

        return <Navigate to="/" />;
    
}