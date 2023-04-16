// import getPrompt  from './controllers/prompts.js';
import getPrompt  from './controllers/prompts.mjs';
import errorHandler from 'errorhandler';
import express from 'express';

// const getPrompt = require('./controllers/prompts.js')
// const errorHandler = require('errorhandler');
// const express = require('express');


const app = express();

app.use(express.json());

app.set('port', 3001);

app.disable('x-powered-by');

if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
}
app.get('/', getPrompt)

app.listen(app.get('port'), () => {
    console.log(
        `App is running on http://localhost:${app.get('port')} in ${app.get(
            'env',
        )} mode`,
    );
});

export default app
