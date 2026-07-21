const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
        lowercase: true,
    },

    password: {
        type: String,
        required:true,
        minlength: 8,
        select: false,
    },
    role: {
        type: String,
        enum: ["user","admin"],
        default: "user"
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
})


userSchema.set('toJSON', {
    transform(doc, ret) {
      delete ret.password;
      delete ret.__v;
      delete ret.passwordResetToken;
      delete ret.passwordResetExpires;
      delete ret.passwordChangedAt;
      return ret;
    }
  });

  userSchema.methods.passwordChangedAfter = function (JWTTimestamp) {
    if (!this.passwordChangedAt) return false;

    const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
    return changedTimestamp > JWTTimestamp;
};

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString("hex")
    this.passwordResetToken = crypto.createHash("sha256")
    .update(resetToken).digest("hex")
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken
}

userSchema.pre("save", async function() {
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password,12)
})

userSchema.pre("save", function (next) {

    if (!this.isModified("password") || this.isNew) {
        return next();
    }

    this.passwordChangedAt = Date.now() - 1000;

    next();
});

const User = mongoose.model("User",userSchema)

module.exports = User