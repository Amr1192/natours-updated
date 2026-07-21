const User = require("../models/userModel")
const AppError = require("../utils/AppError")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const {authSchema} = require("../validators/authValidator")
const { resetPasswordSchema } = require("../validators/authValidator");
const sendMail = require("../services/email")
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


    exports.forgotPassword = async (req, res) => {
        const { email } = req.body;
        let user; 
      
        try {
          user = await User.findOne({ email });
      
          if (!user) {
            return res.status(200).json({
              message: "Token sent to email",
            });
          }
      
          const resetToken = user.createPasswordResetToken();
          await user.save({ validateBeforeSave: false });
      
          const url = `http://localhost:3000/passwordReset/${resetToken}`;
          await sendMail({ email, url });
      
          res.status(200).json({
            message: "Token sent to email",
          });
        } catch (err) {
          // Only clear if we actually created a token for a real user
          if (user) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });
          }
      
          throw new AppError(
            "There was an error sending the email. Try again later.",
            500
          );
        }
      };


      
      exports.passwordReset = async (req, res) => {
          // 1. Validate input
          const { password } = resetPasswordSchema.parse(req.body);
      
          // 2. Hash the token from the URL
          const hashedToken = crypto
              .createHash("sha256")
              .update(req.params.token)
              .digest("hex");
      
          // 3. Find user with valid, unexpired token
          const user = await User.findOne({
              passwordResetToken: hashedToken,
              passwordResetExpires: {
                  $gt: Date.now()
              }
          });
      
          // 4. Invalid or expired token
          if (!user) {
              throw new AppError(
                  "Token is invalid or has expired.",
                  400
              );
          }
      
          // 5. Set the new password
          user.password = password;
      
          // 6. Clear reset fields
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
      
          // 7. Save user (pre-save middleware hashes the password)
          await user.save();
      
          // 8. Log the user in
          createSendToken(user, 200, res);
      };