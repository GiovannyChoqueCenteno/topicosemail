import {configureStore} from '@reduxjs/toolkit'
import { IAuthState } from '../types/IAuthState';
import authSlice from './slices/authSlice';


const store  = configureStore({
    reducer : {
        auth : authSlice
    } 
})


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState >

export default store;