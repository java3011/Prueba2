const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

//RUTA USER
const userRoute = require('./api/routes/user');
app.use('/user', userRoute);
// RUTA CASE
const caseRoute = require('./api/routes/case');
app.use('/case', caseRoute);
// RUTA ALGORITHM
const algorithmRoute = require('./api/routes/algorithm');
app.use('/algorithm', algorithmRoute);
//RUTA TREATMENT
const treatmentRoute = require('./api/routes/treatment');
app.use('/treatment', treatmentRoute);
//RUTA CANCER
const cancerRoute = require('./api/routes/cancer');
app.use('/cancer', cancerRoute);

module.exports = app;