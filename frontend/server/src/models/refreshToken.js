const mongoose = require('mongoose');

const { Schema } = mongoose;

const RefreshToken = new Schema({
    email: { type: String },
    refreshToken: String,
    expiration: { type: Date },
});

RefreshToken.statics.insertRefreshToken = function ({ email, expiration, refreshToken }) {
    const newToken = new this({
        email,
        expiration,
        refreshToken,
    });

    return newToken.save();
};

RefreshToken.statics.getRefreshToken = function ({ refreshToken }) {
    return this.findOne({ refreshToken }).exec();
};

RefreshToken.statics.deleteRefreshToken = function ({ refreshToken }) {
    return this.deleteOne({ refreshToken }).exec();
};

module.exports = mongoose.model('RefreshToken', RefreshToken);
