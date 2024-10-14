import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { S3Client } from '@aws-sdk/client-s3';

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const isValid = file.mimetype.startsWith('image/');
    cb(null, isValid);
}

const accessKey = process.env.S3_ACCESS_KEY;
const secretKey = process.env.S3_SECRET_KEY;
const region = process.env.S3_REGION;

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId: accessKey!,
        secretAccessKey: secretKey || ''
    }
});


const uploadS3 = multer({ fileFilter });