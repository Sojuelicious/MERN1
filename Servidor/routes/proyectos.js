const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');
// Crea proyectos C
// api/proyectos
router.post('/', 
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatoio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);


//Obtener ltodos los proyectos R
router.get('/', 
    auth,
    proyectoController.obtenerProyectos
)

//Actualizar proyecto via ID U
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
)

//Eliminar un proyecto D
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
)

module.exports = router; 