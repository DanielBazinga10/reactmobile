import React from 'react';
import {FlatList, ScrollView,View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import api from "../../services/api";
import 'react-native-gesture-handler';

const styles= StyleSheet.create({
    container:{
        flex:1,
        padding: 10,
    },
    title:{
        fontSize: 20,
        color: 'white',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 10,
    },
    redirectText:{
        textAlign: 'center',
        fontSize: 22,
        color: 'white',
        borderBottomColor:'white',
        borderBottomWidth:1
    },
    boxer:{
        display: "flex",
        backgroundColor: "#363636",
        flexDirection:"column",
        margin: 7,
        borderWidth: 1,
        borderColor: "#A9A9A9",
        borderRadius: 5,

    },
    box:{
        flex: 1,
        display: "flex",
        backgroundColor: "#363636",
        flexDirection:"column",
        margin: 5,
        borderWidth: 1,
        borderColor: "#A9A9A9",
        borderRadius: 5,
    },
    botão:{
        marginHorizontal: 50,
        alignItems: 'center',
        marginVertical: 5,
        backgroundColor: "black",
        borderWidth: 1,
        borderColor: "#A9A9A9",
    },

    boox:{
        padding: 10,
        margin: 5,
        borderColor: "#A9A9A9",
        borderWidth: 1,
        borderRadius: 5,
    },
    inboox:{
        borderColor: "#A9A9A9",
        borderBottomWidth: 1,
        color: '#DCDCDC',
        padding: 1,
    },
})

export default class Scan extends React.Component{
    state={
        matricula:'Matrícula',
        usrMat:'',
        user:'',
        total:0,
        cartList:[]
    }

    _criarVenda = async () => {
        // +this.state.usrMat
        const response = await api.post('/vendas/20181020150085',{total_venda: this.state.total})
        this._addProdVenda(response.data.id)
        console.log('_criarVenda -> ')
        console.log(this.state.usrMat)
        console.log(' -> ')
        console.log(this.state.total)
        console.log(' <-\n ')
        console.log('_criarVenda -> ')
        console.log(response.data.id)
    }

    _addProdVenda = async (id_venda:string) =>{
        const response = await api.post('/produtos/'+id_venda,{total_venda: this.state.cartList})
        console.log('\n_addProdVenda -> ')
        console.log(response)
    }

    addProdutos = async()=>{
        const response = await JSON.stringify(this.state.cartList);
        this.props.navigation.navigate('Produtos',{carrinho: response})
    }
    removeItem = (TESTE:number)=>{
        const ed = this.state.cartList
''
        delete ed[2];

        this.setState({cartList: ed})
    }
    _renderItem = ({item}) => {
        this.state.total = this.state.total+item.preco
        var icon = 'null'
        if(item.categoria == 1) var icon = 'cup'
        if(item.categoria == 2) var icon = 'hamburger'
        if(item.categoria == 3) var icon = 'muffin'
        return(
            <>
            <View style={{flexDirection:'row', padding: 10, alignItems:'center'}}>
                <Text>{this.state.total}</Text>
                <MaterialCommunityIcons name={icon} color='#fff' size={26} />
                <View style={{width:'20%'}}>
                    <Text style={{marginLeft: 10, color:'#fff'}}>{item.nome}</Text>
                </View>
                <View style={{width:'80%'}}>
                    <Text style={{color:'#fff'}}>Qnt: {item.id}</Text>
                    <TouchableOpacity onPress={()=>{this.removeItem(item.id)}}>
                        <MaterialCommunityIcons name={'delete'} color='#fff' size={26} />
                    </TouchableOpacity>
                </View>
            </View>
            </>
        )
    }

    render(){

        this.state.total = 0
        if(this.props.route.params?.matricula != undefined){
            this.state.matricula = this.props.route.params?.matricula 
        }

        if(this.props.route.params?.user != undefined){
            this.state.user = JSON.parse(this.props.route.params?.user)
        }
        if(this.props.route.params?.Marketlist != undefined){
            if(this.props.route.params?.Marketlist != JSON.stringify(this.state.cartList)){
                const res = JSON.parse(this.props.route.params?.Marketlist)
                this.state.cartList = res
            }
        }
        return(
            <ScrollView style={{backgroundColor: '#1C1C1C',}}>
                <View style={styles.container}>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Scanner')}>
                            <Text style={styles.redirectText}>
                                {this.state.matricula}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.boxer}>
                        <Text style={styles.title}>Informações do comprador</Text>

                        <View style={styles.boox}>
                            <Text style={styles.inboox}>Nome do comprador: {this.state.user.nome}</Text>
                            <Text style={styles.inboox}>Email: {this.state.user.email}</Text>
                            <Text style={styles.inboox}>Matricula: {this.state.user.matricula}</Text>
                            <Text style={styles.inboox}>Saldo atual: {this.state.user.saldo}</Text>
                        </View>

                    </View>

                    <View style={styles.boxer}>
                        <Text style={styles.title}>
                            Produtos sendo comprados
                        </Text>
                        <View style={styles.box}>

                            <FlatList
                                data={this.state.cartList}
                                renderItem={this._renderItem}
                                keyExtractor={(item) => JSON.stringify(item.id)}
                            ></FlatList>

                            <TouchableOpacity onPress={ () => this.addProdutos()} style={styles.botão}>
                                <MaterialCommunityIcons name="plus-circle-outline" color={'white'} size={26}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View 
                    style={{
                        backgroundColor: "white",

                    }}
                    >

                        <TouchableOpacity onPress={this._criarVenda}>
                            <Text>
                                Confirmar compra
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}