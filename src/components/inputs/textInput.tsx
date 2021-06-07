import React from 'react';
import {StyleSheet} from 'react-native';
import { Input } from 'react-native-elements';

const styles = StyleSheet.create({
    inputLogin:{
        padding: 11,
        borderWidth: 1,
        borderRadius: 15,
    },
});

interface Login{
    matricula: string | null,
    senha:string | null,
}

const DataLogin:Login={
    matricula: null,
    senha:null
}

function log(mat:string|null, pass:string|null ){
    if(mat!=null) DataLogin.matricula = mat;
    if(pass!=null) DataLogin.senha = pass;
    return DataLogin;
}

function LoginInput(){
    return(
        <>
            <Input
                placeholder='Matrícula'
                style={styles.inputLogin}
                onChangeText={value => log( value, null )}
            />
            <Input 
                placeholder="Senha" 
                style={styles.inputLogin}
                secureTextEntry={true}
                onChangeText={value => log( null, value )}
            />
        </>
    );
}

export default LoginInput; 
export const exDataLogin = DataLogin;