import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Text, Center, View, VStack, Input, Box, HStack, ScrollView, Checkbox } from "native-base";
import { FontAwesome } from '@expo/vector-icons'; 
import colors from '../colors';
import Boton from '../components/Boton';
const DetalleTarjeta = (props) => {


    const InputCard = (props) => {
        const { title, placeholder} = props;

        return(
            <VStack flex={1}>
                <Text>{title}</Text>
                <Input placeholder={placeholder}/>
            </VStack>

        );
    }

    return(
        <NativeBaseProvider>
            <ScrollView bg={colors.blanco} flex={1}>
                <Text mt={3} ml={3} bold fontSize={"xl"}>Detalle de la Tarjeta</Text>
                <Center>
                <FontAwesome name="cc-mastercard" size={90} color={colors.rosa} />
                </Center>
                <VStack w="90%" mx="5%" flex={1} space={2}>
                    <InputCard title="Correo Electrónico:" placeholder="Correo electrónico"/>
                    <InputCard title="Nombre" placeholder="Nombre"/>
                    <InputCard title="No. de tarjeta" placeholder="No. de tarjeta"/>
                </VStack>
                <HStack w="90%" mx="5%" justifyContent={"space-between"} space={4} mt={3}>
                    <InputCard title="Vencimiento:" placeholder="mm/aa"/>
                    <InputCard title="CVV" placeholder="xxx"/>
                </HStack>

                <HStack w="90%" mx="5%" justifyContent={"space-between"} space={4} mt={4}>
                    <Checkbox value="one" my={2}>
                        Guardar tarjeta
                    </Checkbox>
                    <InputCard title="Identificador" placeholder="Alias"/>
                </HStack>
            

                <Boton text="Guardar" color={colors.azul} colorText={colors.blanco} nav="Tarjetas"/>
            </ScrollView>
        </NativeBaseProvider>
    );
};

export default DetalleTarjeta;