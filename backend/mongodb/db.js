const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const url = process.env.DB_URL;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error(err);
    });

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    }
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", accountSchema)

module.exports = {
    User,
    Account
}