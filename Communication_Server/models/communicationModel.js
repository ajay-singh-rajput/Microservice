const  mongoose  = require("mongoose");

const communicationModel = new mongoose.Schema({
    sender:String,
    receiver:String,
    subject:String,
    mailBody:String,
},{timestamps:true});

module.exports = mongoose.model('CommunicationModel', communicationModel);
