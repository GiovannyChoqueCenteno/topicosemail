import * as yup from 'yup'

export const userSchema = yup.object().shape({
    nombre : yup.string().required('El nombre es requerido'),
    email : yup.string().required('El email es requerido'),
    apellido : yup.string().required('El apellido es requerido'),
    contrasena  : yup.string().required('La contraseña es requerida'),
    confirmar : yup.string().required('Confirmar contraseña').oneOf([yup.ref('contrasena'),null], "No son los mismos")
})

