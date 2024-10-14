import { Router } from 'express';
import upload from './../middlewares/upload';

const router = Router();

router.get('', (req, res) => {
    res.send('api works!');
})

router.post('/upload',  upload.single('file'), (req, res) => {
    console.log('Archivo: ', req.file);
    if (req.file) {
        res.send('Se subio el archivo')
    } else {
        res.status(400).send('Archivo no soportado');
    }
})

router.post('/uploads', upload.array('files'), (req, res) => {
    console.log('Archivo: ', req.files);
    if (req.files && req.files.length) {
        res.send('Se subieron los archivos')
    } else {
        res.status(400).send('Error al subir archivos');
    }
})

export default router;