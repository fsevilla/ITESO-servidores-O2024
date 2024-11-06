import express from 'express';
import { config } from 'dotenv';
config();

import routes from './routes';


const port = process.env.PORT || 3000;

const app = express();

app.use(routes);

app.listen(port, () => {
    console.log(`app is running in pot ${port}`);
});