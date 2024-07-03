const express = require("express");
const { authMiddleware } = require("../middleware/userAuthMiddleware");
const { Account } = require("../mongodb/db");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({
            userId: req.userId
        });
        res.json({
            balance: account.balance
        })
    } catch (error) {

    }
})

router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Account.findOne({
        userId: req.userId
    }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Insufficient funds"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(401).json({
            msg: "Invalid account"
        })
    }

    //perform the ttransaction

    await Account.updateOne(
        {
            userId: req.userId
        },
        {
            $inc: { balance: -amount }
        }
    ).session(session);

    await Account.updateOne(
        {
            userId: to
        },
        {
            $inc: { balance: amount }
        }
    ).session(session)
    await session.commitTransaction();

    res.json({
        msg: "Transfer successfully"
    })
})

module.exports = router;