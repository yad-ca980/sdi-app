import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { NativeBaseProvider, Input, Box, Text, FlatList , HStack, Image, Center, Divider, Icon} from 'native-base';
import { Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

const Buscar = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://sdiqro.store/abdiel/Productos/buscar?q=${searchTerm}`);
      const data = await response.json();
      setResults(data);
      console.log("busqueda", results);
    } catch (error) {
      console.error(error);
    }
  };
  const detalleServicio= (item, image, nombre, precio) => {
    props.navigation.navigate("DetalleProducto", {
      id: item,
      precio:precio,
      image: image,
      nombre: nombre
    });
  };


  const detalleProducto= (item, impreso, image,idAS, nombre, idU, desS) => {
   props.navigation.navigate("DetalleProducto", {
      id: item,
      impreso: impreso,
      image: image,
      idAS: idAS,
      nombre: nombre,
      idU : idU,
      desS: desS
    }); 
  };

  const handleProducto = (item, impreso, image,idAS, nombre, desS, noImpreso) =>{

    switch (true) {
      case (impreso === "1" && noImpreso === "1"):
        console.log("los dos son 1");
        Alert.alert('El articulo seleccionado puede ir impreso o sin impresión', '¿Cuál opción deseas?', [
          {
            text: 'Impreso',
            onPress: () => detalleProducto(item, "1", image, idAS, nombre, desS),
            
          },
          {text: 'No impreso', onPress: () => detalleProducto(item, "0", image, idAS, nombre, desS)},
          
        ], {
          cancelable:true
        });
        break;

      case (impreso === "1" && noImpreso === "0"):
        console.log("impreso = 1");
        detalleProducto(item, "1", image, idAS, nombre, desS)
        break;

      case (impreso === "0" && noImpreso === "1"):
        console.log("no impreso =  1");
        detalleProducto(item, "0", image, idAS, nombre, desS)
      break;
  
      default:
        console.log(`default break valor impreso: ${impreso} noImpreso: ${noImpreso}` );
        Alert.alert('Error', 'Error en el producto, verifica estatus de impresión', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        break;
    }
  }

  useEffect(() => {
      if ( searchTerm !== ""){
        handleSearch()
      }
  }, [searchTerm]);
  


  console.log("busqueda", results);

  return (
    <NativeBaseProvider>
        <Box  bg="white" w="100%" h="100%">
        <Input variant="rounded" placeholder="Buscar" my={4} mx={7}
        bg="#fff"
         value={searchTerm}
         onChangeText={setSearchTerm}
         onSubmitEditing={handleSearch} 
         InputLeftElement={<Icon as={<FontAwesome name="search" />} size={5} ml="2" color="muted.400" />}/>
           
        <FlatList
            data={results}
            keyExtractor={(item) => item.idAS}
            renderItem={({ item }) => (
                <Box bg={"white"} rounded="lg" marginLeft={5} marginRight={5} marginTop={2}>
                <TouchableOpacity
                  onPress={() => handleProducto(item.idS, item.impresion, item.image_url, item.idAS, item.nombreS, item.desS , item.noImpreso)}>
                    <HStack>
                    <Image 
                                source={{
                                uri: `http://sdiqro.store/static/imgServicios/${item.image_url}`
                                }}alt="Alternate Text" size="lg" resizeMode='contain' />
                            <Box w="60%" mt={5} ml={4}>
                                <Text  fontSize={20} color="#236DB7" >{item.nombreS}</Text>
                                <Text><Text bold>Precio: </Text>${item.precioS}</Text>
                        </Box>
                        <Center >
                        <FontAwesome name="angle-right" size={24} color="black" />
                        </Center>
                    </HStack>
                </TouchableOpacity>
                <Center>
                  <Divider mt={1} w="20%" mx="10%" thickness={2} bg="black"/>

                </Center>
            </Box>
            )}
        />
        </Box>
       



    
    </NativeBaseProvider>
  );
};

export default Buscar;