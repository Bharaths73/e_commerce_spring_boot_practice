import {React} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { increment } from '../redux/Slice/CartSlice';


export const Card=({data})=>{
    const dispatch=useDispatch();
    const {token,role} =useSelector(state=>state.user);
    // const isPresentInCart = useSelector((state)=>isProductInCart(state,data.id));
    // const imageUrl=URL.createObjectURL(data.imageDate);
    return(
        <div className='bg-slate-900 text-white flex flex-col gap-5 px-10 py-7 border-spacing-2 rounded-lg'>
            <Link to={`/getProduct/${data.id}`} className='flex flex-col gap-2'>
               <img src={data.imageDate} className='w-60 h-60 mx-auto' /> 
               <p className=' text-lg text-white font-semibold'>{data.name}</p>
               <p className='text-white'>{data.price}</p>
               </Link>
                {
                    token!==null && role!=="ADMIN" &&
                    (
                        data.available && data.itemQuantity>0 ? (<button onClick={()=>dispatch(increment(data))} className='bg-yellow-200 text-black px-3 py-2 border-spacing-2 rounded-lg'>Add to Cart</button>)   : (<button disabled className='bg-red-500 text-black px-3 py-2 border-spacing-2 rounded-lg'>Out of Stock</button>)
                    )
                }
            
        </div>
    )
}