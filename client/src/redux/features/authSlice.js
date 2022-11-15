import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from '../../utils/axios';

//Slice - частина Redux toolkit яка відповідає за ініціалізацію state in store  і за всі ф-ї, які звязані зі стейтом

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null
}

//get data async for authSlice reducer
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({username, password}) => {
        try {
            const {data} = await axios.post('/auth/register',
                {
                    username,
                    password
                }
            )

            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }

            return data;
        } catch (e) {
            console.log('Error: ', e)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({username, password}) => {
        try {
            const {data} = await axios.post('/auth/login',
                {
                    username,
                    password
                }
            )

            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }

            return data;
        } catch (e) {
            console.log('Error: ', e)
        }
    }
);

export const getMe = createAsyncThunk(
    'auth/loginUser',
    async () => {
        try {
            const {data} = await axios.get('/auth/me');
            console.log('data from server: ', data)
            return data;
        } catch (e) {
            console.log('Error: ', e)
        }
    }
)

//authSlice - reducer
export const authSlice = createSlice({
    //action
    name: 'auth',
    initialState,
    //object that will change the state
    reducers: {
        //for logout button
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoading = false;
            state.status = null
        }
    },
    //for async
    extraReducers: {
        //in progress
        //Register user
        [registerUser.pending] : (state) => {
            state.isLoading = true;
            state.status = null;
        },
        //completed
        //action is object, for example: {action: 'add', payload: data}
        [registerUser.fulfilled] : (state, action) => {
            state.isLoading = false;
            //message - getting from backend
            state.status = action.payload.message;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        //error
        [registerUser.rejected] : (state, action) => {
            state.status = action.payload.message
            state.isLoading = false;
        },


        //Login user
        [loginUser.pending] : (state) => {
            state.isLoading = true;
            state.status = null;
        },

        [loginUser.fulfilled] : (state, action) => {
            state.isLoading = false;
            //message - getting from backend
            state.status = action.payload.message;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        [loginUser.rejected] : (state, action) => {
            state.status = action.payload.message
            state.isLoading = false;
        },

        //Check if user autorized
        [getMe.pending] : (state) => {
            state.isLoading = true;
            state.status = null;
        },

        [getMe.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.status = null
            //action.payload? - ?if exist
            state.user = action.payload?.user;
            state.token = action.payload?.token;

            //test fix bug with saving autorization
            if (!state.token) {
              const localStorageToken = window.localStorage.getItem('token')
                state.token = localStorageToken;
            }

        },

        [getMe.rejected] : (state, action) => {
            state.status = action.payload.message
            state.isLoading = false;
        }
    }
})



//if token exist for refresh page
export const checkIsAuth = (state) => Boolean(state.auth.token);
export const {logout} = authSlice.actions
export default authSlice.reducer