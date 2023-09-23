import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
    posts: [],
    popularPosts: [],
    loading: false
}

export const createPost = createAsyncThunk(
    'post/createPost',
    async (params) => {
    try {
        const {data} = await axios.post('/posts', params);
        return data
    } catch (e) {
        console.log('error: ', e)
    }
})

//register createPost in extraREducers

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: {
        [createPost.pending]: (state) => {
            state.loading = true
        },
        //in fullfield we get action with data
        [createPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts.push(action.payload)
        },
        [createPost.rejected]: (state) => {
            state.loading = false
        }
    },
});

export default postSlice.reducer