const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    keywords: {
        type: String
    },
    citations: {
        type: String
    },
    weight: {
        type: Number
    }
});

module.exports = mongoose.model('Article', articleSchema);