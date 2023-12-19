import React, { useState, useEffect } from 'react';
import { Box, Center, Checkbox, NativeBaseProvider, Stack, Text, View, FlatList, Divider, Pressable, ScrollView } from "native-base";
import colors from '../colors';
import Boton from '../components/Boton';
import { Fontisto } from '@expo/vector-icons'; 
import fetchPost from '../helper/fetchPost';
import URL from '../helper/URL';
import { Alert } from 'react-native';
import Loader from '../components/Loader';
const Recoleccion = (props) => {
    const BASE_URL = URL.BASE_URL;
    const navegacion= (item) => {
        props.navigation.navigate(item);
    };
    const [ sucursales, setSucursales ] = useState([]);
    const [isChecked, setIsChecked] = useState("");
    const [nombre, setNombre] = useState("");
    const [ loading, setLoading ] = useState(true);

    const handleClick = (id, nombre) => {
        setIsChecked(id);
        setNombre(nombre)
        };
    useEffect(() => {
      console.log("check:", isChecked);
      
    },[isChecked]);
    

    const getSucursal = async()=>{
        const url = `${BASE_URL}abdiel/pedidos/sucursales`
        const options = {
          method:'POST'
        };
        const response = await fetchPost(url, options);
        if (response !== null){
          setSucursales(response);
            //console.log(response)
            setLoading(false);
        }else{
        setSucursales([]);
        
        }
        //console.log("res", responseFav.data);
        //setLoader(false);
        
      }
      useEffect(() => {
      getSucursal();
    //  console.log("sucursales.lengh", sucursales);
      
      }, [sucursales.length]);
      

      const checkPago= ( idSuc, nombre) => {
        props.navigation.navigate("CheckOut", {
          idSuc: idSuc,
          nombreS: nombre
          
        });
      };

      const alerta = () =>
      Alert.alert('No seleccionaste sucursal', 'Favor se elegir una sucursal para recoger el pedido ', [
        {
          text: 'Entendido',
          onPress: () => console.log('Cancel Pressed')
          
        }
      ]);



    return(
        <NativeBaseProvider>
          { loading ? <Loader/> :
            <View flex={1} bg={colors.blanco}>
              <ScrollView>
                <Text bold fontSize={"xl"} ml={5} my={3}>¿Dónde deseas recoger tus productos?</Text>
                <Box w="90%" mx="5%" bg={colors.blanco} h={96} shadow={6} my={4} borderRadius={20} > 
                    {/* <Sucursal name="Matriz" address="Avenida Siempre Viva #123, Colonia Limitrofe, Sprindfield"/> */}
                    {sucursales.length < 1 ? null : (
                        sucursales.map((item) => (
                          <Stack direction={"row"} space={3} key={item.idSuc}>
                            <Center>
                              <Fontisto name="shopping-store" size={24} color="black" />
                            </Center>

                            <Stack w="70%">
                              <Text fontWeight={500} fontSize={"lg"}>
                                Sucursal {item.nombreSuc}
                              </Text>
                              <Text>
                                {item.calleSuc}, {item.numSuc}, {item.coloniaSuc}
                              </Text>
                              <Text>
                                C.P: {item.cpSuc}, {item.nombre_municipio}, {item.nombre_estado}
                              </Text>
                              <Divider m={2} />
                            </Stack>

                            <Center>
                              <Checkbox
                                isChecked={isChecked === item.idSuc}
                                onChange={() => handleClick(item.idSuc, item.nombreSuc)}
                                accessibilityLabel="This is a dummy checkbox"
                              />
                            </Center>
                          </Stack>
                        ))
                      )}

                </Box>
                { isChecked=="" ? 
                  <Pressable justifyContent={"center"} alignItems={"center"} w="80%" mx="10%" bg={"#777777"} h={12} 
                  borderRadius={50} my={4}  onPress={()=>alerta()}>
                      <Text bold fontSize={"lg"}  color={colors.blanco}> Siguiente </Text>
                  
                  </Pressable>
              :
              
              
                <Pressable justifyContent={"center"} alignItems={"center"} w="80%" mx="10%" bg={colors.azul} h={12} 
                borderRadius={50} my={4}  onPress={()=>checkPago(isChecked, nombre)}>
                    <Text bold fontSize={"lg"}  color={colors.blanco}> Siguiente </Text>
                
                </Pressable>
              
                }
              </ScrollView>
            </View>
          }   
        </NativeBaseProvider>
    );
};

export default Recoleccion;