import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity,KeyboardAvoidingView,Platform } from 'react-native';
import ButtonMic from '../components/TranslateComponent/ButtonMic';
import Layout from '../components/LayoutComponent/Layout';
import {width,height} from '../components/LayoutComponent/style';
import styles from '../components/LayoutComponent/style';
import languagecode from "../utils/languageCode.json";
import axios from "axios";
import Tts from "react-native-tts";
import { useGlobalState } from '../components/GlobalSate';
import ConvertLanguage from '../components/TranslateComponent/ConvertLanguage';
import Voice from "@react-native-voice/voice";
import InputComponent from '../components/TranslateComponent/InputTranslate';
//import languageCode from './utils/languageCode.json';
const TranslatePage = ({navigation}) => {
  const { keyboarduse, keyboardHeight} = useGlobalState();
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
      <View style={styles.body}>

        <ConvertLanguage language1={language1} setLanguage1={setLanguage1} language2={language2} setLanguage2={setLanguage2} navigation={navigation}>
        <TouchableOpacity style={{width:"13%",alignItems:'center'}}
         onPress={()=>{setLanguage1(language2);
        setLanguage2(language1);
        setText(textTrans);
        }}
         >
            <Image source={require('../../assets/png/convert.png')} style={{width:25,height:25,top:15}}/>
          </TouchableOpacity>
        </ConvertLanguage>

        <View style={[styles.outputContainer,{height:keyboarduse?(height-height*0.2303  -keyboardHeight):0.5*height}]}>
        <InputComponent text={text} isUseVoice={isUseVoice} language1={language1} language2={language2} setText={setText} speakText={speakText} textTrans={textTrans}/>
        </View>

        <ButtonMic stopRecording={stopRecording} startRecording={startRecording} isUseVoice={isUseVoice} setIsUseVoice={setIsUseVoice} keyboarduse={keyboarduse}/>
        
      </View>
  );
};

export default TranslatePage;
