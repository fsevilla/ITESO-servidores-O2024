import { Request } from 'express';
import multer, { diskStorage, FileFilterCallback } from 'multer';

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop()?.toLowerCase();
        const timestamp = new Date().getTime();
        cb(null, `${timestamp.toString()}.${ext}`);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    // const validExtensions = ['jpg', 'png'];
    // const ext = file.originalname.split('.').pop()?.toLowerCase();
    // const isValid = validExtensions.includes(ext as string);

    // const isValid = file.mimetype.startsWith('image/');
    cb(null, true);
}

const upload = multer({ storage, fileFilter });

export default upload;
