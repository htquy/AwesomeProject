import { ScrollView, TouchableOpacity, View, StyleSheet, Text,TextInput,FlatList } from "react-native";
import curencys from '../../utils/Currency.json'
import React,{useState,useEffect} from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import LayoutList from "../LayoutComponent/LayoutList";
import CountryFlag from "react-native-country-flag";
import { width,height } from "../LayoutComponent/style";

const SelectCurren=({route,navigation})=>{
    const{curency,setCurrency}=route.params;
    const [data, setData] = useState(curencys);
    const [text,setText]=useState('');
  useEffect(()=>{
    let tempData = curencys.filter(item => {
      return item.currencyCode.toLowerCase().indexOf(text.toLowerCase()) > -1||item.currencyName.toLowerCase().indexOf(text.toLowerCase()) > -1;
    });
    setData(tempData);
  },[text]);
  console.log(text);
    return (
        <LayoutList navigation={navigation}>
                <TextInput
                    placeholder="Search"
                    style={styles.searchInput}
                    onChangeText={txt => { setText(txt) }}
                />
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.countryItem}
                            onPress={() => { setCurrency(item.currencyCode); navigation.goBack(); }}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: 0.08 * width, height: 0.08 * width, overflow: "hidden", borderRadius: 0.4 * height, alignItems: 'center' }}>
                                    <CountryFlag isoCode={item.countryCode} size={0.08 * width} />
                                </View>
                                <Text style={{ left: 0.02 * width, top: 0.01 * width }}>{item.currencyName}</Text>
                                <Text style={{ right: 0.02 * width, top: 0.01 * width, position: 'absolute' }}>{item.currencyCode}</Text>
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
    },
});

export default SelectCurren;
