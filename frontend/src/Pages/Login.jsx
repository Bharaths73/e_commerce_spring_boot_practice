import {React, useState} from 'react';
import { LoginAuth } from '../Services/Operations/AuthenticationApi';
import { useDispatch } from 'react-redux';

export const Login=()=>{

    const dispatch=useDispatch();

    const [data,setData]=useState({
        email:'',
        password:''
    })

    function changeHandler(e){
        const name=e.target.name
        setData(prev=>{
           return{
              ...prev,
            [name]:e.target.value,
           }
        })
    }

    async function submitHandler(e){
        e.preventDefault();
        dispatch(LoginAuth(data))
        
        setData({
            email:"",
            password:""
        })
    }

    return(
        <div className='w-full flex flex-col items-center'>
            <form onSubmit={submitHandler} className='md:w-[40%] w-[70%] flex flex-col py-10 gap-5'>
                <div  className='flex flex-col gap-2'>
                    <label className='text-white font-semibold'>User Name</label>
                    <input type='text' placeholder='Enter Name' onChange={changeHandler} value={data.email} className='border rounded-md px-2 py-2 outline-none' name='email'/>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-white font-semibold'>Password</label>
                    <input type='text' placeholder='Enter Password' onChange={changeHandler} value={data.password} className='border rounded-md px-2 py-2 outline-none' name='password'/>
                </div>

                <button className='bg-yellow-300 px-20 py-2 mx-auto border-yellow-300 rounded-md'>Login</button>
            </form>
        </div>
    )
}