import React, {Component, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth, loginUser} from "../redux/features/authSlice";
import {toast} from "react-toastify";

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {status} = useSelector(state => state.auth);
    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('isAuth', isAuth)

        if(status) {
            toast(status)
        }
       if(isAuth) navigate('/')
        //dependencies for change
    }, [status, isAuth, navigate]);

    const handleSubmit = () => {
        //console.log('Login')
        try {
            dispatch(loginUser({username, password}));
            setPassword('');
            setUsername('');
        } catch (e) {console.log('Error', e)}
    };

    return <form onSubmit={e => e.preventDefault()}
        className='w-1/4 h-60 mx-auto mt-40'
    >
        <h1 className='text-lg text-white text-center'>Autorization</h1>
        <label className='text-xs text-gray-400'>
            Username:
            <input type="text" placeholder='Username'
                   value={username}
                   onChange={e => setUsername(e.target.value)}
                className='h-10 mt-1 text-black w-full rounded-sm bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-600'
            />
        </label>

        <label className='text-xs text-gray-400'>
            Password:
            <input type="password" placeholder='Password'
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                   className='h-10 mt-1 text-black w-full rounded-sm bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-600'
            />
        </label>

        <div className='flex gap-8 justify-center mt-4'>
            <button type='submit'
                    className='flex justify-center items center text-xs bg-gray-600 text-white rounded-sm py-2 px-4'
                    onClick={() => handleSubmit()}
            >
                Login
            </button>

            <Link to='/register'
            className='flex justify-center items-center text-xs text-white'
            >
                Not register ?
            </Link>
        </div>
    </form>
}


export default LoginPage;
