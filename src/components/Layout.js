import { Dimensions,StyleSheet,View,Text,TouchableOpacity,Animated } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import React,{ useState,useEffect,createContext,useContext, useRef } from "react";
import { useGlobalState } from './GlobalSate';
import { useNavigation } from '@react-navigation/native';
export const {width,height}=Dimensions.get('window');

const Layout=({children})=>{
  const navigation = useNavigation();
  const {keyboarduse,setKeyboarduse,isCurren,setIsCurren,somwidth,setSomwidth}=useGlobalState();
  const [isMounted, setIsMounted] = useState(false);
  const animatedWidth2 = useRef(new Animated.Value(height*0.402-somwidth)).current;
  const animatedWidth1 = useRef(new Animated.Value(somwidth)).current;
  console.log(isMounted,'12345');
  useEffect(() => {
    if (isMounted) {
      Animated.parallel([
        Animated.timing(animatedWidth1, {
          toValue: somwidth,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(animatedWidth2, {
          toValue: height * 0.402 - somwidth,
          duration: 100,
          useNativeDriver: false,
        }),
      ]).start(() => {
        if (isCurren) {
          navigation.navigate('CurrencyPage');
        } else {
          navigation.navigate('VoicePage');
        }
      });
    } else {
      setIsMounted(true);
    }
  }, [somwidth]);

  const handlePress = () => {
    setIsMounted(true);
    setIsCurren(!isCurren);
    setSomwidth(height*0.402-somwidth);
  };
    return(<SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity style={{left:10,position:'absolute'}} onPress={()=>{setSomwidth(height*0.35);navigation.navigate('Home')}}><Ionicons name="arrow-back" size={32} color="white" /></TouchableOpacity>
        <Text style={styles.title}>Quick Translate</Text>
        </View>
        {children}
        <View style={{height:height*0.08,bottom:0,display: keyboarduse ? 'none' : 'flex' }}>
        <View style={{height:height*0.066,width:'full',backgroundColor:'#FEE2E2',bottom:height*0.03,borderRadius:30,flexDirection:"row",marginHorizontal: 15,bottom:height*0.01}}>
          <TouchableOpacity 
          style={{}} onPress={()=>{isCurren?handlePress():null}}>
          <Animated.View style={{height:height*0.052,width:animatedWidth1,backgroundColor:isCurren?'#FFC9C9':"#CD1F20",top:height*0.007,left:height*0.007,borderRadius:21,alignItems:'center',flexDirection:'row',justifyContent:"center"}}>
            <MaterialIcons name='translate' size={30} color={isCurren?'red':"white"} />
            {isCurren?null:<Text style={{color:"white",fontSize:20}}>Translate</Text>}
          </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{position:'absolute',top:height*0.007,right:height*0.007,flex:1,alignItems:"center"}} onPress={()=>{
           isCurren?null: handlePress()
            //navigation.navigate('CurrencyPage');
          }}>
          <Animated.View style={{width:animatedWidth2,height:height*0.052,borderRadius:height*0.026,backgroundColor:isCurren?'#CD1F20':"#FFC9C9",alignItems:'center',flexDirection:'row',justifyContent:"center"}}>
          <MaterialIcons name='attach-money' size={30} color={isCurren?'white':"red"} />
          {isCurren?<Text style={{color:"white",fontSize:20}}>Currency</Text>:null}
          </Animated.View>
          </TouchableOpacity>
        </View>
        </View>
      </View>
      </SafeAreaView>)
}
export default Layout;
const styles = StyleSheet.create({
    title: {
        color: '#fff',
        fontSize: 20,
      },
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      height: height*0.08,
      backgroundColor: '#CD1F20',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection:'row'
    },})