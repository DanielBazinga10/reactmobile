import React from 'react';
import Dashboard from '../pages/Dashboard';
import ModalNavigator from './scanModal.routes'
import Configs from '../pages/Configs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs' ;
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AppStack = createMaterialBottomTabNavigator();

const AppRoutes: React.FC = () => (
    <AppStack.Navigator
        activeColor="white"
        inactiveColor="#bdbdbd"
        barStyle={{ backgroundColor: '#303030' }}
    >

        <AppStack.Screen 
            name='Configs' 
            component={Configs}
            options={{
                tabBarLabel: 'Perfil',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="wrench" color={color} size={26} />
                ),
            }}        
        />
        
        <AppStack.Screen 
            name='Dashboard' 
            component={Dashboard}
            options={{
                tabBarLabel: 'Inicio',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
            }}
        />
        
        <AppStack.Screen 
            name='Scan' 
            component={ModalNavigator}
            options={{
                tabBarLabel: 'Scan',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="magnify-scan" color={color} size={26} />
                ),
            }}
        />
        
    </AppStack.Navigator>
);


export default AppRoutes;