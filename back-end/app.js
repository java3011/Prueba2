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
//RUTA ORGAN
const organRoute = require('./api/routes/organ');
app.use('/organ',organRoute);
//RUTA ORGANCASE
const organCaseRoute = require('./api/routes/organcase');
app.use('/organcase',organCaseRoute);
//RUTA PRESCRIPTION
const prescriptionRoute = require('./api/routes/prescription');
app.use('/prescription',prescriptionRoute);
//RUTA INDEXPRESCRIPTION
const indexPrescriptionRoute = require('./api/routes/indexprescription');
app.use('/indexprescription',indexPrescriptionRoute);

module.exports = app;