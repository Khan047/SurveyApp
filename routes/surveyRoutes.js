const rLog = require('../middlewares/requireLogin');
const mongoose = require ( 'mongoose');
const Survey = mongoose.model('survey');
module.exports = app =>{
    app.post('/api/surveys', rLog, (req, res ) =>{
        const { title , subject , body , recipients } = req.body;
        const survey = new Survey ({
            title,
            subject,
            body,
            recipients : recipients.split(',').map(email =>{ return {email: email.trim()}}),
            _user: req.user.id,
            dateSent: Date.now()
            
        });
    });
};