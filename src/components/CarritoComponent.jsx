import { Box, Icon, Stack , Image, Text, Center, Pressable} from "native-base";
import colors from "../colors";
import {  useState } from "react";

import URL from "../helper/URL";
import fetchPost from "../helper/fetchPost";
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CarritoComponent= (props)=>{
     //inicia funciones para contar
     const navigation =useNavigation();
    const navegacion= (item) => {
        navigation.navigate(item);
      };

     const { nombre, precio, id, image, impreso, idAS , idU, cantidad, sucursal, subtotal, comentario, promocional} =props;

     console.log("Soy props de CARRITOOOOO   ", props);


     
     const [ count, setCount ] = useState(1);
  
    console.log("impreso?", impreso);

    
    





    return(
        
            <Stack direction={"row"}> 
             
                <Image source={{
                uri: `http://sdiqro.store/static/imgServicios/${image}`
                }} alt="Alternate Text" size="xl" mt={2} mx={2} resizeMode="contain"/>
                <Stack direction={"column"} justifyContent={"center"}  w="150" mt={2}>
                    <Text bold fontSize={"lg"}> {nombre}</Text>
                    <Text bold>Producto {impreso==0 ? "no impreso" : "impreso"}</Text>
                    <Text>Sucursal: <Text bold>{sucursal} </Text> </Text>
                    <Text >Precio unitario: <Text bold> ${precio}</Text></Text>
                    <Text>Cantidad: <Text bold> {cantidad} </Text> </Text>
                    <Text>Subtotal: <Text bold>${subtotal}</Text></Text>
                    {comentario !== ""  ? 
                     <Text>Medidas: <Text bold>{comentario}</Text></Text>
                     : null
                    }
                    { promocional !== "" && promocional !== null && promocional !== 0 ?
                            <Text>Promocionales: <Text bold>{promocional}</Text></Text>

                            : null
                    }        
                   
                </Stack>
                

            </Stack>
        
    );
};
export default CarritoComponent;