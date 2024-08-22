import { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'
import { useDispatch, useSelector } from "react-redux";
import { registerAuth } from '../Services/Operations/AuthenticationApi';
import { useNavigate } from "react-router-dom";

export const Otp=()=>{
    const [otp,setOtp]=useState("");
    const {signUpData}=useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const VerifyDetailsHandler=async(e)=>{
        e.preventDefault();
        const details={
            ...signUpData,
            otp
        }
        console.log("user details is ",details);
        
        const result=await registerAuth(details,navigate);
        if(result){
            alert("Registered successfully")
        }
    }

    useEffect(()=>{
        if(!signUpData){
            navigate("/login")
        }
},[])

    return(
        <div className="max-w-[500px] p-4 lg:p-8 mx-auto">
            <form onSubmit={VerifyDetailsHandler}>
                <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props)=>(
                    <input
                    {...props}
                    placeholder='-'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                    />
                )}
                containerStyle={{
                    justifyContent: "space-between",
                    gap: "0 6px",
                  }}
                />
                <button type="submit"
              className="w-full bg-yellow-400 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">Verify Email</button>
            </form>
        </div>
    )
}