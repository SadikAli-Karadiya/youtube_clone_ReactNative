import {configureStore} from "@reduxjs/toolkit"
import videoSlice from './reducers/videoSlice'
import themeSlice from './reducers/themeSlice'

export const store = configureStore({
    reducer:{
       video: videoSlice,
       theme: themeSlice
    }
})