import {React, useState} from 'react';
import { addProduct } from '../Services/Operations/ProductApi';
import { useSelector } from 'react-redux';

export const AddProduct=()=>{
    const {token} =useSelector(state=>state.user)
    const [formDt,setFormDt]=useState({
        name:'',
        brand:'',
        description:'',
        price:'',
        available:'',
        itemQuantity:0
    })
    const[image,setImage]=useState();

    function changeHandler(e){
        const ele=e.target.id;
        setFormDt(prev=>{
            return{
                ...prev,
                [ele]:e.target.value,
            }
        })
    }

    async function addProductDetails(formData){
        const result=await addProduct(formData,token)

        if(result){
            alert("Product added successfully")
            setFormDt(
                {
                      name:'',
                      brand:'',
                      description:'',
                      price:'',
                      available:'',
                      itemQuantity:0
                  }
              )
              setImage('')
              console.log(formDt);
        }
        
    }

    function submitHandler(e){
        e.preventDefault();
        console.log(formDt);
        const formData = new FormData();
        formData.append("imageFile", image);
        formData.append(
        "prod",
        new Blob([JSON.stringify(formDt)], { type: "application/json" })
        );

        addProductDetails(formData);
        
    }

    function imageHandler(e){
        setImage(e.target.files[0])
    }
    return(
        <div className='w-full flex flex-col items-center'>
            <form onSubmit={(e)=>submitHandler(e)} className='md:w-[40%] w-[70%] flex flex-col py-10 gap-5'>
                <div className='flex flex-col gap-2'>
                <label htmlFor='' className='text-white font-semibold'>Product Name</label>
                <input type='text' id='name' placeholder='Enter Product Name' onChange={(e)=>changeHandler(e)} className='border rounded-md px-2 py-2 outline-none' value={formDt.name}/>
                </div>

                <div className='flex flex-col  gap-2'>
                <label htmlFor='' className='text-white font-semibold'>Product Brand</label>
                <input type='text' id='brand' placeholder='Enter Product Brand' onChange={(e)=>changeHandler(e)} className='border rounded-md px-2 py-2 outline-none' value={formDt.brand}/>
                </div>

                <div className='flex flex-col  gap-2'>
                <label htmlFor='' className='text-white font-semibold'>Product Description</label>
                <input type='text' id='description' placeholder='Enter Product Descirption' onChange={(e)=>changeHandler(e)} className='border rounded-md px-2 py-2 outline-none' value={formDt.description}/>
                </div>

               <div className='flex flex-col  gap-2'>
               <label htmlFor='' className='text-white font-semibold'>Product Price</label>
               <input type='number' id='price' placeholder='Enter Product Price' onChange={(e)=>changeHandler(e)} className='border rounded-md px-2 py-2 outline-none' value={formDt.price}/>
               </div>

                <label htmlFor='' className='text-white font-semibold'>Product Image</label>
                <input type='file' id='image' onChange={(e)=>imageHandler(e)} className='text-white'/>

               <div className='flex gap-x-5'>
               <label htmlFor='' className='text-white font-semibold'>Product Available</label>
               <div className='flex text-white gap-5 '>
              <div className='flex gap-1'>
              <input type='radio' id='available' value='true' onChange={(e)=>changeHandler(e)} checked={formDt.available==='true'}/> True
              </div>
               <div className='flex gap-1'>
               <input type='radio' id='available' value='false' onChange={(e)=>changeHandler(e)} checked={formDt.available==='false'}/> False
               </div>
               </div>
               </div>

                {
                    formDt.available==='true' && 
                   <div className='flex flex-col gap-2'>
                     <label htmlFor='' className='text-white font-semibold'>Available Quantity</label>
                     <input type='number' min={1} id='itemQuantity' placeholder='Enter Available Quantity' onChange={(e)=>changeHandler(e)} className='border rounded-md px-2 py-2 outline-none' value={formDt.itemQuantity}/>
                   </div>
                }


                <button className='bg-yellow-300 px-20 py-2 mx-auto border-yellow-300 rounded-md'>Submit</button>
            </form>
        </div>
    )
}