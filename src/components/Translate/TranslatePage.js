import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity,KeyboardAvoidingView,Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Layout from '../Layout';
import {width,height} from '../Layout';
import styles from './style';
import languagecode from "../../utils/languageCode.json";
import axios from "axios";
import Tts from "react-native-tts";
import { useGlobalState } from '../GlobalSate';
import ConvertLanguage from './ConvertLanguage';
import Voice from "@react-native-voice/voice";
//import languageCode from './utils/languageCode.json';
const TranslatePage = ({navigation}) => {
  const { keyboarduse, keyboardHeight} = useGlobalState();
  console.log(keyboarduse);
  console.log(keyboardHeight);
  console.log(height);
  const [language1, setLanguage1] = useState("English");
  const [language2, setLanguage2] = useState("Vietnamese");
  const[isUseVoice,setIsUseVoice]=useState(false);
  const[textTrans,setTextTrans]=useState("");
  const[text,setText]=useState('');

  const codelanguage1=languagecode.find(item=>item.name===language1).code;
  const codelanguage2=languagecode.find(item=>item.name===language2).code;
  const handleTextChange=(txt)=>{
    setText(txt);
  }
  const speakText = (txt) => {
    Tts.speak(txt);
  };
  const handleTranslate = async (text) => {
    console.log(text);
    const postData = {
      contents: text,
      contTargetLanguageCode: codelanguage2,
      sourceLanguageCode: codelanguage1,
    };

    const fetchApi = async () => {
      try {
        console.log(postData);
        const url = `http://103.101.161.178:123/api/v1/translate`;
        var res = await axios.post(url, postData);
        setTextTrans(res.data.translatedText);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const response = await fetchApi();
  console.log(response);
  };
  useEffect(() => {
    const fetchData = async () => {
        await handleTranslate(text);
    };
    fetchData();
  }, [text,language2]);
  const speechStartHandler = (e) => {
    console.log("speechStart successful", e);
  };
    const speechEndHandler = (e) => {
     // setLoading(false);
      console.log("stop handler", e);
      setIsUseVoice(false);
    };
    const speechPartialResultsHandler = (e) => {
      //setIsUseVoice(true);
      console.log(true);
      const text = e.value[0];
      handleTextChange(text);
    };
    const startRecording = async () => {
      console.log("start ",language1);
      try {
        await Voice.start(codelanguage1);
      } catch (error) {
        console.log("errorStart", error);
      }
    };
    console.log(Voice.isRecognizing());
    const stopRecording = async () => {
      try {
        console.log("stop");
        await Voice.stop();
      } catch (error) {
        console.log("errorStop", error);
      }
      if(isUseVoice==false)setIsUseVoice(true);
    };
    useEffect(() => {
        Voice.onSpeechStart = speechStartHandler;
        Voice.onSpeechPartialResults=speechPartialResultsHandler;
        Voice.onSpeechEnd = speechEndHandler;
        return () => {
          console.log("destroy");
          Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);
  return (
    
      <Layout navigation={navigation}>
      <View style={styles.body}>

        <ConvertLanguage language1={language1} setLanguage1={setLanguage1} language2={language2} setLanguage2={setLanguage2} navigation={navigation}>
        <TouchableOpacity style={{width:"13%",alignItems:'center'}}
         onPress={()=>{setLanguage1(language2);
        setLanguage2(language1);
        setText(textTrans);
        }}
         >
            <Image source={require('../../../assets/convert.png')} style={{width:25,height:25,top:15}}/>
          </TouchableOpacity>
        </ConvertLanguage>

        <View style={[styles.outputContainer,{height:keyboarduse?(height-height*0.2303  -keyboardHeight):0.5*height}]}>
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
          {text!=""?<View style={{flex:1}}>
            <View style={{height:3,width:"80%",left:"10%",right:20,backgroundColor:'#FEE2E2'}} />
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
        </View>

        <View style={[styles.inputContainer,{display:keyboarduse?'none':'hidden'}]}>
          <View style={{width:"40%",alignItems:'center'}}>
          <TouchableOpacity style={[styles.handwriteButton,{display:isUseVoice?'none':'hidden'}]}>
            <Image source={require('../../../assets/handwrite.png')} style={{width:0.0273*height,height:0.0273*height}} />
          </TouchableOpacity>
          <Text style={{display:isUseVoice?'none':'hidden'}}>Handwrite</Text>
          </View>
          <View style={{width:"20%",alignItems:'center'}}>
          <TouchableOpacity style={styles.mic}
          onPress={()=>{isUseVoice?stopRecording():startRecording();setIsUseVoice(!isUseVoice)}}
          >
          {isUseVoice?<Ionicons name="square-sharp" size={30} color="white"/>:<Ionicons name="mic" size={32} color="white" />}
          </TouchableOpacity>
          </View>
          
          <View style={{width:"40%",alignItems:'center'}}>
          <TouchableOpacity style={[styles.uploadButton,{display:isUseVoice?'none':'hidden'}]}>
            <Image source={require('../../../assets/upload.png')} style={{width:0.0273*height,height:0.0273*height}} />
          </TouchableOpacity>
          <Text style={{display:isUseVoice?'none':'hidden'}}>Upload</Text>
          </View>
        </View>
        
      </View>
      </Layout>
  );
};

export default TranslatePage;
