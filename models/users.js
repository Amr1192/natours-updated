const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
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
    }
   
})

userSchema.set('toJSON', {
    transform(doc, ret) {
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  });

userSchema.pre("save", async function() {
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password,12)
})

const User = mongoose.model("User",userSchema)

module.exports = User