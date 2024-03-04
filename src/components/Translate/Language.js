import { ScrollView, TouchableOpacity, View, StyleSheet, Text,TextInput } from "react-native";
import languageCode from "../../utils/languageCode.json";
import React,{useState,useEffect} from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Layout from "../Layout";
import Voice from "@react-native-voice/voice";
const Language=({route,navigation})=>{
    const{language,setLanguage}=route.params;
    const [data, setData] = useState(languageCode);
    const [text,setText]=useState('');
    console.log(language);
  useEffect(()=>{
    let tempData = languageCode.filter(item => {
      return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
    });
    setData(tempData);
  },[text]);
  console.log(text);
    return (
        <Layout navigation={navigation}>
                <TextInput
                    placeholder="Search"
                    style={styles.searchInput}
                    onChangeText={txt => { setText(txt) }}
                />
                <ScrollView>
                    {
                        data.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.countryItem}
                                onPress={()=>{setLanguage(item.name);navigation.goBack();}}
                            >
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
                </Layout>
    );
};

const styles = StyleSheet.create({
    countryItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    searchInput: {
        width: '90%',
        height: 30,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#8e8e8e',
        alignSelf: 'center',
        marginTop: 10,
        paddingLeft: 10,
    },
});

export default Language;
