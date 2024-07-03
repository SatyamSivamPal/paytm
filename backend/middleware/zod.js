const zod = require('zod');

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string(),
    lastName: zod.string()
})

const updateSchema = zod.object({
    password: zod.string().min(6).optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

module.exports = {
    signupSchema,
    updateSchema,
    signinSchema
}