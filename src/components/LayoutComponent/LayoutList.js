import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style';
import { View,Text,TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useGlobalState } from '../GlobalSate';
import { Ionicons } from '@expo/vector-icons';
import { height,width } from './style';
const LayoutList=({children})=>{
    const navigation = useNavigation();
    const {setKeyboarduse}=useGlobalState();
    return (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity style={{left:10,position:'absolute'}} onPress={()=>{setKeyboarduse(false);navigation.goBack()}}><Ionicons name="arrow-back" size={32} color="white" /></TouchableOpacity>
        <Text style={styles.title}>Quick Translate</Text>
        </View>
        {children}
        </View>
    </SafeAreaView>)
}
export default LayoutList;