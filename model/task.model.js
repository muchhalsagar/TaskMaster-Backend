const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    status: {
        type: String,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
    }
});

module.exports = mongoose.model('Task', taskSchema);