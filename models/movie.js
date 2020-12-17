const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    producer: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Movies = mongoose.model('movies', movieSchema);
module.exports = {Movies};
