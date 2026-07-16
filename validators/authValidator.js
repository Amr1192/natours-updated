const {z} = require("zod")
exports.authSchema = z.object({
    name:z.string().trim(),
    email:z.string().trim().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
}).refine((data)=> data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"]
})