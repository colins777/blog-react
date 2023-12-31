import React, {Component} from 'react';
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth, logout} from "../redux/features/authSlice";
import {toast} from "react-toastify";

export const Navbar = () => {

    const activeStyles = {
        color: 'white'
    };

    //Check if user autorized
   const isAuth = useSelector(checkIsAuth);
   const dispatch = useDispatch();

    const logoutHandler = () => {
        //dispatch action logout
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('Logout done!')
    }

    return <div className='flex py-4 justify-between items-center'>
        <span className='flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm'>E</span>

        {isAuth && (        <ul className='flex gap-8'>
            <li>
                <NavLink to={'/'} href="/"
                         className='text-sm text-gray-400 hover:text-white'
                         style={({isActive}) =>
                             isActive ? activeStyles : undefined
                         }
                >
                    Main
                </NavLink>
            </li>

            <li>
                <NavLink to={'/posts'}
                         href="/"
                         className='text-sm text-gray-400 hover:text-white'
                         style={({isActive}) =>
                             isActive ? activeStyles : undefined
                         }
                >My posts</NavLink>
            </li>

            <li>
                <NavLink to={'/new'}
                         href="/"
                         className='text-sm text-gray-400 hover:text-white'
                         style={({isActive}) =>
                             isActive ? activeStyles : undefined
                         }
                >
                    Add post</NavLink>
            </li>
        </ul>)}



        <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
            {
                isAuth ? (
                    <button
                        onClick={() => logoutHandler()}
                    >Log out</button>
                ) : (
                    <Link to={'/login'} >Login</Link>
                )
            }

        </div>
    </div>
}


export default Navbar;
