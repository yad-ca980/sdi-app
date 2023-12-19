import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, ScrollView, Text, View , Box, Center, HStack, Icon, Divider, Stack, Pressable} from "native-base";
import colors from '../colors';
import CarritoComponent from '../components/CarritoComponent';
import { Alert } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../helper/URL';
import fetchPost from '../helper/fetchPost';
import Loader from '../components/Loader';

const Carrito = (props) => {
    const BASE_URL = URL.BASE_URL;
    const navegacion= (item) => {
        props.navigation.navigate(item);
      }; 
      
      const[ idCarrito, setIdCarrito ] = useState(null);
      const [ carrito, setCarrito ] = useState([]);

      console.log("Soy el contenido de carrito    ",carrito);
      const [ total, setTotal ] = useState(null);


      console.log("Soy el total de carrito    ",total);
      
      const [ load, setLoad ] = useState(true)

      const getData = async () => {
        try {
        const value = await AsyncStorage.getItem('@id_carrito')
        if(value !== null) {
            setIdCarrito(value);
            getCarrito(value);
        }else{
          Alert.alert(
            'Para ver tu carrito de compras debes estar registrado e iniciar sesión.',
            "Selecciona una opción",
            [
              {
                text: 'Iniciar sesion',
            onPress: () => { props.navigation.navigate('Welcome', { status: true })},
              },
              {
                text: 'Registrarse',
            onPress: () => { props.navigation.navigate('Welcome', { status: false } )},
              },
              { text: 'Volver',  onPress: () => {props.navigation.navigate("Home")}  },
            ],
            { cancelable: false },
          );
        }
        } catch(e) {
        console.log("error id carrito", e)
        }
    }

    useEffect(() => {
        getData();
      //console.log("id carrito: ", idCarrito)
      
    }, [carrito.length]) 
     
      const getCarrito = async(value)=>{
        
        const dataFav = new FormData();
        dataFav.append("idC", value);
        const url = `${BASE_URL}abdiel/carrito/contenido_carrito`
        const options = {
          method:'POST',
          body: dataFav
        };
        const responseFav = await fetchPost(url, options);
        if (responseFav !== null){
          setCarrito(responseFav.data);
          //console.log("TOTAL", responseFav.total)
          setTotal(responseFav.total)
          setLoad(false)
        }else{
          setCarrito([]);
        }
        //console.log("res", responseFav.data);
        //setLoader(false);
        
      }

      const eliminarItem = async(id)=>{
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
          getCarrito();
            Alert.alert('Se elimino con éxito', '¿Que deseas hacer ahora?', [
                {
                    text: 'Volver al carrito',
                    onPress: () => console.log("btn volver ") //props.navigation.navigate("Welcome"),
                },
                {
                    text: 'Ir a inicio',
                    onPress: () => navegacion("Home") //props.navigation.navigate("Welcome"),
                }
              ])
        }
      }

      const previoEliminar= (id, nombre)=>{
        Alert.alert(`Estas seguro que deseas eliminar ${nombre}`, 'Puedes agregarlo nuevamente despues', [
            {
                text: 'Cancelar',
                onPress: () => console.log("btn cancelar ") //props.navigation.navigate("Welcome"),
            },
            {
                text: 'Eliminar del carrito',
                onPress: () => eliminarItem(id) //props.navigation.navigate("Welcome"),
            }
          ])
      }

    return(
        <NativeBaseProvider>
          <ScrollView flex={1}>
          { load ? <Loader/> :
          
            <View flex={1} bg={colors.blanco} >
            
            { carrito.length > 0 ? 
                    <Box flex={1}>    
                        { carrito.map( (producto, index)=>{
                        return(
                          <Box h={56} w={"96%"} mx={"2%"}  my={2}  key={index}
                          shadow={6} bg="white" borderRadius={20} borderColor={"#dddddd"}
                          borderWidth={2}>
                          <Stack direction={"row"}> 
                         
                            <CarritoComponent
                           
                            nombre={producto.nombreS} 
                            id={producto.id}
                            idS={producto.idS}
                            precio = {producto.PrecioCarrito}
                            cantidad = {producto.cantidad}
                            image={producto.image_url}
                            sucursal={producto.nombreSuc}
                            impreso={producto.impreso}
                            idU={producto.idSuc}
                            comentario = {producto.comentario}
                            subtotal={producto.subtotalCarrito}
                            promocional={producto.nombreAtrD}

                            />

                            
                        </Stack>

                         <Center ml={1}>
                            <Pressable bgColor={colors.rosa} p={2} borderRadius={10} 
                              shadow={6} onPress={()=> previoEliminar(producto.id, producto.nombreS) }>
                                <Stack direction={"row"}>
                                  <Icon as={FontAwesome5} 
                                  name="trash-alt"  size={6} color={colors.blanco} />
                                  <Text color="white" bold fontSize={14}> Eliminar </Text>
                                </Stack>
                           
                              
                            </Pressable>
                          </Center>
                  
                        </Box>
                        ) 
                      } )

                      }
                    </Box>

                    :
                    <Center>
                    <Text alignSelf={"center"} mt={20} fontSize={24}>No tienes productos en tu carrito.</Text>
                    </Center> 
            }
            
            <Divider bg={colors.azul} borderRadius={100} h={1} w="80%" alignSelf={"center"} my={1}/>
            <Box mb={4} w="85%"  mx={7} alignItems={"flex-end"} >  
               
                <Text fontSize={22} bold>
                  { total!==null ? `Total: $${total}` : ""}
                   
                   </Text>
            </Box>
           

            </View>
          }
           { carrito.length < 0 ? null : 

          <Center bg={"white"}   >  
            <Pressable alignItems="center" onPress={()=>navegacion("Recoleccion")} mb={4}
              w="50%" bg={colors.azul} borderRadius={20} mx={7} h={10} py={2} >
                
                    <HStack>
                        <Icon as={Ionicons} name="wallet"  size={6} color={"white"} />
                        <Text fontSize={16} color={"white"} bold  mx={3}>Pagar</Text>
                    </HStack>
                
            </Pressable>
          </Center>
          }
          </ScrollView>
        </NativeBaseProvider>
    );
};

export default Carrito;