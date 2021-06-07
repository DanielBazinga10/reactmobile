import 'react-native-gesture-handler';

import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {AuthProvider} from './src/contexts/auth'

import Routes from './src/routes/index';

const App: React.FC = () => {
  return (
    <>
    <StatusBar backgroundColor="#303030"/>
    <NavigationContainer>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </NavigationContainer>
    </>
  );
};

export default App;
