import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from 'react-native-elements';
import { TouchableOpacity, FlatList, Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    botão:{
        marginHorizontal: 50,
        marginTop: 5,
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: "black",
        borderWidth: 1,
        borderColor: "black",
    },
});


export default class Cart extends React.PureComponent{
    constructor(props){
        super(props)
    }
    state={
        data:[],
    }

    componentDidMount(){
        this.loadData()
    }

    loadData = () => {
        const response = this.props?.list
        this.setState({data: response}) 
    }

    _renderItem = ({item}) => {
        var icon = 'null'
        if(item.categoria == 1) var icon = 'cup'
        if(item.categoria == 2) var icon = 'hamburger'
        if(item.categoria == 3) var icon = 'muffin'
        return(
            <>
            <View style={{flexDirection:'row', padding: 10, alignItems:'center'}}>
                <MaterialCommunityIcons name={icon} color='#303030' size={26} />
                <Text style={{marginLeft: 10, color:'#303030'}}>{item.nome}</Text>
                {/* <Input value={item.qnt}/> */}
            </View>
            {/* <Text>{JSON.stringify(item)}</Text> */}
            </>
        )
    }

    render(){
        return(
            <>
                <TouchableOpacity onPress={()=>{this.setState({data: this.props.list})}}>
                    <MaterialCommunityIcons name="reload" color={'white'} size={26} style={styles.botão}/>
                </TouchableOpacity>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={(item) => JSON.stringify(item.id)}
                >
                </FlatList>
            </>
        )
    }
}