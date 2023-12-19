import { Pressable , Text} from "native-base";
import { useNavigation } from '@react-navigation/native';

const Boton = (props) => {

    const navigation =useNavigation();
    const navegacion= (item) => {
        navigation.navigate(item);
      };

    const { text, color, colorText, nav} = props;
    


    return(
        <Pressable justifyContent={"center"} alignItems={"center"} w="80%" mx="10%" bg={color} h={12} borderRadius={50} my={4}  onPress={()=>navegacion(nav)}>
                <Text bold fontSize={"lg"}  color={colorText}> {text} </Text>
                
        </Pressable>
    )

}
export default Boton;