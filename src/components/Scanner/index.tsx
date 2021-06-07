import React, { useEffect } from 'react';
import { Alert, Text, View, StyleSheet} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {NavigationAction} from '@react-navigation/native';
import * as scanIndex from '../../services/scanIndex';


export default class Scanner extends React.Component{
    state={
        scanned:false,
        HasPermission:null
    }

    matData = async(dados:string)=> {
        const response  = await scanIndex.scanner(dados);
        this.props.navigation.navigate('Scan',{matricula: dados, user: response})
        this.setState({scanned: false})
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({scanned: true});

        if( type != 128){
            Alert.alert(
                'Código de barras inválido.',
                `O código de barras lido é invalido, por favor tente novamente.`,
                [
                    {text: 'Okay, tentar novamente', onPress: () => {this.setState({scanned: false})}},
                ],
                {cancelable: false},
            );
        }else{
            this.state.scanned = true;
            Alert.alert(
                'Código de barras escaneado.',
                `Matrícula: ${data}\nA matrícula escaneada confere com a do cartão?`,
                [
                    { text: 'Não, escanear novamente.', onPress: () => {this.setState({scanned: false})}},
                    { text: 'Sim', onPress: () => { this.matData(data) }},
                ],
                {cancelable: false},
            );
        }   
    };

    setEffect = async () =>{
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        this.setState({HasPermission: status === 'granted'})
    }

    UNSAFE_componentWillMount = () => {
        this.setEffect();
    }

    render(){
        if (this.state.HasPermission === null) return <Text>Requisitando a permissão do uso da câmera</Text>;
        if (this.state.HasPermission === false) return <Text>Acesso à câmera negado.</Text>;

        return(
            <View style={{backgroundColor: '#bdbdbd',flex: 1,flexDirection: 'column',justifyContent: 'flex-end',}}>
                <BarCodeScanner onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned} style={StyleSheet.absoluteFillObject}/>
            </View>
        );
    }
}
