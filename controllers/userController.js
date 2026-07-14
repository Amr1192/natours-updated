const User = require("../models/users")
const {z} = require("zod")
const AppError = require("../utils/AppError")
const userSchema = z.object({
    name:z.string(),
    email:z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string()
}).refine((data)=> data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"]
})
exports.getAllUsers = async (req,res,next) => {
const users = await User.find()
if(users.length === 0) {
    return next(new AppError("You have no users",404))
}
res.json({
    status: "success",
users
})



}
exports.createUser = async (req,res,next) => {
const input = userSchema.parse(req.body)
const user = await User.create(input)

res.json({
    status: "success",
    user
})
}
exports.getUser = async (req,res,next) => {
const user = await User.findById(req.params.id)
if(!user) {
    return next(new AppError("User not found",404))
}
res.json({
    status: "success",
    user
})
}
exports.updateUser = async (req,res,next) => {
    const {id} = req.params
 const input = userSchema.parse(req.body)
 User.findByIdAndUpdate(input)

}
exports.deleteUser = async (req,res,next) => {

}

