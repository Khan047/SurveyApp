const rLog = require('../middlewares/requireLogin');
const mongoose = require ( 'mongoose');
const Survey = mongoose.model('survey');
const Mailer = require('../services/mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplates');
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
        const mailer = new Mailer(survey, surveyTemplate(survey));

    });
};