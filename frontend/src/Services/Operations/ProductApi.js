import { useDispatch } from "react-redux";
import { apiConnector } from "./ApiConnector"
import { resetCart } from "../../redux/Slice/CartSlice";
const REACT_APP_BASE_URL='http://localhost:8080/api'
export const fetchProducts=async()=>{
    let result=[];
    try {
        const response=await apiConnector("GET",REACT_APP_BASE_URL+"/user/products");

        console.log("Products are ",response);

        if(!response.status===200){
            throw new Error(response.data.message)
        }
        else{
            result=response.data.data;
        }
    } catch (error) {
        console.log("Failed to fetch products",error);
    }
    return result;
}

export const getProduct=async(id,token)=>{
    let result;
    try {
        const response=await apiConnector("GET",REACT_APP_BASE_URL+`/user/product/${id}`,null,{Authorization:`Bearer ${token}`});

        console.log("get product is ",response);

        if(!response.status===200){
            throw new Error(response.data.message)
        }
        else{
            result=response.data.data;
        }
    } catch (error) {
        console.log("Failed to fetch products",error);
    }
    return result;
}

export const addProduct=async(data,token)=>{
    let result;
    try {
        const response=await apiConnector("POST",REACT_APP_BASE_URL+`/admin/product`,data,{Authorization:`Bearer ${token}`});

        console.log("add product is ",response);

        if(!response.status===200){
            throw new Error(response.data.message)
        }
        else{
            result=response.data.data;
        }
    } catch (error) {
        console.log("Failed to fetch products",error);
    }
    return result;
}

export const checkOutProducts=async(data,dispatch)=>{
    let result;
    try {
        // const response=await apiConnector("POST",REACT_APP_BASE_URL+`/checkout`,data);

        // console.log("checkout product reponse is ",response);

        // if(!response.status===200){
        //     throw new Error(response.data.message)
        // }
        // else{
            // result=response.data;
            dispatch(resetCart());
        // }
    } catch (error) {
        console.log("Failed to checkout products",error);
    }
    return result;
}