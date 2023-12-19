import React from 'react';
import {  NativeBaseProvider, ScrollView, Text, View , Center, Image} from 'native-base';
import colors from '../../colors';
import InstruccionesComponente from './InstruccionesComponente';
import GuardarComponente from './GuardarComponente';
import NotaComponent from './NotaComponent';

const Botones = () => {
  return (
<NativeBaseProvider>
        <View style={{ flex: 1 }}>
        <Text fontSize={42} bold color={colors.azul} alignSelf={"flex-end"} mr={10}>  BOTONES </Text>
            <ScrollView>
                <InstruccionesComponente numero="01" 
                titulo="Archivo en JPG o PDF"
                parentesis="(Cualquier otro formato podría causar modificaciones y sería bajo responsabilidad del cliente el dejarlo)" 
                />      
                <InstruccionesComponente numero="02" 
                titulo="Trabajado en CMYK"
                parentesis="(Si el archivo no tiene este modo de color, al momento de imprimir podría variar los tonos)" />
                <InstruccionesComponente numero="03" 
                titulo="Resolución a  300DPIS"
                parentesis="(Para una mejor calidad)" 
                />  
                <InstruccionesComponente numero="04" 
                titulo="Tamaño"
                parentesis="(Cuidar el área de seguridad)" 
                />  
                <Center>
                  <Image source={require("./img/botones.png")} 
                 alt="Alternate Text" size={96} resizeMode='contain'/>
                </Center>           
                



            </ScrollView>
            
           
        </View>
    </NativeBaseProvider>
  );
};

export default Botones;
