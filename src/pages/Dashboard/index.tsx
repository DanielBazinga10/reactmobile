import React from 'react';
import { View, Button, Text, StyleSheet, Image} from 'react-native';
import {useAuth} from '../../contexts/auth';

const styles = StyleSheet.create({
    cointainer:{

    },
});

    
    const Dashboard: React.FC = () => {
        const { user, signOut} = useAuth();
        
        function handleSignOut(){
            signOut();
        }
        return(
            
        <View style={styles.box}>

            <View style={styles.boxer}>
            </View>
        </View>
        )
    }

export default Dashboard;