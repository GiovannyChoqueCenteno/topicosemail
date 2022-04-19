import { Router } from 'express'
import { check } from 'express-validator';
import * as authController from '../controllers/auth.controller'
import { emailRegistrado ,estaActivado} from '../middlewares/validations/auth.validation';

const router = Router();



router.post('/', [
    check('email').custom(emailRegistrado)
] ,authController.registrarUsuario)

router.post('/validar' , authController.validarUsuario)

//router.post('/login'  ,check('email').custom(estaActivado), authController.iniciarSesion);




export default router