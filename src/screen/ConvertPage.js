import CurrencyPage from "./CurrencyPage";
import TranslatePage from "./TranslatePage";
import Layout from "../components/LayoutComponent/Layout";
import { useGlobalState } from "../components/GlobalSate";
const ConvertPage=({navigation})=>{
    const{isCurren,setIsCurren,somwidth,setSomwidth}=useGlobalState();
    console.log(isCurren,'12345');
    return(
    <Layout navigation={navigation}>
    {isCurren?<CurrencyPage navigation={navigation} />:<TranslatePage navigation={navigation}/>}
    </ Layout>)
}
export default ConvertPage;