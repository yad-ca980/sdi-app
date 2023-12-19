import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, ScrollView, Text, View , Box, Center, HStack, Icon, Divider} from "native-base";
import colors from '../colors';
import CheckOutComponent from '../components/CheckOutComponent';
import { Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 



const DetalleCompra = (props) => {
    const navegacion= (item) => {
        props.navigation.navigate(item);
      }; 

    return(
        <NativeBaseProvider>
            <ScrollView flex={1} bg={colors.blanco} >
            <Text bold fontSize={20} ml={5} mt={3}>Detalle del pedido</Text>
            <ScrollView w="98%" h={96} showsVerticalScrollIndicator={true} persistentScrollbar={true}>    
                <CheckOutComponent/>
                <CheckOutComponent/>
                <CheckOutComponent/>
                <CheckOutComponent/>
            </ScrollView>
            <Divider bg={colors.azul} borderRadius={100} h={1} w="80%" alignSelf={"center"} my={1}/>
            <Center h="70" w="85%"  mx={7} >  
                <Text fontSize={22} bold>Total: $ 2000.00</Text>
                <Text fontSize={18} >Recolección: Sucursal San Juan del río </Text>
            </Center>

            <Pressable alignItems="center" onPress={()=>navegacion("ListaFactura")}>
                <Center h="35" my={1} w="50%" bg={colors.azul} borderRadius={20} mx={7} >  
                    <HStack>
                        <Icon as={AntDesign} name="filetext1"  size={6} color={"white"} />
                        <Text fontSize={16} color={"white"} bold  mx={3}>Facturar</Text>
                    </HStack>
                </Center>
            </Pressable>

            </ScrollView>

        </NativeBaseProvider>
    );
};

export default DetalleCompra;