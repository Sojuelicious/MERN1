import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto}) => {

    //obtener el state de proyetos
    const proyectosContext = useContext (proyectoContext)
    const { proyectoActual } = proyectosContext


    //obtener la funcion del contexto de tarea
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext;

    //FUncion para agreatar el proyecto actual
    const selecionarProyecto = id => {
        proyectoActual(id) //Filtrar proyecto actual
        obtenerTareas(id) // filtrar las tareas cuando se hace click
    }

    
    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={()=>selecionarProyecto(proyecto.id)}
            >{proyecto.nombre} </button>
        </li>
     );
}

export default Proyecto; 