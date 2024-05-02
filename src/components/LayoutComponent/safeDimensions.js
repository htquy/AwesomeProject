
import { Dimensions,StyleSheet} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const safeDimensions=()=>{
    const insets = useSafeAreaInsets();
    const width=Dimensions.get('window').width
    const height=Dimensions.get('window').height-insets.top-insets.bottom;
    console.log(width,"*****",height);
    return {width,height};
  }
  export default safeDimensions;