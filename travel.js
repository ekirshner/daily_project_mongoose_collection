
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//establish the pattern for the destinations
const travelDestinationSchema = new mongoose.Schema ({
    name: {type: String, required: true, unique: true},
    beaches: Number,
    languages: [String],
    // bestFor: [
    //     {maritalStatus: String ,
    //     children: Boolean,
    //     budget: String}
    // ]
});

const Destination = mongoose.model('Destination', travelDestinationSchema);

module.exports = Destination;