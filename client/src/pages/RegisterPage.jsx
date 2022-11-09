import React, {Component, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {registerUser} from "../redux/features/authSlice";

export const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //for changing state
    const dispatch = useDispatch();

    const handleSubmit = () => {
        console.log('test!')
        try {
            dispatch(registerUser({username, password}));
            //clear form
            setPassword('');
            setUsername('');
        } catch (e) {

        }
    }

    return <form onSubmit={e => e.preventDefault()}
                 className='w-1/4 h-60 mx-auto mt-40'
    >
        <h1 className='text-lg text-white text-center'>Registration</h1>
        <label className='text-xs text-gray-400'>
            Username:
            <input type="text"
                   value={username}
                   onChange={e => setUsername(e.target.value)}
                   placeholder='Username'
                   className='h-10 mt-1 text-black w-full rounded-sm bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-600'
            />
        </label>

        <label className='text-xs text-gray-400'>
            Password:
            <input type="password"
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                   placeholder='Password'
                   className='h-10 mt-1 text-black w-full rounded-sm bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-600'
            />
        </label>

        <div className='flex gap-8 justify-center mt-4'>
            <button type='submit'
                    onClick={() => handleSubmit()}
                    className='flex justify-center items center text-xs bg-gray-600 text-white rounded-sm py-2 px-4'>
                Confirm
            </button>

            <Link to='/login'
                  className='flex justify-center items-center text-xs text-white'
            >
                Already registered ?
            </Link>
        </div>
    </form>
}


export default RegisterPage;