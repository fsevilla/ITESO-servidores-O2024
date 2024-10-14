import express from 'express';
import routes from './routes';
import swaggerConfig from './../swagger.config.json';
import swaggerJsDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';


const app = express();

app.use(routes);

const port = process.env.PORT || 3000;

const swaggerDocs = swaggerJsDoc(swaggerConfig);
app.use('/swagger', serve, setup(swaggerDocs));

app.listen(port, () => {
    console.log(`app is running in port ${port}`);
})