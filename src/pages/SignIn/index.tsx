import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Alert} from 'react-native';
import {useAuth} from '../../contexts/auth';
import LoginInput from '../../components/inputs/textInput'
import StyleGlobal from '../../styles/global';

const styles = StyleSheet.create({
    loginArea:{
        paddingVertical:1,
        paddingHorizontal:15,
        borderRadius:10,
        width:'100%',
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',

        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 12,
        },
        
        shadowOpacity: 1,
        shadowRadius: 12.00,

        elevation: 24,
    },
});

    const SignIn: React.FC = ({navigation}) => {
        const { signed, user, signIn } = useAuth();
        console.log(signed);

        function handleSignIn(){
            signIn();
        }

        const createTwoButtonAlert = () =>
        Alert.alert(
          "Alert Title",
          "My Alert Msg",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );

        return(
        <View style={StyleGlobal.container}>
            <View style={styles.loginArea}>
                <Image
                    style={{
                        width: 150,
                        height: 150,
                        bottom: 75,                           
                    }}
                    source={require('../../../assets/icon.png')}
                />
                <LoginInput/>
                <TouchableOpacity style={StyleGlobal.buttonLogin} onPress={handleSignIn}>
                    <Text style={StyleGlobal.buttonLoginText}>login</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
    }

export default SignIn;