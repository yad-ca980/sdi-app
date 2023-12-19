import React, { useState, useEffect } from 'react';
import { FlatList, NativeBaseProvider, ScrollView, Text, View, Box, Stack , Pressable, Icon, Image, Center} from "native-base";
import colors from '../colors';
import Favoritocomponent from '../components/FavoritoComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../helper/URL';
import fetchPost from '../helper/fetchPost';
import Loader from '../components/Loader';
import { AntDesign } from "@expo/vector-icons";
import { Alert } from 'react-native';


const Favoritos = (props) => {
    const BASE_URL = URL.BASE_URL;
    const [loader, setLoader ]= useState(true);

    const [ favoritos, setFavoritos] = useState([]);


    console.log("Soy los props  de  los FAVORITOS      ",props);




    console.log("Soy EL NUEVO A ID DE LOS FAVORITOS OSEA HELLOOO   ",favoritos);


    const [ idU, setIdU ] = useState("");

    console.log("Soy el id del usuario   ",idU);
    

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('@id_user')
          if(value !== null) {
            console.log("idU async: ", value);
            setIdU(value);
            getFav(value); 
          }
        } catch(e) {
          console.log("error async home", e);
        }
      }

      const getFav = async(value)=>{
        
        const dataFav = new FormData();
        dataFav.append("idU", value);
        const url = `${BASE_URL}abdiel/favoritos/get_items`
        const options = {
          method:'POST',
          body: dataFav
        };
        const responseFav = await fetchPost(url, options);
        if (responseFav !== null){
          setFavoritos(responseFav.data);
          console.log(responseFav.data)
        }else{
          setFavoritos([]);
        }
       
        //console.log("res", responseFav.data);
        setLoader(false);
        
      }

      useEffect(() => {
        getData();
        
        console.log("idU: " ,idU)
        getFav(idU);
        console.log("favoritos: " ,favoritos)
      }, [idU, favoritos.length ])
       useEffect(() => {
        getFav(idU);
        
         console.log("favoritos: " ,favoritos)
       }, [favoritos.length])

  const detalleProducto = (item, impreso, image, idAS, nombre, idU) => {
    

    console.log("Entre en el DETALLE PRODUCTOOOOOOOOO      :v   xD");

    console.log("Soy el id del servicio que se dio click en favoritos    ",item);

    console.log("Soy el segundo parametro de impreso    ",impreso);

    console.log("Soy el id de la imagennnn     ",image);

    console.log("Soy el de la Agrupacion    ",idAS);

    console.log("Soy el nombre del producto     ",nombre);




    console.log("Soy el id del usuario del usuario  ", idU);


    props.navigation.navigate("DetalleProducto", {
      id: item,
      impreso: impreso,
      image: image,
      idAS: idAS,
      nombre: nombre,
      idU: idU,
    });
  };

  const favoritoNavegador = (idS,impreso, noImpreso, image, idAS, nombre) => {
    switch (true) {
      case impreso == 1 && noImpreso == 1:
        console.log("LOS DOS IMPRESOS");
        Alert.alert(
          "El producto puede ser con impresión o sin ella",
          "¿Cual opción deseas ver?",
          [ 
            {
              text: "Impreso",
              onPress: () => detalleProducto(idS, true, image, idAS, nombre),
            },
            {
              text: "No impreso",
              onPress: () => detalleProducto(idS, false, image, idAS, nombre),
            },
          ], {cancelable:true}
        );

        break;

      case impreso == 1 && noImpreso == 0:
        console.log("SOLO IMPRESO");
        detalleProducto(id, true, image, idAS, nombre);

        break;

      case impreso == 0 && noImpreso == 1:
        console.log("SOLO NO IMPRESO");
        detalleProducto(id, false, image, idAS, nombre);
        break;

      default:
        console.log("error favoritos impreso/no impreso");

        console.log("ESTE ERROr no es para impreso y no impreso");
        
        break;
    }
  };

  const eliminarFav = async(idAS,id)=>{


    console.log("se dio click em eliminar fav");

    console.log("Soy la agrupacion  ",idAS);

    console.log(typeof idAS);

    console.log("Soy el id del servicios  ",id);
    console.log("Soy el id del usuario ", idU);

    const BASE_URL= URL.BASE_URL;
        
    const dataFav = new FormData();
    dataFav.append("idU", idU);
    dataFav.append("idAS", idAS);
    dataFav.append("idS",id);
    const url = `${BASE_URL}abdiel/favoritos/delete_item`
    const options = {
      method:'POST',
      body: dataFav
    };

    console.log("Soy las opciones que voy a mandar",options.body)
    const res = await fetchPost(url, options);

    console.log("Soy la respuesta res   ",res);


    if (res === true){
      console.log("true eliminado");
      getFav(idU);
      console.log("fav borrar res: ", favoritos);
      
    }else{
      console.log("False eliminado");
      
    }
    return res;
   // 
    
    
  }

  const eliminarFavorito = (idAS, nombre, id, nombreS) => {
    Alert.alert(
      "Borrar Favorito",
      `¿Deseas borrar ${nombre != null || nombre == "" ? nombre : nombreS } de favoritos?`,
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Confirmar", onPress: () => eliminarFav(idAS,id) },
      ],
      { cancelable: true }
    );
  };






    return(
        <NativeBaseProvider>
          { loader===true ? <Loader/> :
            <View flex={1} bg={colors.blanco} >
            <Text bold fontSize={20} ml={5} mt={3}>Favoritos</Text>
           { favoritos.length > 0 ? 
            <FlatList
              data={favoritos}
              keyExtractor={(item) => item.idAS}
              renderItem={({ item }) => (
                <Box h={32} w={"90%"} mx={"5%"} my={2} shadow={6} bg="white" borderRadius={20}>
                  <Stack direction={"row"}>
                    <Pressable onPress={() => eliminarFavorito(item.idAS, item.nombreAgrupaS, item.idS, item.nombreS)}>
                      <Icon as={AntDesign} name="heart" size={6} ml={3} mt={3} color={colors.rosa} />
                    </Pressable>

                    <Image source={{
                        uri: `http://sdiqro.store/static/imgServicios/${item.image_url}`,
                      }}
                      alt="Alternate Text" size="lg"
                      mt={4} mr={1} resizeMode="contain"
                    />
                    <Stack direction={"column"} flex={1} mt={2}>
                      <Text bold pt={1}>
                        {item.nombreAgrupaS != null || item.nombreAgrupaS == "" ? item.nombreAgrupaS : item.nombreS}
                        
                      </Text>
                      {item.noImpreso === "1" ? (
                        <Stack direction={"row"}>
                          <Text fontSize={"sm"}>Precio sin impresión: </Text>
                          <Text bold fontSize={"md"}>
                            ${item.precioS}
                          </Text>
                        </Stack>
                      ) : null} 
                     {item.impresion == 1 ? (
                        <Stack direction={"row"}>
                          <Text fontSize={"sm"}>Precio con impresión: </Text>
                          <Text bold fontSize={"md"}>
                            ${(parseFloat(item.precioS) +parseFloat(item.precioImpresion))}
                          </Text>
                        </Stack>
                      ) : null} 

                      <Box my={1}>
                        <Pressable
                          bg={colors.azul}
                          borderRadius={10}
                          w={24}
                          h={9}
                          onPress={() => favoritoNavegador(item.idS, item.impresion, item.noImpreso, item.image_url, item.idAS, item.nombreAgrupaS)}
                        >
                          <Center>
                            <Stack direction={"row"} mt={1}>
                              <Text bold color={"white"} mt={1}>
                                Ver más
                              </Text>
                            </Stack>
                          </Center>
                        </Pressable>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
              )}
            />
            : <Text alignSelf={"center"} mt={10} fontSize={24}>No tienes favoritos por ahora</Text>}
            </View>
             }

        </NativeBaseProvider>
    );
};

export default Favoritos;