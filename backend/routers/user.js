const express = require('express');
const zod = require('zod');
const jwt = require('jsonwebtoken');

const { signupSchema, updateSchema, signinSchema } = require('../middleware/zod');
const { User, Account } = require('../mongodb/db');
const router = express.Router();
const JWT_SECRET = require("../config");
const { authMiddleware } = require('../middleware/userAuthMiddleware');

router.post('/signup', async (req, res) => {
    try {
        const body = req.body;
        const validateInputs = signupSchema.safeParse(body);

        if (!validateInputs.success) {
            return res.status(401).json({
                msg: "Email already taken / Inputs is not valid"
            })
        }

        const user = await User.findOne({
            username: body.username
        })

        if (user) {
            return res.status(401).json({
                msg: "Email already taken"
            })
        }

        const USER = await User.create(body);
        const userId = USER._id;

        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })

        const token = jwt.sign({
            userId: userId
        }, JWT_SECRET)

        res.json({
            msg: "User created successfully",
            user: USER,
            token: token
        })
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
})

router.post('/signin', async (req, res) => {
    const body = req.body;
    const successBody = signinSchema.safeParse(body);

    if (!successBody.success) {
        return res.json({
            msg: "Email is not valid"
        })
    }

    const user = await User.findOne({
        username: body.username,
        password: body.password
    })

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)
        res.json({
            name: user.firstName,
            token: token
        })
        return;
    }
    res.status(411).json({
        msg: "Error while logging in"
    })
})

router.put('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const body = req.body;

        const updated = updateSchema.safeParse(body);

        if (!updated.success) {
            return res.status(411).json({
                msg: "Error while updating the information"
            })
        }
        await User.updateOne(
            {
                _id: userId
            },
            {
                $set: {
                    password: body.password,
                    firstName: body.firstName,
                    lastName: body.lastName
                }
            }
        )
        res.json({
            msg: "Updated successfully"
        })

    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }

})

router.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    const limit = 10;

    // $or => conditional either firstName and lastName
    const auhthenticateUserId = req.userId;

    let users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    if (users.length > limit) {
        users = users.slice(0, limit);
    }

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;