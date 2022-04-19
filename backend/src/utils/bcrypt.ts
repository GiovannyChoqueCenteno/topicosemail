import bcryptjs from 'bcryptjs'

export const generarContrasena = async(contrasena : string)=>{
    const salt = await bcryptjs.genSaltSync(10);
    const hashContrasena =await bcryptjs.hash(contrasena, salt)
    return hashContrasena;
}
