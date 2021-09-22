const mongoose = require('mongoose');
const documentSchema = new mongoose.Schema({
    value :
    {
        type : String,
        required : true
    },
    username :
    {
        type : String
    },
});
module.exports = mongoose.model('Documents', documentSchema);