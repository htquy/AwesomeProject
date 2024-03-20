import { height,width } from "../LayoutComponent/style";
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity,KeyboardAvoidingView,Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from "../LayoutComponent/style";
import SvgUri from "react-native-svg-uri";
const ButtonMic=({stopRecording,startRecording,setIsUseVoice,isUseVoice,keyboarduse})=>{
    return(
        <>
        <View style={[styles.inputContainer,{display:keyboarduse?'none':'hidden'}]}>
          <View style={{width:"40%",alignItems:'center'}}>
          <TouchableOpacity style={[styles.handwriteButton,{display:isUseVoice?'none':'hidden'}]}>
          <SvgUri 
            width={0.0273*height} height={0.0273*height} source={require('../../../assets/svg/HandWrite.svg')}/>
          </TouchableOpacity>
          <Text style={{display:isUseVoice?'none':'hidden'}}>Handwrite</Text>
          </View>
          <View style={{width:"20%",alignItems:'center'}}>
            <View style={[styles.mic,{width:0.11*height,height:0.11*height,backgroundColor:'#FEE2E2',borderRadius:0.055*height}]}>
          <TouchableOpacity style={styles.mic}
          onPress={()=>{isUseVoice?stopRecording():startRecording();setIsUseVoice(!isUseVoice)}}
          >
          {isUseVoice?<Ionicons name="square-sharp" size={30} color="white"/>:<SvgUri height={0.055*height} width={0.055*height} source={require('../../../assets/svg/Microphone.svg')}/>}
          </TouchableOpacity>
          </View>
          </View>
          
          <View style={{width:"40%",alignItems:'center'}}>
          <TouchableOpacity style={[styles.uploadButton,{display:isUseVoice?'none':'hidden'}]}>
            <SvgUri 
            width={0.0273*height} height={0.0273*height} source={require('../../../assets/svg/Upload.svg')}/>
          </TouchableOpacity>
          <Text style={{display:isUseVoice?'none':'hidden'}}>Upload</Text>
          </View>
        </View>
        </>
    )
}
export default ButtonMic;