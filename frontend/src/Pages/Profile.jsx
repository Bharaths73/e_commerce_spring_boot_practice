import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getUserDetails } from "../Services/Operations/AuthenticationApi"

export const Profile=()=>{
    const {token}=useSelector(state=>state.user)
    const {email}=useSelector(state=>state.user)
    const [details,setDetails]=useState({})
    const[loading,setLoading]=useState(false)

    const getDetails=async()=>{
        setLoading(true)
        const result=await getUserDetails(email,token);
        console.log(result);
        
        if(result){
            setDetails(result)
        }
        setLoading(false)
    }

    useEffect(()=>{
        getDetails();
    },[])

    return(
        <div>
            {
                loading ? (<div>Loading...</div>) : (
                    <div className="w-11/12 bg-slate-900 mx-auto mt-5 border-slate-900 rounded-lg px-10 py-10 flex flex-col gap-5">
            <div className="text-white flex flex-row items-center gap-3">
                <p className="text-xl font-semibold">Name: </p>
                <p className="text-xl">{details.username}</p>
            </div>

            <div className="text-white flex flex-row items-center gap-3">
                <p className="text-xl font-semibold">Email: </p>
                <p  className="text-xl">{details.email}</p>
            </div>

            <div className="text-white flex flex-row items-center gap-3">
                <p className="text-xl font-semibold">Mobile No: </p>
                <p  className="text-xl">{details.mobile_no}</p>
            </div>

            <div className="text-white flex flex-row items-center gap-3">
                <p className="text-xl font-semibold">Role: </p>
                <p  className="text-xl">{details.role}</p>
            </div>

        </div>
                )
            }
        </div>
    )
}