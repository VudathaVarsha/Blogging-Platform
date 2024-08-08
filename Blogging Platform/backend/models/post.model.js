const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    }
    , title: {

        type: String
    },
    content: {
        type: String, default: "like2"
    },
    category: {
        type: String
    },
    tags: {
        type: [String]
    },
    likes: {
        type: Number, default: 0
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'comment',
        default: []

    },
    createdAt: {
        type: Date
    }


})

const postModel = mongoose.model('posts', postSchema)
module.exports = postModel