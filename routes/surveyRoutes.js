const rLog = require('../middlewares/requireLogin');
const mongoose = require ( 'mongoose');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplates');
module.exports = app =>{
    app.post('/api/surveys',(req, res ) =>{
        const { title , subject , body , recipients } = req.body;
        const survey = new Survey ({
            title,
            subject,
            body,
            recipients : recipients.split(',').map(email =>{ return {email: email.trim()}}),
            _user: req.user.id,
            dateSent: Date.now()
            
        });
        const mailer = new Mailer(survey, surveyTemplate(survey));
        mailer.send();

    });
};