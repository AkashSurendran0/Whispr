const nodemailer=require('nodemailer')
const env=require('dotenv').config()

const transporter=nodemailer.createTransport({
    service:'gmail',
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.USER_PASS
    },
    tls:{
        rejectUnauthorized:false
    }
})

const sendMail=async({from, to, subject, text})=>{
    try{
        const mailOptions={
            from: from || 'Whispr',
            to,
            subject,
            text
        }
        const result=await transporter.sendMail(mailOptions)
        return result
    }catch(error){
        console.log('Error sending email', error)
    }
}

module.exports=sendMail