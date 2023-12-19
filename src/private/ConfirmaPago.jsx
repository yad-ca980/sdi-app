import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, View, Image, Center} from "native-base";
import colors from '../colors';
import Boton from '../components/Boton';

const ConfirmaPago = () => {


    return(
        <NativeBaseProvider>
            <View flex={1} bg={colors.blanco}>
                <Center my={10}>
                <Image source={require("../images/Success.png")} alt="Pedido Completo" size={72} resizeMode="contain"/>

                </Center>
                
                <Boton text="Ir a mis pedidos" color={colors.azul} colorText={colors.blanco} nav="Pedidos" />

            </View>
         
        </NativeBaseProvider>
    );
};

export default ConfirmaPago;