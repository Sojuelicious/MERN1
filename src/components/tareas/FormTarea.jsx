import React, { useContext, useState, useEffect } from 'react';  
import proyectoContext from '../../context/proyectos/proyectoContext';

import tareaContext from '../../context/tareas/tareaContext'


const FormTarea = () => {
        // Extrar si un proyecto esta activo 
        const proyectosContext = useContext(proyectoContext);
        const { proyecto } = proyectosContext;

        //Obtener la funcion del context de tarea
        const tareasContext = useContext(tareaContext)
        const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea } = tareasContext

        //Effet que detecta si hay una tarea seleccionada
        useEffect (()=>{
            if(tareaseleccionada !== null) {
                guardarTarea(tareaseleccionada)
            } else {
                guardarTarea({
                    nombre: ''
                })
            }
        }, [tareaseleccionada])

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
            if (nombre.trim()==='') {
                validarTarea();
                return;
            }

            //Pasar validacion

          //Si es edicion o si es nueva tarea
          if(tareaseleccionada === null) {
               //agreagar la nueva tarea al state de tareas
                tarea.proyectoId = proyectoActual.id;
                tarea.estado = false;
                agregarTarea(tarea)
          } else {
              //actualizar tarea existente
              actualizarTarea(tarea);
          }

            //Obtener y filtra las tareas del proyecto proyectoActua
            obtenerTareas(proyectoActual.id)

            //reiniciar el for
            guardarTarea({
                nombre: ''
            })
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
                        value={tareaseleccionada ? 'Editar Tarea': 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
     );
}
 
export default FormTarea;