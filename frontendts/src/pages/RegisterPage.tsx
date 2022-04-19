import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store";
import { IAuthState } from "../types/IAuthState";
import {IUser } from "../types/IUser"
import {yupResolver} from "@hookform/resolvers/yup"
import { userSchema } from "../utils/schemas/user.schema";
import { useEffect } from "react";
import { registrar } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

 
const RegisterPage = ()=>{
    const dispatch : AppDispatch = useDispatch();
    const {ruta} = useSelector<RootState,IAuthState>(state => state.auth);
    const { register , formState : {errors  } ,handleSubmit} = useForm<IUser>({
        resolver : yupResolver(userSchema)
    })
    const navigate = useNavigate();
    const onSubmit = ( data : IUser)=>{
        delete data.confirmar
        dispatch(registrar(data))
    }

    useEffect(()=>{
        if(ruta==="/confirm")
            navigate('/confirm', {
                replace : true
            })
    },[ruta])
    return (
     <Form className="d-flex  flex-column gap-2 w-50" onSubmit={handleSubmit(onSubmit)} method='POST'>
        <h1 className="text-center">Registrarse</h1>
         <Form.Group className="d-flex ">
             <Form.Label className="flex-1"> Nombre</Form.Label>
             <Form.Control {...register('nombre')} className="flex-2" placeholder="Ingresar el nombre"/>
         </Form.Group>
         <p className="text-danger align-self-end">{errors.nombre?.message}</p>

         <Form.Group className="d-flex">
         <Form.Label className="flex-1"> Apellido</Form.Label>
             <Form.Control {...register('apellido')} className="flex-2" placeholder="Ingresar el apellido"/>
         </Form.Group>
         <p className="text-danger align-self-end">{errors.apellido?.message}</p>

         <Form.Group className="d-flex">
         <Form.Label className="flex-1"> Email</Form.Label>
             <Form.Control {...register('email')} className="flex-2" placeholder="Ingresar el email"/>
         </Form.Group>
         <p className="text-danger align-self-end">{errors.email?.message}</p>

         <Form.Group className="d-flex">
         <Form.Label className="flex-1"> Contraseña</Form.Label>
             <Form.Control {...register('contrasena')} className="flex-2" placeholder="Ingresar el nombre"/>
         </Form.Group>
         <p className="text-danger align-self-end">{errors.contrasena?.message}</p>

         <Form.Group className="d-flex">
         <Form.Label className="flex-1"> Confirmar Contarseña</Form.Label>
             <Form.Control {...register('confirmar')} className="flex-2 " placeholder="Ingresar el nombre"/>
         </Form.Group>
         <p className="text-danger align-self-end">{errors.confirmar?.message}</p>

         <Form.Control type="submit" className="btn-primary w-25 align-self-end" value="Aceptar" />
    </Form>
    
    )
}



export default RegisterPage