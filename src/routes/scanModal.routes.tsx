import React from 'react';
import ScanPage from '../pages/Scan';
import Scanner from '../components/Scanner';
import { createStackNavigator } from '@react-navigation/stack' ;
import MarketList from '../pages/MarketList';

const ModalStack = createStackNavigator();

export default function ModalNavigator(){
    return(
    <ModalStack.Navigator>
        <ModalStack.Screen 
            name='Scanner' 
            component={Scanner}
        />
        <ModalStack.Screen 
            name='Scan' 
            component={ScanPage}
            options={{ headerShown: false }}
        />
        <ModalStack.Screen 
            name='Produtos' 
            component={MarketList}
            options={{ headerShown: false }}
        />
    </ModalStack.Navigator>
    )}