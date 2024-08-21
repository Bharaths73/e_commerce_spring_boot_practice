import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const OpenRoute=({children})=>{
    const {token} =useSelector((state)=>state.user)

    console.log("children is ",children);
    
    if (token !== null && location.pathname !== '/') {
        return <Navigate to="/" />;
    }

    return children
}