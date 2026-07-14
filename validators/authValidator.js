const {z} = require("zod")
exports.userSchema = z.object({
    name:z.string(),
    email:z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string()
}).refine((data)=> data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"]
})