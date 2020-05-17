const sendgrid = require ( 'sendgrid');
const helper = sendgrid.mail;
const keys = require ('../config/keys');


class Mailer extends helper.Mail {

    constructor({ subject, recipients}, content ) {

        super();
        this.from_email = new helper.Email('surveyappconsole@gmail.com')
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);

        this.addClickTracking();
    }

    formatAddresses(recipients) {

        return recipients.map(({ email }) => {

            return new helper.Email(email);

        });
    }

    addClickTracking(){
        const track = new helper.TrackingSettings();
        const clickTrack = new helper.ClickTracking(true, true);

        track.setClickTracking(clickTrack);
        this.addTrackingSettings(track);
    }
}



module.exports = Mailer;