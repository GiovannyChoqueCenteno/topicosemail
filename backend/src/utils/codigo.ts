import {customAlphabet} from 'nanoid'


export const generarCodigo = ()=>{
    const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 5)
    return nanoid()
}