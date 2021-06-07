import React, {createContext, useState, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as scanIndex from '../services/scanIndex';

interface User{
    matricula:string
    nome: string
    email:string
    saldo:string
}

interface ScanContextData {
    user: User | null;
    dataStore(): Promise<void>;
    dataDelete(): void;
}

const ScanContext = createContext<ScanContextData>({} as ScanContextData)

export const ScanProvider: React.FC = ( {children} ) => {
    const [user, setUser] = useState<User | null>(null)
    
    async function dataStore(){

        const response = await scanIndex.scanner()

        setUser(response.user)

        await AsyncStorage.setItem('@SaScan:user', JSON.stringify(response.user));

        console.log('scan:'+user)
    }
    
    function dataDelete(){ AsyncStorage.clear().then(()=>{ setUser(null) }) }
    
    console.log('scan2:'+user)
    return(
        <ScanContext.Provider value={{user, dataStore, dataDelete}}>
            {children}
        </ScanContext.Provider>
    );
};

export function useDataScan(){
    const context = useContext(ScanContext);
    return context
}