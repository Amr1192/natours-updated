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

exports.resetPasswordSchema = z.object({
    password: z.string().min(8),
    confirmPassword: z.string()
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    }
);