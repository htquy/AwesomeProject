import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { width,height } from '../Layout';
import { Ionicons } from '@expo/vector-icons';
const NumBoard = ({currency1,currency2,setCurrency1,setCurrency2,result1,result2,setResult1,setResult2}) => {
  const board = [[['C','#FFC9C9','#CD1F20'], ['<-','#FFC9C9','#CD1F20','arrow-back-sharp'], ['||','#FFC9C9','#CD1F20','swap-horizontal-outline'], ['\u00F7','#CD1F20','#FFFFFF']],
                 [['7','#F4F4F4','#656565'], ['8','#F4F4F4','#656565'], ['9','#F4F4F4','#656565'], ['x',"#CD1F20",'#FFFFFF']], 
                 [['4','#F4F4F4','#656565'], ['5','#F4F4F4','#656565'], ['6','#F4F4F4','#656565'], ['+',"#CD1F20",'#FFFFFF']], 
                 [['1','#F4F4F4','#656565'], ['2','#F4F4F4','#656565'], ['3','#F4F4F4','#656565'], ['-','#CD1F20','#FFFFFF']], 
                 [['0','#F4F4F4','#656565'], ['.','#F4F4F4','#656565'], ['%','#F4F4F4','#656565'], ['=','#CD1F20','#FFFFFF']]];
  const handleButton=(item)=>{
    if(item=='C'){
      setResult1('');
      setResult2('');
    }
    else if(item=='<-'){
      setResult1(result1.slice(0,-1));
    }
    else if(item=='||'){
      res=result1;
      setResult1(result2);
      setResult2(res);
      curren=currency1
      setCurrency1(currency2);
      setCurrency2(curren);
    }
    else if(item=='='){
      let result=result1.replace(/x/g,'*').replace(/\u00F7/g,'/').replace(/%/g,'*(1/100)');
      const resul=parseFloat(eval(result)).toFixed(2);
      setResult1(resul.toString());
      ConvertAPI(resul);
    }
    else{
      setResult1(result1+item);
    }
  }
  const ConvertAPI=(result)=>{
    if(result!=''&&parseFloat(result)>0){
      fetch(`https://v6.exchangerate-api.com/v6/face6e9c23ce8bab02465376/latest/${currency1}`)
          .then(response => response.json())
          .then(data => {
            const convertedValue = (parseFloat(data.conversion_rates[currency2]) * parseFloat(result)).toFixed(2);
            console.log(convertedValue); 
            setResult2(convertedValue.toString());
          })
          .catch(error => {
            console.error('Error:', error); 
          });
    }
  }
  useEffect(()=>{
    ConvertAPI(result1);
  },[currency1,currency2])
  return (
    <View style={{ height:width*1.18,width:'full',top:0.1*width }}>
      {
        board.map((items, index) => (
          <View key={index} style={{ justifyContent: 'center', alignItems: 'center', flex: 1,flexDirection:'row',height:'25%' }}>
            {
              items.map((i, innerIndex) => (
                <View key={innerIndex} style={{ justifyContent: 'center', alignItems: 'center', height: width*0.25, width: '25%' }}>
                  <TouchableOpacity style={{ width: '85%', height: '85%',justifyContent:'center',alignItems:'center', backgroundColor:i[1],borderRadius:width*0.05 }}
                  onPress={()=>handleButton(i[0])}
                  >
                    {i[3]!=null?<Ionicons name={i[3]} size={28} color={i[2]}/>:<Text style={{fontSize:28, color:i[2]}}>{i[[0]]}</Text>}
                  </TouchableOpacity>
                </View>
              ))
            }
          </View>
        ))
      }
    </View>
  );
};

export default NumBoard;
