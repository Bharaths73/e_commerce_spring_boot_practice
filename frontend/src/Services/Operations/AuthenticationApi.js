import { resetCart } from "../../redux/Slice/CartSlice";
import { setRole, setToken, setUser } from "../../redux/Slice/UserSlice";
import { apiConnector } from "./ApiConnector"
const REACT_APP_BASE_URL='http://localhost:8080/api'

export function LoginAuth(data){
    return async(dispatch)=>{
    console.log(data);
    
        // const token =  btoa(`${data.name}:${data.password}`).toString('base64');
        // api.defaults.headers.common['Authorization'] = `Basic ${token}`;
    try {
        const response=await apiConnector("POST",REACT_APP_BASE_URL+"/user/login",data);

        console.log("login response is ",response);

        if(!response.status===200){
            throw new Error(response.data.error)
        }
            console.log(response);
            dispatch(setToken(response.data.data.token))
            dispatch(setUser(response.data.data.email))
            dispatch(setRole(response.data.data.role))
            localStorage.setItem("token",JSON.stringify(response.data.data.token));
            localStorage.setItem("email",JSON.stringify(response.data.data.email));
            localStorage.setItem("role",JSON.stringify(response.data.data.role));

    } catch (error) {
        console.log("Failed to login",error);
    }
}
}

export const registerAuth=async(data,navigate)=>{
    let result;
    try {
        const response=await apiConnector("POST",REACT_APP_BASE_URL+'/user/register',data);

        console.log("register response is ",response);

        if(!response.status===200){
            throw new Error(response.data.error)
        }
        else{
            result=response.data.data;
            navigate("/login")
        }
    } catch (error) {
        console.log("Failed to register",error);
    }
    return result;
}

export const otpAuth=async(username,email,navigate)=>{
    let result;
    const data={
        username,
        email
    }
    try {
        const response=await apiConnector("POST",REACT_APP_BASE_URL+'/user/otp',data);

        console.log("otp response is ",response);

        if(!response.status===200){
            throw new Error(response.data.error)
        }
        else{
            result=response.data.data;
            navigate("/otp")
        }
    } catch (error) {
        console.log("Failed to send otp",error);
    }
    return result;
}

export const getUserDetails=async(data,token)=>{
    const request={
        email:data
    }
    console.log("request is ",request);
    
    let result;
    try {
        const response=await apiConnector("POST",REACT_APP_BASE_URL+'/user/profile',request,{Authorization:`Bearer ${token}`});

        console.log("get user Details response is ",response);

        if(!response.status===200){
            throw new Error(response.data.error)
        }
        else{
            result=response.data.data;
            console.log("");
            
        }
    } catch (error) {
        console.log("Failed to register",error);
    }
    return result;
}

export const logout=(dispatch,navigate)=>{
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart(null))
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("role")
    navigate("/")
}