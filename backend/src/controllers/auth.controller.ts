import prisma from "../config/prisma"
import { Request , Response } from "express"
import {validationResult} from 'express-validator'
import { createToken } from "../middlewares/auth/token";
import { User } from "@prisma/client"
import { mandarEmail } from "../config/nodemailter"
import { generarContrasena } from "../utils/bcrypt"
import { generarCodigo } from "../utils/codigo"



export const registrarUsuario = async(req : Request , res : Response)=>{
    const result = validationResult(req);
    if(result.array().length>0){
        return res.status(403).send(result.array() )
    }
    try {    
        const addUser : User = req.body;
        addUser.contrasena =await generarContrasena(addUser.contrasena);
        addUser.code = generarCodigo();
        await prisma.user.create({
            data :addUser
        })
        const token = createToken(  addUser , process.env.SECRETA  ,"2h" )
        mandarEmail(addUser.email, addUser.code)
        res.status(201).send(token)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "msg" : error
        })
    }
}


export const validarUsuario = async(req : Request , res : Response)=>{
    const { email , code} = req.body as User
    const user = await prisma.user.findFirst({
        where : {
            email 
        }
    })
    if(user && code == user.code){
        await prisma.user.update( {
            where : {
                id : user.id
            },
            data :{
                activo : true
            }
        }  )
        return res.status(200).json({
            ok : "true"
        })
    }
    res.status(400).json({
        msg : "El codigo no es valido"
    })
}