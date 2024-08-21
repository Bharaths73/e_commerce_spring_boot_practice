import {React, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from '../redux/Slice/CartSlice';
import { CartCard } from '../Component/CartCard';
import { checkOutProducts } from '../Services/Operations/ProductApi';

export const Cart=()=>{
    const items=useSelector(state=>state.cart.data);
    const dispatch=useDispatch()
    const [buyNow,setBuyNow]=useState(false)

    console.log(items);

    const checkOut=async()=>{
        console.log("items are ",items);
        
            const result=await checkOutProducts(items,dispatch);
            if(result){

            }
    }

        useEffect(()=>{
            if(buyNow){
                checkOut()
                setBuyNow(false)
            }
           
        },[buyNow])
    
    return(
        <div className='w-11/12 mx-auto py-5 text-white  px-5  gap-y-5'>
            {
                items.map((item,index)=>(
                    <CartCard item={item} key={index}/>
                ))
            }
           <div className='flex flex-row-reverse sm:w-[95%] lg:w-[85%]'>
           <button onClick={()=>setBuyNow(true)} className='px-3 py-2 mt-5 bg-yellow-300 border-yellow-300 rounded-md text-black'>Check Out</button>
           </div>
           </div>
    )
}
