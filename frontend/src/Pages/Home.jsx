import {React, useEffect, useState} from 'react';
import { fetchProducts } from '../Services/Operations/ProductApi';
import { Card } from '../Component/Card';

export const Home=()=>{
    const[loading ,setLoading]=useState(true);
    const[products,setProducts]=useState([]);

    const fetchItems=async()=>{
        setLoading(true);
        const result=await fetchProducts();

        if(result.length>0){
            console.log("fetched products are ",result);
            setProducts(result);
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchItems();
    },[])

    return(
        <div className='max-w-maxContent bg-slate-700 flex justify-between'>
            {
                loading ? (<div className='mx-auto text-white text-2xl'>Loading...</div>):(<div className='w-11/12  mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-flow-row px-5 py-10 gap-10 '>
                    {
                        products.map((item,index)=>(
                            <Card data={item} key={index}/>
                        ))
                    }
                </div>)
            }
        </div>
    )
}