const {z} = require("zod")

exports.updateUserSchema = z.object({
    name: z.string().min(3).optional(),
    name: z.string().email().optional(),
})

