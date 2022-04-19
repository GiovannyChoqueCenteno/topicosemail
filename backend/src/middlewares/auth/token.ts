import { User } from "@prisma/client";
import { NextFunction, Request , Response} from "express";
import jwt from 'jsonwebtoken'

export const createToken=(persona : User, SECRET_KEY='' , expiresIn :string) =>{
    const { id, nombre, email, apellido } = persona;
    const payload = {
      id,
      nombre,
      apellido,
      email,
    };
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
  }

export const verifiToken   = ( req : Request, res : Response	 , next : NextFunction) =>{
  const token = req.headers['x-auth-token']
  if(token){
    req.token = token as string
    console.log(token)
    next()
  }else{
    res.status(403).json({
       msg : "Token no valido"
    })
  }
  console.log(token)
}