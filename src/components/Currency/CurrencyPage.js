import Layout from "../Layout";
import { Text, View,StyleSheet, TouchableOpacity } from "react-native";
import CountryFlag from "react-native-country-flag";
import currencys from '../../utils/Currency.json'
import NumBoard from "./NumBoard";
import { useState,useEffect } from "react";
import { width,height } from "../Layout";
const CurrencyPage=({navigation})=>{
    const [text,setText]=useState();
    const [currency1,setCurrency1]=useState('USD')
    const [currency2,setCurrency2]=useState('')
    const [result1,setResult1]=useState('')
    const [result2,setResult2]=useState('')
    var currencyUnit1=currencys.find(item=>item.currencyCode==currency1);
    var currencyUnit2=currencys.find(item=>item.currencyCode==currency2);
    useEffect(() => {
        fetch('https://ipinfo.io/json')
          .then(response => response.json())
          .then(data => {
            const { country } = data;
            let cu=currencys.find(item=>item.countryuse.includes(country));
            if(cu!=null){
            setCurrency2(cu.currencyCode);}
            console.log(cu);
          })
          .catch(error => console.error('Error fetching country:', error));
      }, []);
      console.log(result2)
    return(
        <Layout>
            <View style={{flex:1,paddingLeft:0.025*width,paddingRight:0.025*width}}>
            <View style={[styles.viewcurren,{backgroundColor:'#FEE2E2'}]}>
            <TouchableOpacity style={{flexDirection:'row'}}
            onPress={()=>navigation.navigate('select currency',{currency:currency1,setCurrency:setCurrency1})}>
            <View style={styles.flag}><CountryFlag isoCode={currencyUnit1.countryCode} size={0.08*width} /></View>
            <Text style={{fontSize:0.05*width,left:5,top:0.01*width}}>{currencyUnit1.currencyCode}</Text>
            </TouchableOpacity>
            <View style={{flex:1,alignItems:'flex-end',marginRight:0.04*width}}>
            <Text style={{fontSize:0.06*width,marginRight:0,color:'#656565'}}>{result1}{currencyUnit1.symbol}</Text>
            </View>
            </View>
            <View style={[styles.viewcurren,{backgroundColor:'#F5F5F5',top:0.06*width}]}>
            <TouchableOpacity style={{flexDirection:'row'}}
            onPress={()=>navigation.navigate('select currency',{currency:currency2,setCurrency:setCurrency2})}>
            <View style={styles.flag}>{currency2==''?null:<CountryFlag isoCode={currencyUnit2?.countryCode} size={0.08*width} />}</View>
            <Text style={{fontSize:0.05*width,left:5,top:0.01*width}}>{currencyUnit2?.currencyCode}</Text>
            </TouchableOpacity>
            <View style={{flex:1,alignItems:'flex-end',marginRight:0.04*width}}>
            <Text style={{fontSize:0.06*width,color:'#656565'}}>{result2}{currencyUnit2?.symbol}</Text>
            </View>
            </View>
            <View style={{alignItems:'center'}}>
            <NumBoard currency1={currency1} currency2={currency2} setCurrency1={setCurrency1} setCurrency2={setCurrency2} result1={result1} result2={result2} setResult1={setResult1} setResult2={setResult2} />
            </View>
            </View>
        </Layout>
    )
}
export default CurrencyPage;
const styles=StyleSheet.create(
    {
        viewcurren:{
            flexDirection:'row',
            height:0.16*width,
            paddingTop:0.04*width,
            paddingBottom:0.04*width,
            top:0.04*width,
            paddingLeft:0.04*width,
            borderRadius:0.08*width
        },
        flag:{
            width:0.08*width, 
            height:0.08*width,
            overflow:"hidden",
            borderRadius:0.4*height,
            alignItems:'center'
        }
    }
)