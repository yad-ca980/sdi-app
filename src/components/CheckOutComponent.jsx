import { Box, Icon, Stack , Image, Text, Center, Pressable} from "native-base";
import colors from "../colors";
import {  useState } from "react";
import { FontAwesome5 } from '@expo/vector-icons'; 
import URL from "../helper/URL";
import fetchPost from "../helper/fetchPost";
import { Alert } from 'react-native';

const CheckOutComponent= (props)=>{
     //inicia funciones para contar

     const { nombre, precio, id, image, impreso, idAS , idU, cantidad, sucursal, subtotal, idS} =props;
     const [ count, setCount ] = useState(1);
     const incrementCount = () => {
       setCount(count + 1);
     };
   
     const decrementCount = () => {
       if (count > 1) {
         setCount(count - 1);
       }
     };
    // console.log("impreso?", impreso)
    const eliminarItem = async()=>{
        const BASE_URL= URL.BASE_URL;
            
        const dataFav = new FormData();
        dataFav.append("id", id);
        
        const url = `${BASE_URL}abdiel/carrito/delete_item`
        const options = {
          method:'POST',
          body: dataFav
        };
        const res = await fetchPost(url, options);
        console.log("delete fav:", res);
        if (res!==true){
            Alert.alert('Error al eliminar', 'Comprueba tu conexión a internet e intentalo más tarde', [
                {
                    text: 'Volver',
                    onPress: () => console.log("btn volver error") //props.navigation.navigate("Welcome"),
                  
                }
              ])
        }else{
            Alert.alert('Se elimino con éxito', '¿Que deseas hacer ahora?', [
                {
                    text: 'Volver al carrito',
                    onPress: () => console.log("btn volver ") //props.navigation.navigate("Welcome"),
                  
                },
                {
                    text: 'Ir a inicio',
                    onPress: () => props.navigation.navigate("Home") //props.navigation.navigate("Welcome"),
                  
                }

              ])
        }
      }

      const previoEliminar= ()=>{
        Alert.alert(`Estas seguro que deseas eliminar ${nombre}`, 'Puedes agregarlo nuevamente despues', [
            {
                text: 'Cancelar',
                onPress: () => console.log("btn cancelar ") //props.navigation.navigate("Welcome"),
              
            },
            {
                text: 'Eliminar del carrito',
                onPress: () => eliminarItem() //props.navigation.navigate("Welcome"),
              
            }

          ])
      }



    return(
        <Box h={40} w={"90%"} mx={"5%"}  my={2} shadow={6} bg="white" borderRadius={20} >
            <Stack direction={"row"}> 
             
                <Image source={{
                uri: `http://sdiqro.store/static/imgServicios/${image}`
                }} alt="Alternate Text" size="xl" mt={2} mx={2} resizeMode="contain"/>
                <Stack direction={"column"} justifyContent={"center"}  w="150" mt={2}>
                    <Text bold> {nombre}</Text>
                    <Text>Producto {impreso==0 ? "no impreso" : "impreso"}</Text>
                    <Text>Sucursal: {sucursal}</Text>
                    <Text >Precio unitario: ${precio}</Text>
                    <Text>Cantidad: {cantidad}</Text>
                    <Text>Subtotal: ${subtotal}</Text>
                </Stack>
             

            </Stack>
        </Box>
    );
};
export default CheckOutComponent;