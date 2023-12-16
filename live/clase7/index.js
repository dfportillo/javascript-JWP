const path = require('node:path');
const express = require('express');
const dotenv = require('dotenv');
const webPsuh = require('web-push');

/////////////////////////////////////////////////////////////
/*variables */


const app = express();

dotenv.config();

app.use(express.static(path.join(__dirname,'static')));
app.use(express.json())

webPsuh.setVapidDetails(
    'mailto:danielportilo303@gmail.com',
    process.env.VAPID__PUBLIC_KEY,
    process.env.VAPID__PRIVATE_KEY
);

app.get("/vapidPublicKey",(req,res,next) =>{
    res.send(process.env.VAPID__PUBLIC_KEY)
})

app.post('/suscribir',function(req,res,next){
    webPsuh.sendNotification(
        req.body,
        JSON.stringify({
            title:'notificacion push bitch',
            options:{
                body:'hola mundo'
            }
        })
    );
})

app.listen(process.env.PORT,() =>{
    console.log(`la app esta corriendo en el puerto http://localhost:${process.env.PORT}`)
})