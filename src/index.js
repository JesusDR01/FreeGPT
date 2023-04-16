import getPrompt  from './controllers/prompts.mjs';
import errorHandler from 'errorhandler';
import express from 'express';

const app = express();

app.use(express.json());

app.set('port', 3001);

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
