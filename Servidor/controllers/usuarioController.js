const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.crearUsuario = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() })
    }

    //Extraer email y password
    const { email, password } = req.body

    try {
        let usuario = await Usuario.findOne({ email })
        if(usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe' })
        }

        //Crea el nuevo usuario
        usuario = new Usuario(req.body)

        //hashear password
        const salt = await bcryptjs.genSalt(10)
        usuario.password = await bcryptjs.hash(password, salt)

        //Guarda el usuario
        await usuario.save()

        //Crear y firmar JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        }

        //Firmar JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 //una hora
        },
             (error, token)=>{
                if(error) throw error //Si ocurre un error ejecuta esto

                //Mensaje de confirmacion
                res.json({ token: token }) // Si sale bien, ejecutar esto
        })
    } catch (error) {
        console.log(error)
        res.status(4000).send('hubo un error')
    }
}