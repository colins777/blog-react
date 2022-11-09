import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from '../../utils/axios';

//Slice - частина Redux toolkit яка відповідає за ініціалізацію state in store  і за всі ф-ї, які звязані зі стейтом

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null
}

//reducer - registerUser
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

//authSlice - reducer
export const authSlice = {
    name: 'auth',
    initialState,
    //object that will change the state
    reducers: {},
    extraReducers: {
        //in progress
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

        }
    }
}

export default authSlice.reducer