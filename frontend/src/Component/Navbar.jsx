import {React} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../Services/Operations/AuthenticationApi';

export const Navbar=()=>{

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {token,role}=useSelector(state=>state.user);

    function logoutHandler(){
        logout(dispatch,navigate);
    }

    return(
        <div className='w-full bg-black sm:h-16 max-h-max text-white flex items-center justify-center sm:py-0 py-5'>
            <div className='w-11/12 flex sm:flex-row flex-col items-center gap-5 justify-between '>
            <div className=''>
                <h1 className='text-2xl font-semibold'>E commerce</h1>
            </div>
               <div className='flex sm:flex-row flex-col items-center gap-10 text-lg'>
                  <Link to={'/'}>Home</Link>
                  {
                    token!==null ? (
                        <div className='flex sm:flex-row flex-col items-center gap-10 text-lg'>
                            {
                                role==="ADMIN" && (
                                    <Link to={'/addProduct'}>Add Product</Link>
                                )
                            }
                            
                            {
                                role==="USER" && (
                                    <Link to={'/cart'}>Cart</Link>
                                )
                            }
                            <Link to={'/profile'}>Profile</Link>
                            <button onClick={logoutHandler}>Logout</button>
                        </div>
                    ) :(
                        <div className='flex flex-row items-center gap-10 text-lg'>
                            <Link to={'/login'}>Login</Link>
                            <Link to={'/register'}>Register</Link>
                            
                        </div>
                    )
                  }
               </div>
            </div>
        </div>
    )
}