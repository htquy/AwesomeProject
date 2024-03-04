import { StyleSheet } from "react-native";
import {width,height} from "../Layout";
const styles = StyleSheet.create({
    title: {
        color: '#fff',
        fontSize: 0.025*height,
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
    },
    body: {
      flex: 1,
      padding: 0.025*height,
    },
    inputContainer: {
      flex:1,
      flexDirection: 'row',
      alignItems: 'center',
      height: 0.068*height,
      
    },
    textInput: {
      flex: 1,
      padding: 10,
    },
    handwriteButton: {
      width: 0.054*height,
      height: 0.054*height,
      borderRadius: 0.027*height,
      backgroundColor: '#FEE2E2',
      justifyContent: 'center',
      alignItems: 'center',
    },
    uploadButton: {
      width: 0.054*height,
      height: 0.054*height,
      borderRadius: 0.027*height,
      backgroundColor: '#FEE2E2',
      justifyContent: 'center',
      alignItems: 'center',
    },
    outputContainer: {
      backgroundColor:'#F5F5F5',
      borderRadius: 0.015*height,
      borderWidth: 1,
      borderColor: '#ccc',
      height: height*0.55,
      padding: 10,
      top:15,
      borderColor:'#FEE2E2',
    },
    translateText: {
      fontSize: 0.034*height,
    },
    buttonText: {
      fontSize: 0.02*height,
    },
    buttonlang:{
      flex: 1,
      height: 0.068*height,
      borderRadius: 0.034*height,
      backgroundColor: '#F5F5F5',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5,
    },
    mic:{
      width: 0.096*height,
      height: 0.096*height,
      borderRadius: 0.048*height,
      backgroundColor: '#CD1F20',
      justifyContent: 'center',
      alignItems: 'center',
    }
  });
  export default styles;