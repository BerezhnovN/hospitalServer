require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();
const router = require ('./src/modules/routes/index');
const {logErrorMiddleware, returnError} = require("./src/middleware/errorHandler");
app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

app.use(logErrorMiddleware);
app.use(returnError);

const start = async () => {
    try {
        await mongoose.connect(process.env.URL, {
            useUnifiedTopology: true
        });
        app.listen(8000, () => {
            console.log('Listening niggas on port 8000!')
        });
    } catch (e) {
        console.log(e);
    }
}

start();