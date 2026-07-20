const User = require("../models/userModel")
const AppError = require("../utils/AppError")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const {authSchema} = require("../validators/authValidator")
const sendEmail = require("../services/email")
const signToken = (id) => {
    return jwt.sign(
        {id}, 
        process.env.JWT_SECRET , 
        {expiresIn: process.env.JWT_EXPIRES_IN}
    )
}

const createSendToken = (user,statusCode,res) => {
    const token = signToken(user._id)
    res.status(statusCode).json({
        status: "success",
        user,
        token
    })
}

exports.signup = async (req,res) => {
    const input = authSchema.parse(req.body)
    const {
        confirmPassword,
        ...userData
    } = input;
    
    const user = await User.create(userData);
    createSendToken(user,201,res)
    }


    exports.login = async (req,res) => {
        const {email, password} = req.body
       const user = await User.findOne({email}).select("+password")
       if (!user) {
        throw new AppError("Invalid email or password", 401);
    }
      const correctPassword = await bcrypt.compare(password,user.password)
        if(!correctPassword) {
            throw new AppError("Invalid email or password", 401);
        }
        createSendToken(user,200,res)
    }

    exports.forgotPassword = async(req,res)=> {
        const {email} = req.body
        const user = await User.findOne({email})
        const resetToken = user.createPasswordResetToken()
        await user.save()
        await sendMail({email})

    }