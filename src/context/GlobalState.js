import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

// initial state, initialState is simple object or variable so staring with small letter

const initialState = {

    transaction: [
          { id: 1, text: 'Flower', amount: -20 },
          { id: 2, text: 'Salary', amount: 300 },
          { id: 3, text: 'Book', amount: -10 },
          { id: 4, text: 'Camera', amount: 150 }
         ]
}

// create global context using createContext of React library

export const GlobalContext = createContext(initialState);

//in order other components to have access to our global state, we need to have provider which will wrap all components in App.js
// so creating provider componentwhich is simple arrow funnction, as we will be wrapping components (Balance, AddTransaction etc just created)
// are gonna be childeren for GlobalProvider so we will be passing childeren

export const GlobalProvider = ({children })=>{  //destructuring
const [state, dispatch] =  useReducer(AppReducer, initialState); //use reducer because we need access to state and dispatch is used with usereducer
//Appreducer is a seperate file

//action for deletion from history

function deleteTransaction(id){
    dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
    });
}

function addTransaction(transaction){
    dispatch({
        type: 'ADD_TRANSACTION',
        payload: transaction
    });
}

return (<GlobalContext.Provider value={{transaction: state.transaction, deleteTransaction, addTransaction}}>{children}</GlobalContext.Provider>)
}
