import {createSlice} from '@reduxjs/toolkit'
const initialState = []

const videoSlice = createSlice({
    name:'video',
    initialState,
    reducers:{
        setVideos : (state, action) => {
            return state = action.payload;
        }
    }
})

export const {setVideos} = videoSlice.actions;
export default videoSlice.reducer;