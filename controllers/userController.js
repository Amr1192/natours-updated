const User = require("../models/users")
const AppError = require("../utils/AppError")

const {updateUserSchema} = require("../validators/updateUserValidator")

exports.getAllUsers = async (req,res) => {
const users = await User.find()
res.json({
    status: "success",
users
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

