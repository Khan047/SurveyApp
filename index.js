const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser=require('body-parser');
require('./models/users');
require('./models/survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express();
app.use( 
    cookieSession({
        maxAge: 30*24*60*1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());


require('./routes/authRoutes')(app);
require('./routes/surveyRoutes')(app);

if ( process.env.NODE_ENV === 'production'){
    //server production assests
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT);