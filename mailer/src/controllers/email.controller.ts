import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

export function sendSampleEmail(req: Request, res: Response) {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const html = fs.readFileSync(path.join(__dirname, '..', 'views', 'emails', 'sample.html'));

    const to = req.query.sendTo + '';

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Sample email',
        text: 'is it text email?',
        html
    };

    transporter.sendMail(mailOptions).then(response => {
        console.log('Response: ', response);
        res.send('Email sent');
    }).catch(error => {
        console.log('Error: ', error);
        res.send('Failed to send email');
    })
}
