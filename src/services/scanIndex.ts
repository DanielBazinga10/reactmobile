import api from "./api";

export async function scanner(matricula:string){
    const response = await api.get('/users/'+matricula);
    const user  =  JSON.stringify(response.data);
    return user;
}