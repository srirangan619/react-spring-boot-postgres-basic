import React, {createContext}  from 'react';
import TenantsManagerAPI from './api/TenantsManagerAPI'


export const GlobalState = createContext()

export const DataProvider = ({children}) =>{

    const state = {
        tenantsManagerAPI: TenantsManagerAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}