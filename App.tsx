import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HistoryScreen from './src/screens/HistoryScreen';
import CurrencyConvertor from './src/screens/CurrencyConvertor'


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="CurrencyConversionApp" component={CurrencyConvertor} />
        {/* <Stack.Screen name="CurrencyConvertor" component={CurrencyConvertorScreen} /> */}
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );  
}
export default App;
