import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './stackNavigator';
 
export default function Navigation() {
  return (
    <NavigationContainer>
        <StackNavigator />
    </NavigationContainer>
  );
}