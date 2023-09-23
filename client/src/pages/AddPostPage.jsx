import React, {useState, Component} from 'react';
import {useDispatch} from "react-redux";
import {createPost} from "../redux/features/post/postSlice";

//@TODO bug - after adding post - no access https://prnt.sc/RDPaaUPKzrbY

export const AddPostPage = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');

    const dispatch = useDispatch();

    //Send data from form
    const submitHandler = () => {
        try {
            //form object with keys: title, text, image
            const data = new FormData()
            data.append('title', title);
            data.append('text', text);
            data.append('image', image);

            dispatch(createPost(data))
        } catch (error) {
            console.log('error', error)
        }
    };

    return <form className='w-1/3 mx-auto py-18'
                 onSubmit={(e) => e.preventDefault()}
    >
        <label className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
            Add image
            <input type="file" className='hidden'
                onChange={(e) => setImage(e.target.files[0])}
            />
        </label>
        <div className='flex object-cover py-2'>IMAGE</div>

        <label className='text-xs text-white opacity-70'>
            Post title
            <input type="text"
                   value={title}
                   onChange={e => setTitle(e.target.value)}
                   placeholder='Title'
                    className='h-10 mt-1 text-black w-full rounded-sm bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-600'
            />
        </label>

        <label className='text-xs text-white opacity-70'>
            Post text
            <textarea placeholder='Post text'
                      onChange={e => setText(e.target.value)}
                   className='h-10 mt-1 text-black w-full rounded-sm bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-600'
            />
        </label>

        <div className='flex gap-8 items-center justify-center mt-4'>
            <button className='flex justify-center items-center bg-gray-600 text-xs rounded-sm py-2 px-4'
                onClick={submitHandler}
            >
                Add post
            </button>

            <button className='flex justify-center items-center bg-red-500 text-xs rounded-sm py-2 px-4'>
                Cancel
            </button>
        </div>
    </form>
}


export default AddPostPage;
