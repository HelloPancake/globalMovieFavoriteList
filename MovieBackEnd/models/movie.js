var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    title: { type: String , required: true}, // String is shorthand for {type: String}
    year: { type: String, required: true},
    plot: { type: String, required: true },
    genre: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Movie", movieSchema)