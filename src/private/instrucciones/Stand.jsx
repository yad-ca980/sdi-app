import React from 'react';
import {  NativeBaseProvider, ScrollView, Text, View, Center, Image } from 'native-base';
import colors from '../../colors';
import InstruccionesComponente from './InstruccionesComponente';
import GuardarComponente from './GuardarComponente';
import NotaComponent from './NotaComponent';
const Stand = () => {
  return (
<NativeBaseProvider>
        <View style={{ flex: 1 }}>
        <Text fontSize={42} bold color={colors.azul} alignSelf={"flex-end"} mr={10}>  STAND </Text>
            <ScrollView showsVerticalScrollIndicator={true}>
                <InstruccionesComponente numero="01" 
                titulo="Archivo en JPG o PDF"
                parentesis="(Cualquier otro formato podría causar modificaciones y sería bajo responsabilidad del cliente el dejarlo)" 
                />      
                <InstruccionesComponente numero="02" 
                titulo="Trabajado en CMYK"
                parentesis="(Si el archivo no tiene este modo de color, al momento de imprimir podría variar los tonos)" />
                <InstruccionesComponente numero="03" 
                titulo="Resolución no menor  100DPIS"
                parentesis="(Si el archivo viene a 100dpis el archivo no debe estar a escala, debe ser tamaño real. Si tiene textos pequeños dejar resolución entre 200DPIS y 300DPIS)" 
                />  
                <InstruccionesComponente numero="04" 
                titulo="Tamaño"
                parentesis="(Considerar un área de seguridad de 3.5cm)" 
                />  
                <Center>
                  <Image source={require("./img/Stand.png")} 
                 alt="Alternate Text" size={64} />
                </Center>     
                


                <Text color={colors.azul} bold fontSize={20} alignSelf={"flex-end"} mr={5}>¿Cómo guardar el archivo?</Text>
                <GuardarComponente text="Siempre guardar al tamaño final de impresión" />
                <GuardarComponente text="A no menos de 100DPIS" />
                <GuardarComponente text="En JPG" />
                <GuardarComponente text="Si tiene áteas blancas al filo del diseño, poner un stroke en negro para delimitar la lona" />
               

                <NotaComponent
                nota="La parte inferior se imprime en una sola pieza."
                />

            </ScrollView>
            
           
        </View>
    </NativeBaseProvider>
  );
};

export default Stand;
