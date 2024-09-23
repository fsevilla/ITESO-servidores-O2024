import express from 'express';
import { connect } from 'mongoose';
// require('dotenv').config();
import { config } from 'dotenv';
config();

const app = express();
const port = process.env.PORT || 3000;

const dbUrl = process.env.DB_URL;
console.log('Mongo URL: ', dbUrl);

connect(dbUrl as string).then(res => {
    console.log('Ya se conecto!');
}).catch(err => {
    console.log('Ocurrio un error');
});