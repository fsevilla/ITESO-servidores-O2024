# Mailer
Mailer permite el envio de correos electrónicos utilizando la librería `nodemailer`.

### Instalación
Se deberán instalar distintas dependencias para poder ejecutar Node con TypeScript

### Express
Utilizamos el framework `express` para el desarrollo de nuestra api.
```
npm i express
```

#### TypeScript
Esta librería nos permite generar el JavaScript resultante a partir de nuestros archivos fuente (.ts a .js).
```
npm i -D typescript
```

#### Nodemailer
`nodemailer` permite el envío de correos (texto y HTML) a través de SMTP.
```
npm i -D nodemailer
```

#### Ts-node
`ts-node` nos permite ejecutar archivos de TypeScript de manera local a través de Node. 
```
npm i -D ts-node
```

#### Dotenv
`dotenv` permite la creación de variables de entorno
```
npm i dotenv
```

#### Types
Para permitir que nuestro editor reconozca los tipos de datos correspondientes a nuestra API desarrollada en Node y Express, será necesario instalar ambas dependiencias que incluyen las declaraciones de los tipos de datos adecuados. 
```
npm i -D @types/node @types/express @types/nodemailer
```
> Se deberán agregar los tipos necesarios de acuerdo a las dependencias que estaremos utilizando en el proyecto.

#### Nodemon
Una vez instalado `ts-node`, `nodemon` nos permite correr el api de manera local mientras escucha cambios a nuestros archivos .ts. 
```
npm i -D nodemon
```


## tsconfig.json
Para poder ejecutar TypeScript a través del comando `tsc`, es necesario generar el archivo `tsconfig.json` en raiz. 
Este archivo puede crearse manualmente o bien utilizando el comando `tsc --init`.

La estructura básica del archivo para nuestra API se muestra a continuación:
```
{
    "compilerOptions": {
        "target": "ES2022", # version de ES
        "outDir": "./dist", # carpeta en donde se generan los archivos .js
        "module": "NodeNext", # nodenext para versiones modernas de Node
        "esModuleInterop": true, # soluciona el problema de namespace. Por defecto es false
        "baseUrl": "src" # carpeta base de nuestro codigo fuente
    }
}
```

## Estructura de Carpetas
Este ejemplo considera la siguiente estructura de carpetas y archivos.
```
├── dist
├── src
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── views
│       ├── emails
│   ├── index.ts
├── node_modules
├── package.json
├── tsconfig.json
└── .gitignore
```

## Desarrollo

1. Requerir `express` utilizando la nueva sintaxis
```
import express from 'express';
```

2. Crear una instancia de express
```
const app = express();
```

3. Definir el puerto
```
const port = process.env.PORT || 3000;
```

4. Iniciar la aplicación (listen):
```
app.listen(port, () => {
    console.log('app is running...');
});
```

9. Crear los tipos de datos (types, interfaces o enums) necesarios

> Los archivos de declaracion de tipos llevan por extensión `.d.ts`. Esto evitará que se genere un archivo al convertir a JavaScript. 

10. Crear el controlador (y siguiendo MVC, tambien el modelo). En el controlador, requerir los tipos Request y Response de express.
```
import { Request, Response } from 'express';
``` 

11. Requerir los tipos de datos necesarios

12. Requerir la librería 'nodemailer'

13. Crear y exportar el método del controlador para el envío del correo
```
export function sendSampleEmail(req: Request, res: Response) {
    
}
```

14. Dentro del método, crear el transportador del correo de SMTP
```
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});
```

15. Definir los parámetros y datos del correo:
```
const mailOptions = {
    from: process.env.EMAIL_USER,
    to: %destinatario%,
    subject: %asunto%,
    text: %contenido version texto simple%,
    html: %contenido version HTML%
};
```

16. Crear el archivo .env con la siguiente estructura y agregar los datos correspondientes
```
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASSWORD=
```

17. Importar config de dotenv en el archivo principal (index.ts) y ejecutar el método
```
import { config } from 'dotenv';
config();
```
> Se debe ejecutar config antes de cargar las rutas, controladores o modelos que puedan necesitar dichas variables de entorno.

18. Crear el archivo de rutas y requerir el router de express, así como los controladores
```
import { Router } from 'express';
import { sendSampleEmail } from './../controllers/email.controller';
```

19. Definir los endpoints
```
const router = Router();

router.get('', (req, res) => {
    res.send('api works');
});

router.get('/email', sendSampleEmail);
```

20. Exportar el router middleware
```
export default router;
```

21. Importar módulo de rutas en nuestro archivo principal (index.js)
```
import routes from './routes';
```

22. Utilizar el middleware de express.json que nos permite recibir datos a través del body
```
app.use(express.json());
```

23. Utilizar el middleware de las rutas en la aplicación
```
app.use(routes);
```

24. "Escuchar" las peticiones
```
app.listen(port, () => {
    console.log('app is running');
});
```

## Gitignore
Definimos el archivo `.gitignore` para ignorar la carpeta de `node_modules`.
> Se recomienda también ignorar la carpeta de `dist` ya que esta se puede crear mediante `npm run build`.

```
node_modules
dist
.env
```

## Build
Para convertir nuestro código de TypeScript a JavaScript, utilizamos la librería de TypeScript ya instalada y creamos el siguiente script en el `package.json`:
```
"scripts": {
    "build": "tsc"
},
```
> Deberás utilizar un compilador o manejador de tareas que te permita mover los archivos de HTML en caso de que utilices plantillas .html para los correos

### Rimraf
Cuando realizamos un build, se generan los archivos JS correspondientes. Sin embargo, si eliminas un archivo `.ts` y se vuelve a realizar el build, dicho archivo se mantiene en la carpeta de distribución. 

Una de las soluciones incluye eliminar la carpeta de distribución (o el contenido de la misma) previo a cada build. 

Para ello podemos utilizar la librería rimraf
```
npm i -D rimraf
```

Una vez instalada, actualizamos el script de build para eliminar la carpeta antes de ejecutar `tsc`.
```
"scripts": {
    "build": "rimraf dist && tsc"
},
```


## Ejecutar
Para ejecutar el API, crearemos dos scripts. 

El primero, para desarrollo, utilizará `nodemon` y ejecutara el archivo `index.ts` dentro de `src`.
```
"dev": "nodemon src/index.ts"
```

El segundo, ejecutará node sobre el archivo `index.js` que resulte dentro de la carpeta `dist`.
```
"start": "node dist/."
```
Este es el resultado de nuestros scripts: 
```
"scripts": {
    "start": "node dist/.",
    "dev": "nodemon src/index.ts",
    "build": "rimraf dist && tsc"
},
```

Una vez creados nuestros scripts, podemos ejecutar cualquiera de los siguientes:
```
npm start # para correr el proyecto en "produccion"
npm run dev # para ejecutar el api en desarollo
npm run build # para generar los archivos .js
```


Para verificar el correcto funcionamiento del proyecto, abre tu navegador y visita [http://localhost:3000/email](http://localhost:3000/email)
