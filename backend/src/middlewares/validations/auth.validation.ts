import {  CustomValidator} from 'express-validator'
import prisma from '../../config/prisma'

export const emailRegistrado  : CustomValidator = value =>{
    return prisma.user.findFirst( {
        where : {
            email : value 
        }
    }).then( user =>{
        if(user){
            return Promise.reject('El correo esta en uso');
        }
        console.log("cree en correo")
        return true;
    })
}

export const estaActivado : CustomValidator = value =>{
    return prisma.user.findFirst( {
        where : {
            email : value
        }
    }).then( user =>{
        
        if (user?.activo){
            return true
        }
        if(!user){
            console.log("no hay nadie")
            return true;
        }
        return Promise.reject('El usuario no esta activo')
    })
}