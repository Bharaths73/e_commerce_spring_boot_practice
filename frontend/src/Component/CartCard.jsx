import {React, useState} from 'react';
import { useDispatch } from 'react-redux';
import { decrementQuantity, incrementQuantity, remove } from '../redux/Slice/CartSlice';

export const CartCard=({item})=>{
    const dispatch=useDispatch();
    // const [count,setCount]=useState(1);

    // function decrementHandler(){
    //     console.log(count);
    //     if(count>1){
    //         setCount(count-1);
    //     }
    // }

    // function incrementHandler(){
    //     console.log(count);
    //     if(count>=1){
    //         setCount(count+1);
    //     }
    // }

       
    return(
        <div className='flex flex-row justify-between py-7 items-center border-white rounded-md mx-auto max-h-max sm:w-[90%] lg:w-[70%]'>
                        <div className='flex gap-5 items-center md:flex-row flex-col'>
                            <img src={item.imageDate} className='w-20 h-20'></img>
                        <div className='flex flex-col gap-2'>
                        <p className='font-semi sm:text-xl text-lg'>{item.name}</p>
                        <p className='sm:text-lg text-md'>{item.price}</p>
                        </div>
                        </div>
                        <div className='flex sm:flex-row flex-col gap-x-10 gap-y-5 sm:items-center justify-start'>
                        <div className='flex gap-5 items-center'>
                        <button onClick={()=>dispatch(decrementQuantity(item))} className='text-xl font-semibold bg-black sm:px-3 px-2 py-1'>-</button>
                        <p className='text-xl font-semibold'>{item.quantity}</p>
                        <button onClick={()=>dispatch(incrementQuantity(item))} className='text-xl font-semibold bg-black sm:px-3 px-2 py-1'>+</button>
                        </div>
                        
                        <button onClick={()=>dispatch(remove(item))} className='sm:px-10 sm:py-2 px-6 py-1 bg-red-600 border-red-600 rounded-md text-black'>Delete</button>
                        </div>
                    </div>
    )
}