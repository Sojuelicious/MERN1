const express = require('express')
const conectarDB = require('./config/db')

//Crear el sevidor
const app = express()

//Conectar a la base de datos
conectarDB()

//Express .json
app.use(express.json({extended: true}))

//Puerto de la app
const PORT = process.env.PORT || 4000

//IMportar rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tareas'))

//Definir la pagina principal
app.get('/',(req, res) => { 
    res.send('Hola Mundo');
})

//arrancar la app

app.listen(PORT, ()=>{
    console.log(`EL servidor esta escuchando el puerto ${PORT}`)
})