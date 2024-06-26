import {  TouchableOpacity, View ,Text} from "react-native"
import { useNavigation } from '@react-navigation/native';
import { useGlobalState } from "../GlobalSate";
import { height } from "../LayoutComponent/style";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const home=()=>{
    const navigation = useNavigation();
    const{isCurren,setIsCurren,somwidth,setSomwidth}=useGlobalState();

    return(
        <View style={{flex:1,top:100}}>
            <TouchableOpacity onPress={()=>{setIsCurren(false);setSomwidth(height*0.35);navigation.navigate('ConvertPage',{navigation:navigation})}}>
                <View style={{width:'100%',height:60,alignItems:'center',alignContent:'center',backgroundColor:'aqua'}}>
                    <Text>Translate</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setIsCurren(true);setSomwidth(height*0.052);navigation.navigate('ConvertPage',{navigation:navigation})}}>
                <View style={{width:'100%',height:60,alignItems:'center',alignContent:'center',backgroundColor:'aqua'}}>
                    <Text>Currency</Text>
                </View>
            </TouchableOpacity>
        </View>

    )
}
export default home;