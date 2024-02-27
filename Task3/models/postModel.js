const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Deleted'],
        default: 'Active',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    filepath: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    }
},
    { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
