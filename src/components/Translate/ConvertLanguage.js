import { View,TouchableOpacity,Text } from 'react-native';
import styles from './style';
const ConvertLanguage=({navigation,children,language1,setLanguage1,language2,setLanguage2})=>{
    return(
        <View style={{ flexDirection: 'row' }}>
        
        <TouchableOpacity style={[styles.buttonlang,{backgroundColor:"#FEE2E2"}]}
        onPress={()=>navigation.navigate('Select Language',{language:language1,setLanguage:setLanguage1})}
        >
            <Text style={styles.buttonText}>{language1}</Text>
          </TouchableOpacity>
         {children}
          <TouchableOpacity style={styles.buttonlang}
           onPress={()=>navigation.navigate('Select Language',{language:language2,setLanguage:setLanguage2})}
          >
            <Text style={styles.buttonText}>{language2}</Text>
          </TouchableOpacity>
        </View>
    )
}
export default ConvertLanguage;