const Proyecto = require('../models/Proyecto')
const { validationResult } = require('express-validator')

exports.crearProyecto = async (req, res) => { //C

    //Revisar si hay errores
    const errores = validationResult(req)
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }
    
    try {
        //crea un nuevo proyecto
        const proyecto = new Proyecto(req.body)

        //Guardar el creador via JWT
        proyecto.creador = req.usuario.id

        //Guardamos el proyecto
        proyecto.save()
        res.json(proyecto)
    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error')
    }

}

// Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => { //R
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ creado: -1 });
        res.json({ proyectos });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
    }

//Actualizar un proyecto
exports.actualizarProyecto = async (req, res) => { //U
    //Revisar si hay errores
    const errores = validationResult(req)
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    //extraer info del proyecto
    const {nombre} = req.body
    const nuevoProyecto = {}

    if (nombre) {
        nuevoProyecto.nombre = nombre
    }

    try {
        //Revisar el ID
        let proyecto = await Proyecto.findById(req.params.id)

        //Si el proyecto existe o no
        if(!proyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        //Verificar el creado del proyecto
        if(proyecto.creador.toString() !== req.usuario.id) { //REVISAR LA PARTE DE TOSTRING ERROR EN CONSOLA
            return res.status(401).json({msg: 'no Autorizado'})
            
        }

        //Actualizar
        proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id}, {$set: nuevoProyecto}, {new: true})
        res.json({proyecto})
    } catch (error) {
        console.log(error)
        res.status(500).send('error en el servidor')
    }


}

//Elimina un proyecto por su id D
exports.eliminarProyecto = async (req, res) => {
    try {
        //revisar ID
        let proyecto = await Proyecto.findById(req.params.id)

        //Si el proyecto existe o no
        if(!proyecto) {
            return  res.status(401).json({msg: 'No autorizado'})
        }

        //Elimina el proyecto

        await Proyecto.findByIdAndRemove({_id: req.params.id})
        res.json({msg: 'Proyecto eliminado'})
    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor')
    }
}