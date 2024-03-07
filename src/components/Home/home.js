import {  TouchableOpacity, View ,Text} from "react-native"
import { useNavigation } from '@react-navigation/native';
import { useGlobalState } from "../GlobalSate";
import { height } from "../Layout";
const home=()=>{
    const navigation = useNavigation();
    const{isCurren,setIsCurren,somwidth,setSomwidth}=useGlobalState();
    return(
        <View style={{flex:1}}>
            <TouchableOpacity onPress={()=>{setIsCurren(false);setSomwidth(height*0.35);navigation.navigate('VoicePage')}}>
                <View style={{width:'100%',height:60,alignItems:'center',alignContent:'center',backgroundColor:'aqua'}}>
                    <Text>Translate</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setIsCurren(true);setSomwidth(height*0.052);navigation.navigate('CurrencyPage')}}>
                <View style={{width:'100%',height:60,alignItems:'center',alignContent:'center',backgroundColor:'aqua'}}>
                    <Text>Currency</Text>
                </View>
            </TouchableOpacity>
        </View>
        
    )
}
export default home;