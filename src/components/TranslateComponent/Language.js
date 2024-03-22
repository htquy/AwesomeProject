import { ScrollView, TouchableOpacity, View, StyleSheet, Text,TextInput, FlatList } from "react-native";
import languageCode from "../../utils/languageCode.json";
import React,{useState,useEffect} from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import LayoutList from "../LayoutComponent/LayoutList";
import { Ionicons } from "@expo/vector-icons";
const Language=({route,navigation})=>{
    const{language,setLanguage}=route.params;
    const [data, setData] = useState(languageCode);
    const [text,setText]=useState('');
  useEffect(()=>{
    let tempData = languageCode.filter(item => {
      return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
    });
    setData(tempData);
  },[text]);

    var listLanguage=data.concat();
    data.forEach((item,index)=>{
        if(item.name==language){
            let indexLanguage=index;
            if(indexLanguage>-1){
                listLanguage.splice(index,1);
                listLanguage.unshift(item);
            }
            return;
        }
    })
    return (
        <LayoutList navigation={navigation}>
                <TextInput
                    placeholder="Search"
                    style={styles.searchInput}
                    onChangeText={txt => { setText(txt) }}
                />
                <FlatList 
                data={listLanguage}
                renderItem={({item,index})=>(
                    <TouchableOpacity
                    key={index}
                    style={styles.countryItem}
                    onPress={()=>{setLanguage(item.name);navigation.goBack();}}
                    >
                        <View style={{flexDirection:'row',flex:1}}>
                             <View>
                        <Text style={{fontSize:20}}>{item.name}</Text>
                        </View> 
                        <View style={{right:0,position:'absolute'}}>
                        {item.name==language?<Ionicons name="checkmark-outline" size={30} color={'green'} />:null}
                        </View>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                />
                </LayoutList>
    );
};

const styles = StyleSheet.create({
    countryItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        flexDirection:'row',
        flex:1
    },
    searchInput: {
        width: '90%',
        height: 45,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#8e8e8e',
        alignSelf: 'center',
        marginTop: 10,
        paddingLeft: 10,
        fontSize:20
    },
});

export default Language;
