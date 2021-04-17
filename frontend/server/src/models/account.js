const mongoose = require('mongoose');
const crypto = require('crypto');
const { generateToken } = require('../lib/token');

const { Schema } = mongoose;

function hash(password) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

const Account = new Schema({
    username: String,
    email: { type: String },
    password: String,
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

Account.statics.findByUsername = function (username) {
    return this.findOne({ username }).exec();
};

Account.statics.findByEmail = function (email) {
    return this.findOne({ email }).exec();
};

Account.statics.localRegister = function ({ username, email, password, isAdmin }) {
    const account = new this({
        username,
        email,
        password: hash(password),
        isAdmin,
    });

    return account.save();
};

Account.methods.validatePassword = function (password) {
    const hashed = hash(password);
    return this.password === hashed;
};

Account.methods.generateToken = function () {
    const payload = {
        email: this.email,
        userName: this.username,
    };
    return generateToken(payload);
};

module.exports = mongoose.model('Account', Account);
