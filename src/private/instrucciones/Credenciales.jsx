import React from 'react';
import {  NativeBaseProvider, ScrollView, Text, View, Image, Center } from 'native-base';
import colors from '../../colors';
import InstruccionesComponente from './InstruccionesComponente';
import GuardarComponente from './GuardarComponente';
import NotaComponent from './NotaComponent';

const Credenciales = () => {
  return (
<NativeBaseProvider>
        <View style={{ flex: 1 }}>
        <Text fontSize={32} bold color={colors.azul} alignSelf={"flex-end"} mr={1}>  CREDENCIALES PVC </Text>
            <ScrollView>
                <InstruccionesComponente numero="01" 
                titulo="Archivo en JPG o PDF"
                parentesis="(Cualquier otro formato podría causar modificaciones y sería bajo responsabilidad del cliente el dejarlo)" 
                />      
                <InstruccionesComponente numero="02" 
                titulo="Diseño a la medida"
                parentesis="(Sino está a la medida, debe autorizar el cliente el deformarlo, sino está de acuerdo debe proporcionar el archivo correcto)" 
                />
                <InstruccionesComponente numero="03" 
                titulo="Trabajado en CMYK"
                parentesis="(Si el archivo no tiene este modo de color, al momento de imprimir podría variar los tonos)" />
                <InstruccionesComponente numero="04" 
                titulo="Resolución a 300DPiS"
                parentesis="(Para una impresión de calidad)" 
                /> 
                <InstruccionesComponente numero="05" 
                titulo="Tamaño del diseño"
                parentesis="(6.5 X 9.5 cm)" 
                />            
                 <Center>
                  <Image source={require("./img/credencial.png")} 
                 alt="Alternate Text" size={96} resizeMode='contain'/>
                </Center>    


                <Text color={colors.azul} bold fontSize={20} alignSelf={"flex-end"} mr={5}>¿Cómo guardar el archivo?</Text>
                <GuardarComponente text="Siempre guardar en JPG al tamaño final de impresión a 300DPIS" />
                <GuardarComponente text="Guardar en carpeta, nombrando con la cantidad de credenciales, especificar si es FyV o SoloF y si llevan o no perforación" />
                <GuardarComponente text="Nombrar indicando FyV, ejemplo: Aldo F.jpg - Aldo V.jpg" />
               
               

                

            </ScrollView>
            
           
        </View>
    </NativeBaseProvider>
  );
};

export default Credenciales;
