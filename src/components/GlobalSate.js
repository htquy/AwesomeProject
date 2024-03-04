import { Dimensions,StyleSheet,View,Text,TouchableOpacity,KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState,useEffect,createContext,useContext } from "react";
import React from "react";
import { height,width } from "./Layout";
const MyContext = createContext();
export const MyContextProvider=({children})=>{
    const [keyboarduse, setKeyboarduse] = useState(false);
    const[keyboardHeight,setKeyboardHeight]=useState(0);
    const[isCurren,setIsCurren]=useState(false);
    const [somwidth,setSomwidth]=useState(height*0.35);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboarduse(true);
      setKeyboardHeight(height - event.endCoordinates.screenY);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboarduse(false);
      setKeyboardHeight(0);
    });

    // Cleanup
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
    return(
        <MyContext.Provider value={{ keyboarduse, keyboardHeight,isCurren,setIsCurren,somwidth,setSomwidth }}>
            {children}
        </MyContext.Provider>
    )
}
export const useGlobalState = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error('useGlobalState must be used within a MyContextProvider');
    }
    return context;
};
