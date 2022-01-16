import {createSlice} from '@reduxjs/toolkit'

const initialState = true

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers:{
        changeTheme : (state, action)=>{
            return state = action.payload;
        }
    }
})

export const {changeTheme} = themeSlice.actions;
export default themeSlice.reducer;