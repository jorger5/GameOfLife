import React, {createContext, useReducer} from "react";
import {ADD_SPEED, CHANGE_LAYOUT, CHANGE_SPEED } from './types';
import AppReducer from "./AppReducer";
 
const initialState = {
    config: {
        gridLayout: [50,30],
        speed: 1000,
    }
}


export const GlobalContext = createContext(initialState);


export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer (AppReducer, initialState);

    //Actions
    function addSpeed(speed){
        dispatch({
            type: ADD_SPEED,
            payload: speed
        });
    }
    function changeSpeed(speed){
        dispatch({
            type: CHANGE_SPEED,
            payload: speed,
        })

    }
    return (<GlobalContext.Provider value={{
        config: state.config,
        addSpeed,
        changeSpeed}}> 

        {children}
    </GlobalContext.Provider>)
    }

