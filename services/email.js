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


const sendMail = async ({email,subject = "password reset" ,message = "Please reset your password"}) => {
    await transporter.sendMail({
        from: "Natours <noreply@natours.com>",
        to : email,
        subject: subject,
        text: message,
    })
}

module.exports = sendEmail