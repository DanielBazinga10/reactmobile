import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import * as auth from '../services/auth';

interface User{
    matricula:string;
    nome: string;
    email:string;
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading:boolean;
    signIn(): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ( {children} ) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        async function loadStorageData(){
            const storagedUser = await AsyncStorage.getItem('@SaAuth:user');
            const storagedToken = await AsyncStorage.getItem('@SaAuth:token');

            if(storagedUser && storagedToken){
                api.setHeader('Authorization',`Bearer ${storagedToken}`);
                setUser(JSON.parse(storagedUser));
                setLoading(false);
            }
        }
        loadStorageData();
    },[]);

    async function signIn(){
        const response = await auth.signIn();
        setUser(response.user);

        api.setHeader('Authorization',`Bearer ${response.token}`);

        await AsyncStorage.setItem('@SaAuth:user', JSON.stringify(response.user));
        await AsyncStorage.setItem('@SaAuth:token', response.token);
    }
    
    function signOut(){
        AsyncStorage.clear().then(()=>{
            setUser(null);
        });
    }

    return(
        <AuthContext.Provider value={{signed: !!user, user, loading, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(){
    const context = useContext(AuthContext);

    return context;
}