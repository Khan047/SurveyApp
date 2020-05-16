const mongoose = require('mongoose');
const { Schema } = mongoose;
const recipients = require('./recipient');

const surveySchema = new Schema ({
    title : String,
    body : String,
    subject : String,
    recipients : [recipients],
    yes: {type : Number, default:0},
    no: {type : Number, default:0},
    _user : {type: Schema.Types.ObjectId, ref : 'users'},
    dateSent : Date,
    lastresponse : Date
});

mongoose.model('surveys',surveySchema);