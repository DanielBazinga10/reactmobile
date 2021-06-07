import React from 'react';
import { View, Button, Text, StyleSheet, Image} from 'react-native';
import {useAuth} from '../../contexts/auth';

const styles = StyleSheet.create({
    imagem:{
        paddingHorizontal: 10,
        paddingBottom: 10,
        marginHorizontal: 50,
        marginBottom: 50,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
        borderRadius: 100,
        borderWidth: 5,
        borderColor: "black",
        width: 200,
        height: 200,
    },
    box1:{
        flex:1,
        justifyContent: 'center',
        borderColor: "black",
        backgroundColor: "#1C1C1C",
    },
    box2:{
        marginVertical: 50,
        padding: 25,
        margin: 25,
        borderRadius: 5,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "black",
    },
    title:{
        paddingTop: 10,
        borderColor: "black",
        borderBottomWidth: 1,
    },
    text:{
        paddingBottom: 15,
    },
});

    
    const Configs: React.FC = () => {
        const { user, signOut} = useAuth();
        
        function handleSignOut(){
            signOut();
        }
        return(
            
        <View style={styles.box1}>


            <View style={styles.box2}>
                <Image source={require('../../imgs/usr.png')} style={styles.imagem}/>
                <Text style={{color: "black", fontSize: 25, textAlign: 'center',}}> {user?.nome} </Text>

                <Text style={styles.title}> Matricula: </Text>
                <Text style={styles.text}> {user?.matricula} </Text>
                <Text style={styles.title}> Email: </Text>
                <Text style={styles.text}> {user?.email} </Text>
                <Button title='Sign Out' onPress={handleSignOut} color="black"/>
            </View>
        </View>
        )
    }

export default Configs;