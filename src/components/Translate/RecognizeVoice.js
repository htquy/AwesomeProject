import Voice from "@react-native-voice/voice";
import { View,Text,TouchableOpacity,Image,TextInput } from "react-native";
import { useEffect,useState } from "react";
import Layout from "../Layout";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";
import languagecode from "../../utils/languageCode.json";
import axios from "axios";
import Tts from "react-native-tts";
const Recognize=({route,navigation})=>{
    const[isUseVoice,setIsUseVoice]=useState("true");
    const[textTrans,setTextTrans]=useState("");
    const[text,setText]=useState('');
    const{language1,setLanguage1,language2,setLanguage2}=route.params;
    const[lang1,setLang1]=useState(language1);
    const[lang2,setLang2]=useState(language2);
    const codelanguage1=languagecode.find(item=>item.name===lang1).code;
    const codelanguage2=languagecode.find(item=>item.name===lang2).code;

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
    }, [text,lang2]);
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
        console.log("start ",lang1);
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
          startRecording();
          return () => {
            console.log("destroy");
            Voice.destroy().then(Voice.removeAllListeners);
          };
      }, []);
      
      return(
        <Layout navigation={navigation}>
            <View style={{flex:1,padding:20}}>
        <View style={{ flexDirection: 'row' }}>
        
        <TouchableOpacity style={[styles.buttonlang,{backgroundColor:"#FEE2E2"}]}
        onPress={()=>navigation.navigate('Select Language',{language:lang1,setLanguage:setLang1})}
        >
            <Text style={styles.buttonText}>{lang1}</Text>
          </TouchableOpacity>
         <TouchableOpacity style={{width:"13%",alignItems:'center'}}
         onPress={()=>{setLang1(lang2);
        setLang2(lang1);
        setText(textTrans);
        }}
         >
            <Image source={require('../../../assets/convert.png')} style={{width:25,height:25,top:15}}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonlang}
           onPress={()=>navigation.navigate('Select Language',{language:lang2,setLanguage:setLang2})}
          >
            <Text style={styles.buttonText}>{lang2}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.outputContainer}>
          <View style={{flex:1}}>
          {text!=""?<View style={{flexDirection:'row'}}>
            <Text>{lang1}</Text>
            <View style={{position:'absolute',right:10}}>
            <TouchableOpacity onPress={()=>{speakText(text)}}>
            <Ionicons name="md-volume-high" size={30} color="black"/>
            </TouchableOpacity>
            </View>
            </View>:null}
          <TextInput style={styles.translateText} placeholder='Let say something...' value={text} multiline={true} numberOfLines={5} editable={false} />
          </View>
          {text!=""?<View style={{flex:1}}>
            <View style={{height:3,width:"80%",left:"10%",right:20,backgroundColor:'#FEE2E2'}} />
            <View style={{flex:1,top:"10%"}}>
            <View style={{flexDirection:'row'}}>
            <Text>{lang2}</Text>
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
        </View>
        <View style={styles.inputContainer}>
          <View style={{width:"40%",alignItems:'center'}}>
          </View>
          <View style={{width:"20%",alignItems:'center'}}>
          <TouchableOpacity style={styles.mic}
          onPress={()=>{isUseVoice?stopRecording():startRecording();setIsUseVoice(!isUseVoice)}}
          >
          {isUseVoice?<Ionicons name="square-sharp" size={30} color="white"/>:<Ionicons name="mic" size={32} color="white" />}
          </TouchableOpacity>
          </View>
          
        </View>
        </Layout>
      )
}
export default Recognize;