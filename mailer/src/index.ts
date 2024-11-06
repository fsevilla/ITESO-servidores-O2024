import express from 'express';
import { config } from 'dotenv';
config();

import routes from './routes';

const app = express();

const port = process.env.PORT || 3000;

app.use(routes);

app.listen(port, () => {
    console.log(`app is running in port ${port}`);
});