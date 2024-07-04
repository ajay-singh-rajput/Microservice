const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: String,
    name: String,
    email: String,
    allMail: [{
        _id: String,
        sender: String,
        receiver: String,
        subject: String,
        mailBody: String,
        isFav: Boolean,
        folder: {
            type: String,
            default: ''
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    subscribe: {
        type: {
            newLatter: {
                type: Boolean,
                default: true
            },
            accountUpdate: {
                type: Boolean,
                default: true
            },
            newFeature: {
                type: Boolean,
                default: true
            }
        }
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('User', userSchema);
