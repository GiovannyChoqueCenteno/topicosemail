import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SERVER_EMAIL,
        pass: process.env.SERVER_PASSWORD
    }
})

const mailOptions = (email : string , codigo : string) => {
    return {
        from: process.env.SERVER_EMAIL,
        to: email,
        subject: `Verificar su correo electronico`,
        text: `El codigo de configuracion es ${codigo}`,
    }
}
export const mandarEmail =(email : string, codigo : string)=> {
    transporter.sendMail(mailOptions(email,codigo))
}
