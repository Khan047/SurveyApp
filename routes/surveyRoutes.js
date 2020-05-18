const rLog = require('../middlewares/requireLogin');
const mongoose = require ( 'mongoose');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplates');
module.exports = app =>{
    app.get('/api/surveys/tq', (req, res) =>{
        res.send('Thanks for feedback!');
    })
    app.post('/api/surveys', async (req, res ) =>{
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

        try{
            await mailer.send();
            await survey.save();
            const user = await req.user.save();

            res.send(user);
        } catch (err){
            res.status(422).send(err);
        }
    });
};