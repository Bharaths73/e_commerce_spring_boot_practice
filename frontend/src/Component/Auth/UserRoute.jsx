import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const UserRoute=({children})=>{
    const {token,role}=useSelector(state=>state.user);

    if(token!==null && role!="ADMIN"){
        return children;
    }

        return <Navigate to="/" />;
    
}