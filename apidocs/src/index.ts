import express from 'express';
import routes from './routes';
import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import swaggerConfig from './../swagger.config';


const app = express();
const port = process.env.PORT || 3000;

app.use(routes);

const swaggerDocs = swaggerJSDoc(swaggerConfig);
app.use('/swagger', serve, setup(swaggerDocs));

app.listen(port, () => {
    console.log(`App is running in port ${port}`);
})