const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true
        // validate: {
        //     validator: function (v) {
        //         return /\d{10}/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid phone number!`
        // }
    },
    // password: {
    //     type: String,
    //     required: true
    // },
    status: {
        type: String,
        enum: ['Active', 'Deleted'],
        default: 'Active',
        required: true
    },
    filepath: String,
},
    { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
