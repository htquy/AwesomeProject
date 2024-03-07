import { NavigationContainer } from '@react-navigation/native';
import TranslatePage from './src/components/Translate/TranslatePage';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Recognize from './src/components/Translate/RecognizeVoice';
import Language from './src/components/Translate/Language';
import CurrencyPage from './src/components/Currency/CurrencyPage';
import home from './src/components/Home/home';
import { MyContextProvider } from './src/components/GlobalSate';
import SelectCurren from './src/components/Currency/SelectCurren';
const Stack = createNativeStackNavigator();
export default App=()=>{
  return(
    <MyContextProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
      <Stack.Screen name='VoicePage' component={TranslatePage}/>
      <Stack.Screen name='Select Language' component={Language}/>
      <Stack.Screen name='CurrencyPage' component={CurrencyPage}/>
      <Stack.Screen name='Home' component={home}/>
      <Stack.Screen name='select currency' component={SelectCurren} />
      </Stack.Navigator>
    </NavigationContainer>
    </MyContextProvider>

  )
}