import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import clienteAxios from "../../api/clienteAxios";
import { IAuthState } from "../../types/IAuthState";
import { IUser } from "../../types/IUser";
import { decodeToken } from "../../utils/schemas/token";

export const registrar = createAsyncThunk("auth/iniciarSesion",
    async( data : IUser, {rejectWithValue}  ) => {
        try {
            const res = await clienteAxios.post('/auth' , data)
            return res.data
        } catch (error : any) {
            console.log("Vine por error")
            return rejectWithValue(error.response.data)
        }
    })
export const validarEmail = createAsyncThunk("auth/validarEmail", 
   async ({email ,code}: any, { rejectWithValue}) => {
       try {
           const res  = await clienteAxios.post('/auth/validar',{
               email ,
               code
           })
           return res.data
       } catch (error : any) {
           return rejectWithValue(error.response.message)
       }
   }    

)
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        ruta: "",
        user: null,
        token : undefined
    } as IAuthState,
    reducers: {
         setAuth : (state,action)=>{
            return{
                 ruta : state.ruta,
                    token : action.payload,
                 user : decodeToken(action.payload)
                }
         }
    },
    extraReducers : (builder)=>{
        builder.addCase(registrar.fulfilled , (state, action :  PayloadAction<any>)=>{
            state.user = decodeToken(action.payload)
            state.token= action.payload
            state.ruta = "/confirm"
            localStorage.setItem("token",action.payload)
            toast.success("Usuario creado correctamente")
        }).addCase( registrar.rejected,(state ,action : any)=>{
            toast.error(action.payload[0].msg)
        }).addCase(validarEmail.fulfilled , (state , action : any)=>{
            console.log("Validado correctamente")
            state.ruta= "/dashboard"
            toast.success("Verificado correctamente")
        }).addCase(validarEmail.rejected, (state , action : any)=>{
            toast.error("Codigo incorrecto")
        })
    }
})


export const {setAuth} = authSlice.actions
export default authSlice.reducer
