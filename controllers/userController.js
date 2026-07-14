const User = require("../models/users")
const AppError = require("../utils/AppError")

const userSchema = require("../validators/userValidator")
const authSchema = require("../validators/authValidator")

exports.getAllUsers = async (req,res) => {
const users = await User.find()
res.json({
    status: "success",
users
})



}
exports.createUser = async (req,res) => {
const input = authSchema.parse(req.body)
const {
    confirmPassword,
    ...userData
} = input;

const user = await User.create(userData);

res.status(201).json({
    status: "success",
    user
})
}
exports.getUser = async (req,res) => {
const user = await User.findById(req.params.id)
if (!user) {
    throw new AppError("User not found", 404);
}
res.json({
    status: "success",
    user
})
}
exports.updateUser = async (req,res) => {
    const {id} = req.params
 const input = userSchema.parse(req.body)
 const user = await User.findByIdAndUpdate(
    id,
    input,
    {
        new: true,
        runValidators: true
    }
 )
 if (!user) {
    throw new AppError("User not found", 404);
}
 res.json({
    status: "success",
    user
})
}
exports.deleteUser = async (req,res) => {
    const {id} = req.params
    const user = await User.findByIdAndDelete(id)
    if (!user) {
    throw new AppError("User not found", 404);
}
    res.status(204).send()
}

