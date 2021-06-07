import React from 'react'
import { TouchableOpacity, View, FlatList, Text, StyleSheet } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from 'react-native-elements';

const styles = StyleSheet.create({
    botão:{
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 5,
        alignItems: "center",
        padding: 10,
        margin: 10,

    },
    Jaxson:{
        flexDirection:'row', 
        padding: 5, 
        marginTop: 5, 
        marginHorizontal: 10, 
        alignItems:'center', 
        borderWidth: 1, 
        borderColor: "#000000",
    },
    plusCirculo:{
        alignItems: "flex-end",
    },
});

export default class MarketList extends React.Component {
    state = {
        carrinho:[],
        data: [],
    }

    componentDidMount() {
        this.fetchData();
    }

    pageTransition = async()=>{
        const cart = await JSON.stringify(this.state.carrinho)
        this.props.navigation.navigate('Scan',{Marketlist: cart})
    }

    fetchData = async () => {
        const response = await fetch('http://sistemaifrj.herokuapp.com/produtos');
        const produtos  =  await response.json();
        this.setState({data: produtos});
    }

    addInExportList(item:any){
        this.state.carrinho.push(item)
    }

    _renderItem = ({item}) => {
        var icon = 'null'
        if(item.categoria == 1) var icon = 'cup'
        if(item.categoria == 2) var icon = 'hamburger'
        if(item.categoria == 3) var icon = 'muffin'

        return  (
            <TouchableOpacity 
                onPress={()=>this.addInExportList(item)} 
                style={styles.Jaxson}
            >
                <MaterialCommunityIcons name={icon} color='#303030' size={25} />
                <Text style={{marginLeft: 10}}>{item.nome}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        if(this.props.route.params?.carrinho != undefined){
            this.state.carrinho = JSON.parse(this.props.route.params?.carrinho)
        }

        return (
            <>
                <FlatList 
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={(item) => JSON.stringify(item.id)}
                    ItemSeparatorComponent={()=>
                        <View style={{height:1, backgroundColor: '#f7f7f7'}}/>
                    }
                />
                <TouchableOpacity onPress={()=>{ this.pageTransition() }} style={styles.botão}>
                    <Text> Finalizar adição de pedidos</Text>
                </TouchableOpacity>
            </>
        );
    }
}