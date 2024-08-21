import {React, useState} from 'react';
import { LoginAuth, otpAuth, registerAuth } from '../Services/Operations/AuthenticationApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSignUpData } from '../redux/Slice/UserSlice';

export const Register=()=>{

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [data,setData]=useState({
        username:'',
        password:'',
        email:"",
        mobile_no:"",
        role:""
    })

    function changeHandler(e){
        const { name, value } = e.target;
        setData(prev=>{
           return{
              ...prev,
            [name]:value,
           }
        })
    }

    async function submitHandler(e){
        e.preventDefault();
        console.log(data);
        
        dispatch(setSignUpData(data))
        const {username,email}=data
        const result=await otpAuth(username,email,navigate);
        if(result){
            setData({
                username:"",
                password:"",
                email:"",
                mobile_no:"",
                role:""
            })
        }
    }

    return(
        <div className='w-full flex flex-col items-center'>
            <form onSubmit={submitHandler} className='md:w-[40%] w-[70%] flex flex-col py-10 gap-5'>
                <div  className='flex flex-col gap-2'>
                    <label className='text-white font-semibold'>User Name</label>
                    <input type='text' placeholder='Enter Name' onChange={changeHandler} value={data.username} className='border rounded-md px-2 py-2 outline-none' name='username'/>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-white font-semibold'>Password</label>
                    <input type='text' placeholder='Enter Password' onChange={changeHandler} value={data.password} className='border rounded-md px-2 py-2 outline-none' name='password'/>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-white font-semibold'>Mobile</label>
                    <input type='text' placeholder='Enter Mobile No' onChange={changeHandler} value={data.mobile_no} className='border rounded-md px-2 py-2 outline-none' name='mobile_no'/>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-white font-semibold'>Email</label>
                    <input type='mail' placeholder='Enter Email' onChange={changeHandler} value={data.email} className='border rounded-md px-2 py-2 outline-none' name='email'/>
                </div>
                
                <div className='flex flex-col gap-2'>
                <label className='text-white font-semibold'>Role</label>
                <select name='role' value={data.role} onChange={changeHandler} className='py-2 border rounded-md'>
                    <option value="" disabled>Select an option</option>
                    <option value='ADMIN'>Admin</option>
                    <option value='USER'>User</option>
                </select>
                </div>

                <button className='bg-yellow-300 px-20 py-2 mx-auto mt-2 border-yellow-300 rounded-md'>Register</button>
            </form>
        </div>
    )
}