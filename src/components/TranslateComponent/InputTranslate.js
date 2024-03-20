import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity,KeyboardAvoidingView,Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from "../LayoutComponent/style";
const InputComponent=({text,isUseVoice,language1,language2,setText,speakText,textTrans})=>{
    return(
        <>
        <View style={{flex:1}}>
          {text!=""?<View style={{flexDirection:'row'}}>
            <Text>{language1}</Text>
            <View style={{position:'absolute',right:10}}>
            <TouchableOpacity onPress={()=>{setText('')}}>
            <Ionicons name="close-sharp" size={30} color="black"/>
            </TouchableOpacity>
            </View>
            </View>:null}
          { isUseVoice?
            <TextInput style={styles.translateText} placeholder='Let say something...' value={text} multiline={true} numberOfLines={4} />:
            <TextInput style={styles.translateText} placeholder='Enter Text...' value={text} multiline={true} numberOfLines={4} onChangeText={(txt)=>setText(txt)}/>}
          </View>
          {text!=""?<View style={{height:3,width:"80%",left:"10%",right:20,backgroundColor:'#FEE2E2'}} />:null}
          {text!=""?<View style={{flex:1}}>
            <View style={{flex:1,top:"10%"}}>
            <View style={{flexDirection:'row'}}>
            <Text>{language2}</Text>
            <View style={{position:'absolute',right:10}}>
              <TouchableOpacity onPress={()=>speakText(textTrans)}>
            <Ionicons name="md-volume-high" size={30} color="black"/>
            </TouchableOpacity>
            </View>
            </View>
              <TextInput style={styles.translateText} editable={false} value={textTrans} multiline={true} numberOfLines={5}/>
            
            </View>
            </View>:null}
        </>
    )
}
export default InputComponent;