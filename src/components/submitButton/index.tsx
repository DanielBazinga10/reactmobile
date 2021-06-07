import React from 'react'
import api from "../../services/api";
import {Text, TouchableOpacity, View} from 'react-native'

export default class SumbmitButton extends React.Component{
    constructor(props){
        super(props);
        this.state={
            vendedor_matricula:'',
            total:0,
            list:[]
        }
    }

    _addProdVenda = async (id_venda:string) =>{
        const response = await api.post('/produtos/'+id_venda,{total_venda: this.state.list})
        console.log('_addProdVenda -> '+response)
    }

    _criarVenda = async () => {
        this.setState({list:this.props.data})
        const response = await api.post('/vendas/'+this.props.vendedor,{total_venda: this.state.total})
        console.log('_criarVenda -> '+response)
    }

    render(){
        return(
            <TouchableOpacity onPress={()=>this._criarVenda}>
                <Text>
                    vendedor: {this.props.vendedor} comprador: {this.props.comprador}
                </Text>
            </TouchableOpacity>
        )
    }
}