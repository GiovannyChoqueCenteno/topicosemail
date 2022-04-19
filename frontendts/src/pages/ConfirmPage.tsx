import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../store"
import { validarEmail } from "../store/slices/authSlice"
import { IAuthState } from "../types/IAuthState"
const ConfirmPage = ()=>{
    const {user , ruta} = useSelector<RootState,IAuthState>(state => state.auth)
    const [code, setCode] = useState<string>("")
    const dispatch : AppDispatch = useDispatch()
    const navigate = useNavigate()
    const onSubmit = ( e : FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        dispatch(validarEmail({
            email : user?.email ,
            code
        }))
    }

    const handleChange = ( e : ChangeEvent<HTMLInputElement>)=>{
        setCode(e.target.value)
    }
    useEffect(()=>{
        if( ruta == "/dashboard"){
            navigate("/dashboard",{
                replace : true
            })
        }
    }, [ruta])
    return (
        <form onSubmit={onSubmit}>
            <h1>Introducir el codigo enviado a {user?.email}</h1>
            <label htmlFor="">Introducir el code que fue enviado a su correo</label>
            <input value={code} name="code" onChange={handleChange} type="text" className="d-block mb-2" />
            <button className="btn btn-primary" type="submit"> Aceptar</button>
        </form>
    )
}

export default ConfirmPage