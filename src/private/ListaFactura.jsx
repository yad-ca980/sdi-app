import React, { useState, useEffect } from 'react';
import { Box, NativeBaseProvider, ScrollView, Text, View, Center, Checkbox, Stack, Pressable, HStack, Divider} from "native-base";
import Boton from '../components/Boton';
import colors from '../colors';
import { AntDesign } from '@expo/vector-icons'; 
const ListaFactura = (props) => {

    const navegacion= (item) => {
        props.navigation.navigate(item);
    };

 
    const EliminarBtn = () =>{
        
    }

    const DetalleTarjeta = () =>{
        props.navigation.navigate("DetalleTarjeta")
    }


    const FacturaRow= (props) => {
        const { text } = props;
        const [isChecked, setIsChecked] = useState(false);
        const handleClick = () => {
           setIsChecked(!isChecked);
          };
        return(
            <Box>
                <HStack w="86%" mx="7%" mt={4} justifyContent="space-between">
                <Center>
                    <Checkbox isChecked={isChecked} onChange={handleClick} accessibilityLabel="This is a dummy checkbox"/>
                </Center>
                    <AntDesign name="filetext1" size={24} color={colors.azul} style={{marginTop:5}} />
                    <Pressable w="75%"  h={10} onPress={()=>DetalleTarjeta()}>
                        <Text fontSize={"lg"}>
                            {text}
                        </Text>

                    </Pressable>
                    
               
                </HStack>
                <Divider w="90%" mx="5%" my={1}/>
            </Box>
        )

    }

    return(
        <NativeBaseProvider>
            <View flex={1} bg={colors.blanco} safeAreaButton={3} >
                <Text bold fontSize={"xl"} ml={5} my={3}>Mis datos fiscales</Text>
                <ScrollView bg={colors.blanco} w="90%" mx="5%"  borderRadius={20} shadow={6} safeAreaTop={4} mb={5}>
                    <FacturaRow text="datos fiscales 1"/>
                    <FacturaRow text="Empresa de Toño"/>
                    <FacturaRow text="Empresa de Pepe"/>
                    
                </ScrollView>
                <Pressable my={5} alignItems="center" onPress={()=>navegacion("Factura")} >
                    <Text bold underline color={colors.azul} fontSize={18}>Agregar datos fiscaleas</Text>
                </Pressable>
                <Boton text="Siguiente" color={colors.azul} colorText={colors.blanco} nav="CheckOut" />
                

            </View>
        </NativeBaseProvider>
    );
};


export default ListaFactura;