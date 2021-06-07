import api from "./api";

export async function productList(){
    const response = await api.get('/produtos');
    const produtos  =  JSON.stringify(response.data);
    return produtos
}