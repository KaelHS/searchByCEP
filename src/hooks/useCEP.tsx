import { useState, useContext, createContext, ReactNode } from 'react';

interface CepContextData {
    axiosResponse: searchDataProps;
    setLocaleResponses: ( response: searchDataProps ) => void;
}

interface CepContextProviderProps {
    children: ReactNode
}

interface searchDataProps {
    ddd: string;
    uf: string;
    cep:string;
    localidade: string;
    bairro: string;
    logradouro: string;
    complemento: string;
    ibge: string;
}

const CepContext = createContext({} as CepContextData);

export function CepContextProvider({children}: CepContextProviderProps) {

    const [ axiosResponse, setAxiosResponse ] = useState({} as searchDataProps);

    async function setLocaleResponses(response: searchDataProps) {

        await setAxiosResponse(response);
    }

    return(
        <CepContext.Provider value={{ axiosResponse, setLocaleResponses}}> 
            {children}
        </CepContext.Provider>
    );
}

export function useCEP() {
    return useContext(CepContext);
}