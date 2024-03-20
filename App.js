import { NavigationContainer } from '@react-navigation/native';
import TranslatePage from './src/screen/TranslatePage';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Language from './src/components/TranslateComponent/Language';
import CurrencyPage from './src/screen/CurrencyPage';
import home from './src/components/Home/home';
import { MyContextProvider } from './src/components/GlobalSate';
import SelectCurren from './src/components/Currency/SelectCurren';
import ConvertPage from './src/screen/ConvertPage';
const Stack = createNativeStackNavigator();
export default App=()=>{
  return(
    <MyContextProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>

      <Stack.Screen name='Select Language' component={Language}/>
      <Stack.Screen name='Home' component={home}/>
      <Stack.Screen name='select currency' component={SelectCurren} />
      <Stack.Screen name='ConvertPage' component={ConvertPage} />
      </Stack.Navigator>
    </NavigationContainer>
    </MyContextProvider>

  )
}