import api from "./api";
import { Alert } from 'react-native';
import {exDataLogin} from '../components/inputs/textInput'

interface Response{
    token:string;
    user:{
        matricula:string;
        nome:string;
        email:string;
    }
}

export async function signIn():Promise<Response>{
    
    const vend = await api.get('/vendedores/f/'+exDataLogin.matricula,{})
    if(vend){
        const access = await api.get('/acessos/v/'+exDataLogin.matricula,{});
        if(access.data.VENDacessos!=null){
            if(access.data.VENDacessos.id_admin!=null){
                const response = await api.post('/login',{
                    matricula: exDataLogin.matricula,
                    senha: exDataLogin.senha
                });
                const vendedor  =  JSON.stringify(response.data.user);
                const token = JSON.stringify(response.data.token);
                
                return new Promise(
                    resolve => {
                    resolve({
                        token: token,
                        user: JSON.parse(vendedor)
                    });
                });
            }else{
                Alert.alert(
                    'Erro',
                    `Login incorreto ou não encontrado`,
                    [
                        { text: 'Ok', onPress: () => console.log("Erro: Login incorreto ou não encontrado")},
                    ],
                    {cancelable: false},
                );
                
            }
        }else{
            const nAccess = await api.post('/acessos/'+exDataLogin.matricula,{login:""});
            
        }
    }
}