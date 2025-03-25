import React from 'react'
import { useReducer } from 'react';
function Useredeuser() {
    const initialState = { isModalOpen: false };
    
      const reducer = (state, action) => {
        switch (action.type) {
          case 'openModal':
            return { isModalOpen: true };
          case 'closeModal':
            return { isModalOpen: false };
         
          default:
            throw new Error(`Unhandled action type: ${action.type}`);
        }
      };
    
      const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      
    </div>
  )
}

export default Useredeuser
