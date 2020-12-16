import {CHANGE_LAYOUT, ADD_SPEED, CHANGE_SPEED } from './types';


// Un reducer es cómo especificamos los cambios de state de la aplicación en respuesta a algunas acciones.
export default (state, action) => {
    switch(action.type)  {
        case CHANGE_LAYOUT:
            return {
                ...state, //create new state
                layout: action.payload
            }
        case ADD_SPEED:
            return {
                ...state,
                speed: action.payload
            }
        case CHANGE_SPEED:
            console.error(action); 
            return {
                ...state,
                speed: action.payload
            }
        default:
            return state;
    }
}