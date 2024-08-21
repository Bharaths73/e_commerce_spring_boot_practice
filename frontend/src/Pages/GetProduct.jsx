import {React, useEffect, useState} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getProduct } from '../Services/Operations/ProductApi';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../redux/Slice/CartSlice';

export const GetProduct=()=>{
    const dispatch=useDispatch();
    const {token}=useSelector(state=>state.user)
    const [loading,setLoading]=useState(false);
    const [item,setItem]=useState([]);
    // const location=useLocation();
    // const params=new URLSearchParams(location.search);

    const {id}=useParams();

    const getProductDetails=async()=>{
        setLoading(true);
        console.log("id is ",id);
        const result=await getProduct(id,token)

        if(result){
            setItem(result);
        }
        setLoading(false);
    }
    
    useEffect(()=>{
        getProductDetails()
    },[])

    return(
        <div className='w-11/12 mx-auto mt-10 '>
            {
                loading ? (<div>Loading...</div>):(<div className='flex flex-col mx-auto text-white gap-5 max-w-max border-slate-800 rounded-lg bg-slate-800 py-5 px-10'>
                    <img src={item.imageDate} className='sm:w-96 sm:h-96 w-30 h-30 mt-5 mx-auto'/>
                    <div className='flex flex-col gap-2 pl-3'>
                    <p className=' text-2xl text-white font-semibold'>{item.name}</p>
                    <p>{item.price}</p>
                    </div>
                    {
                        item.available ? (<button onClick={()=>dispatch(increment(item))} className='bg-yellow-200 text-black px-3 py-2 border-spacing-2 rounded-lg mb-7 mx-auto w-full'>Buy Now</button>) : (
                            <button disabled className='bg-red-500 text-black px-3 py-2 border-spacing-2 rounded-lg'>Out of Stock</button>
                        )
                    }
                </div>
            )
            }
        </div>
    )
}