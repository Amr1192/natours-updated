const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
})


const sendMail = async ({email,subject,message,url}) => {
    await transporter.sendMail({
        from: "Natours <noreply@natours.com>",
        to : email,
        subject: subject || "password reset",
        html:`<h2>Please reset your password 
        <a href="${url}">Reset Password</a></h2>`,
    })
}

module.exports = sendMail