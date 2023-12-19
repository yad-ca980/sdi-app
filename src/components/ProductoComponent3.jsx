import { Box, Pressable, Icon, Center, Image, Text, Stack} from "native-base";
import {  AntDesign } from '@expo/vector-icons'; 
import colors from "../colors";
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from "react";
import URL from "../helper/URL";
import agregarFav from "../helper/agregarFav";
import agregarFav_sin_agrupar from "../helper/agregarFav_sin_agrupar";
import eliminarFav from "../helper/eliminarFav";
import checkFav from "../helper/checkFav";

const ProductoComponent3 = (props)=>{


    console.log("Soy ProductoComponent3",props);
    const navigation =useNavigation();

    const { nombre, precio, id, image, impreso, idU } =props;

    const detalleCategorias= (item, impreso, image, nombre, idU) => {
        navigation.navigate("DetalleProducto_agrupa", {
          id: item,
          impreso: impreso,
          image: image,
          nombre: nombre,
          idU: idU
          
          
        }); 
      };

      console.log("SOY LO QUE VOY A MANDAR A DETALLE",detalleCategorias);
      const [ selected, setSelected] = useState(false);


      const handleIconPress = (id, idU) => {

        console.log("Entre en corazon de favoritos",id);

        console.log("Soy el id del usuario",idU);

        if (selected===true){
            eliminarFav(idU, id);

            setSelected(false);
        }else{
            agregarFav_sin_agrupar(idU, id);
            setSelected(true);}
      };


      const checked = async()=>{
       // console.log("idAS check", idAS);
       // console.log("idU check", idU);
        let state = await checkFav(idU, id);
        //console.log("state", state)
        setSelected(state);
        
    }

     useEffect( ()=>{
        
        checked();
     });


    return(
        <>
        <Box  h={210} w={150} ml={2} borderRadius={20} shadow={6} bg="white" my={3}>
        <Pressable justifyContent={"flex-end"} alignContent="flex-end" ml={7} onPress={()=>handleIconPress(id, idU)}>
            { selected===true ?
            <Icon as={AntDesign} name="heart"  ml={24} mt={2}  color={colors.rosa }/> :
            <Icon as={AntDesign} name="hearto"  ml={24} mt={2}  />
        }
           
        </Pressable>
        <Pressable onPress={()=>detalleCategorias(id, impreso, image, nombre, idU)}>
            <Center>
                <Image source={{ 
                uri: `http://sdiqro.store/static/imgServicios/${image}`
                }} alt="Alternate Text" size="lg" />
            </Center>
            <Center w="92%" h={10} mx="4%">
                <Text fontSize={12} textAlign="center"> {nombre}</Text>
            </Center>
            <Center >
                <Text fontSize={12} justifyContent={"center"} bold> ${precio}</Text>
            </Center>
        </Pressable>

        <Pressable bg={colors.azul} borderRadius={30} w="80%" ml="10%"
         onPress={()=>detalleCategorias(id, impreso, image, nombre)}>
            <Center>
            <Stack direction={"row"}>
               
                <Text bold color={"white"}>Ver más</Text>
            </Stack>
            </Center>
        </Pressable>

        </Box>
        
        </>
    );
};

export default ProductoComponent3;