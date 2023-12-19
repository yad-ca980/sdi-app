import React from 'react';
import {  NativeBaseProvider, ScrollView, Text, View , Image, Center} from 'native-base';
import colors from '../../colors';
import InstruccionesComponente from './InstruccionesComponente';
import GuardarComponente from './GuardarComponente';
import NotaComponent from './NotaComponent'; 

const Dft = () => {
  return (
<NativeBaseProvider>
        <View style={{ flex: 1 }}>
        <Text fontSize={42} bold color={colors.azul} alignSelf={"flex-end"} mr={10}>  DTF </Text>
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
                titulo="Cuidar opacidad, transparencias y degradados"
                parentesis="(Donde hay pixel aún con opacidad del 1% saldrá en la impresió  con plasta blanca
                  también los degradados de color a transparencia salen con plasta blanca atrás)" 
                />         
                


                <Text color={colors.azul} bold fontSize={20} alignSelf={"flex-end"} mr={5}>¿Cómo guardar el archivo?</Text>
                <GuardarComponente text="Siempre guardar al tamaño final de impresión" />
                <GuardarComponente text="A 300DPIS" />
                <GuardarComponente text='Agregar canal de tinta plana "W1" ' />
                <GuardarComponente text="En TIFF" />
                <Center my={-20}>
                  <Image source={require("./img/tiff.png")} 
                 alt="Alternate Text" size={96} resizeMode='contain'/>
                </Center>     

                <NotaComponent
                nota="El ancho del material es de 58cm, evitar exceder los 2m de largo para evitar que el archivo se vuelva muy pesado."
                />

            </ScrollView>
            
           
        </View>
    </NativeBaseProvider>
  );
};

export default Dft;
