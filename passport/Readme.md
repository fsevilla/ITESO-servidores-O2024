# Google Passport
Google Passport permite al usuario iniciar sesión en la aplicación utilizando sus credenciales de Google.


### Instalación
Este proyecto lo desarrollamos mediante TypeScript, por lo que es necesario instalar las siguientes dependencias que nos permiten ejecutar Node con TypeScript de manera local.

#### TypeScript
Esta librería nos permite generar el JavaScript resultante a partir de nuestros archivos fuente (.ts a .js).
```
npm i -D typescript
```

#### Ts-node
`ts-node` nos permite ejecutar archivos de TypeScript de manera local a través de Node. 
```
npm i -D ts-node
```

#### Express
Utilizamos el framework `express` para el desarrollo de nuestra api.
```
npm i express
```

#### Passport
Passport nos permite generar el middleware de autenticación.
```
npm i passport
```

#### Passport Google Oauth 2.0
Nos premite realizar la autenticación mediante nuestra aplicación en la consola de Google
```
npm i passport-google-oauth20
```

#### express-session
Es un módulo que nos permite crear sesiones de usuario en nuestra aplicación.
```
npm i express-session
```

#### Dotenv
Dotenv nos permite generar variables de entorno, mismas que utilizaremos para almacenar los valores para la conexión al bucket de S3.
```
npm i dotenv
```

#### Types
Para permitir que nuestro editor reconozca los tipos de datos correspondientes a nuestra API desarrollada en Node y Express, será necesario instalar las declaraciones de los tipos de datos utilizados en el proyecto (node, express y multer).
```
npm i -D @types/node @types/express @types/passport-google-oauth20
```
> Se deberán agregar los tipos necesarios de acuerdo a las dependencias que se utilizan en cada proyecto.

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
A continuación se muestra la estructura de carpetas utilizada en este proyecto. Cabe mencionar que no se está implementando MVC, por lo que se deberán considerar además las carpetas de controladores y modelos correspondientes.
```
├── dist
├── src
│   ├── middlewares
│   ├── routes
│   ├── index.ts
├── node_modules
├── package.json
├── tsconfig.json
└── .gitignore
```

## Pre-requisitos
Para el desarrollo de este proyecto es necesario crear una aplicación web en la consola de Google, para obtener un client ID y secret key.

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

5. Crear el archivo .env en raiz y declarar las variables para la conexión con S3. Ejemplo: 
```
GOOGLE_ID={Google Client ID}
GOOGLE_SECRET={Google Secret Key}
GOOGLE_CALLBACK_URL={Callback URL}
SECRET_KEY={secret key}
```

6. Importar la librería `dotenv` y ejecutar la función `config` para crear las variables de entorno definidas en el archivo `.env`.
```
import { config } from 'dotenv';
config();
```

7. Crear y exportar la interfaz de usuario.
```
export interface User {
    id: string;
    displayName: string;
}
```

8. Crear el archivo de rutas y requerir el router de express
```
import { Router } from 'express';
```

9. Importar la interfaz de usuario
```
import { User } from '../types/user';
```

10. Definir un endpoint de prueba, en el cual se leerá el usuario en caso de haber iniciado sesión.
```
const router = Router();

router.get('/', (req, res) => {
    res.send(`<h1>Bienvenido, ${req.user ? (req.user as User).displayName : 'Invitado'}!</h1>`);
});
```

11. Exportar el router middleware
```
export default router;
```

12. Importar módulo de rutas en nuestro archivo principal (index.js)
```
import routes from './routes';
```

13. Utilizar el middleware de las rutas en la aplicación
```
app.use(routes);
```

14. Crear el archivo middleware y requerir las librerías de passport, Google passport y express-session.
```
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
```

15. Utilizar el `Strategy` de Google 
```
passport.use(
        new GoogleStrategy(
          {
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
          },
          (accessToken, refreshToken, profile, cb) => {
            // This callback will be called after Google's authentication process
            // You can perform user validation or save user data to the database here
            console.log('User profile:', profile);
            return cb(null, profile);
          }
        )
    );
```

16. Crear los metodos para serializar y deserializar el usuario almacenado en la sesión.
```
passport.serializeUser((user, cb) => {
    cb(null, user);
});
    
passport.deserializeUser((user, cb) => {
    cb(null, user);
});
```

17. Utilizar el middleware de sesión e inicializar passport.
```
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET_KEY 
}));

app.use(passport.initialize());
app.use(passport.session());
```

18. Exportar la función del middleware y mandarla a llamar en el archivo `src/index.ts`.
```
import { googleAuth } from './middlewares/google-auth';
googleAuth(app);
```

19. Crear las rutas para la autenticación de Google.
```
import passport from 'passport';

router.get('/google', passport.authenticate('google', { 
    scope: ['profile', 'email'] 
}));

router.get('/callback',
    passport.authenticate('google', { 
        failureRedirect: '/login' 
    }),
    (req, res) => {
      res.redirect('/'); // Enviar a home
    }
);

```

20. "Escuchar" las peticiones
```
app.listen(port, () => {
    console.log('app is running');
});
```

## Gitignore
Definimos el archivo `.gitignore` para ignorar las carpeta de `node_modules`, `dist` así como el archivo `.env`.
```
node_modules
dist
.env
```

## Ejecutar
Para ejecutar el API de manera local, creamos el script `dev`, mismo que utilizará `nodemon` y ejecutara el archivo `index.ts` dentro de `src`.
```
"dev": "nodemon src/index.ts"
```

Para verificar el correcto funcionamiento del proyecto, abre tu navegador y visita [http://localhost:3000/google](http://localhost:3000/google)

