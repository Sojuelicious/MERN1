import React, { useContext, useState } from 'react';  
import proyectoContext from '../../context/proyectos/proyectoContext';

import tareaContext from '../../context/tareas/tareaContext'


const FormTarea = () => {
        // Extrar si un proyecto esta activo 
        const proyectosContext = useContext(proyectoContext);
        const { proyecto } = proyectosContext;

        //Obtener la funcion del context de tarea
        const tareasContext = useContext(tareaContext)
        const { agregarTarea } = tareasContext

        //State de formulario
        const [tarea, guardarTarea] = useState({
            nombre: '',
        })

        //Extraer el nombre del proyecto
        const { nombre } = tarea

        //si no hay proeycto seleccionado
        if(!proyecto) return null;

        //array destructuring para extraer el proyecto actual
        const[proyectoActual] = proyecto

        //leer los valores del formularion
        const handleChange = e => {
            guardarTarea({
                ...tarea,
                [e.target.name] : e.target.value
            })
        }

        const onSubmit = e => {
            e.preventDefault()

            //validar

            //Pasar validacion

            //agreagar la nueva tarea al state de tareas
            tarea.proyectoId = proyectoActual.id;
            tarea.estado = false;
            agregarTarea(tarea)

            //reiniciar el for
        }
    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea"
                        name="nombre"
                        value = {nombre}
                        onChange = {handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value="Agregar Tarea"
                    />
                </div>
            </form>
        </div>
     );
}
 
export default FormTarea;