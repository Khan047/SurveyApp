const sendgrid = require ( 'sendgrid');
const helper = sendgrid.mail;
const keys = require ('../config/keys');


class Mailer extends helper.Mail {

    constructor({ subject, recipients}, content ) {

        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('surveyappconsole@gmail.com')
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);

        this.addClickTracking();
        this.addRecipients();
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

    addRecipients(){
        const p = new helper.Personalization();
        this.recipients.forEach(recipients => {
            p.addTo(recipients)
            
        });
        this.addPersonalization(p);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);
        return response;
    }
}



module.exports = Mailer;