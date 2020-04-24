const express = require('express');
const app = express();
const keys = require('./config/keys');
const mongoose = require('mongoose');
require('./models/users');
require('./services/passport');
require('./routes/authRoutes')(app);

mongoose.connect(keys.mongoURI);




const PORT = process.env.PORT || 5000;
app.listen(PORT);