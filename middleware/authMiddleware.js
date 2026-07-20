const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const AppError = require("../utils/appError")
exports.protect = async (req,res,next) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        {
            token = req.headers.authorization.split(" ")[1] 
        }
        if(!token) {
            return res.status(401).json({
                message: "you are not logged in"
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        if(!user) {
            return res.status(401).json({
                message: "user doesn't exist"
            })
        }


        req.user = user;

        next();

    } catch(err) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
    }


    exports.restrictTo =(...roles) => {
        return (req,res,next)=> {
if(!roles.includes(req.user.role)) {
    return next(new AppError("user not authorized",403))
}
next()
        }
    }
