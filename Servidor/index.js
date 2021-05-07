const express = require('express')
const conectarDB = require('./config/db')

//Crear el sevidor
const app = express()

//Conectar a la base de datos
conectarDB()

//Puerto de la app
const PORT = process.env.PORT || 4000

//Definir la pagina principal
app.get('/',(req, res) => { 
    res.send('Hola Mundo')
})

//arrancar la app

app.listen(PORT, ()=>{
    console.log(`EL servidor esta escuchando el puerto ${PORT}`)
})