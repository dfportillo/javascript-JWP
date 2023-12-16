const path = require('node:path');
const express = require('express');
const dotenv = require('dotenv'); // libreria utilizada para guardar variables de entorno
const webPush = require('web-push');

dotenv.config(); // se inicializan las variables de entorno

const app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json()) // no viajaria bien la informacion

webPush.setVapidDetails(
    'mailto:danielportillo303@gmail.com',
    process.env.VAPID__PUBLIC_KEY,
    process.env.VAPID__PRIVATE_KEY);

app.get('/vapidPublicKey', (req, res, next) => {
    res.send(process.env.VAPID__PUBLIC_KEY);
})

app.post("/suscribir", function (req, res, next) {
    webPush.sendNotification(
        req.body,
        JSON.stringify({
            title: 'notificacion push',
            options: {
                body: 'hola mundo'
            }
        })
    )
});

app.listen(process.env.PORT, () => { console.log(`servidor ejecutandose en http://localhost:${process.env.PORT}`) });


