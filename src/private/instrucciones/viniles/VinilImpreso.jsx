import React from 'react';
import {  NativeBaseProvider, ScrollView, Text, View , Pressable, Center} from 'native-base';
import colors from '../../../colors';
import InstruccionesComponente from '../InstruccionesComponente';
import GuardarComponente from '../GuardarComponente';
const VinilImpreso = (props) => {





  return (
<NativeBaseProvider>
        <View style={{ flex: 1 }}>
        <Text fontSize={42} bold color={colors.azul} alignSelf={"flex-end"} mr={10}>  VINIL IMPRESO </Text>
            <ScrollView>
            <InstruccionesComponente numero="01" 
                titulo="Archivo en JPG o PDF"
                parentesis="(Cualquier otro formato podría causar modificaciones y sería bajo responsabilidad del cliete el dejarlo)" 
                />           
                <InstruccionesComponente numero="02" 
                titulo="Diseño a la medida"
                parentesis="(Sino está a la medida, debe autorizar el cliente el deformarlo, sino está de acuerdo debe proporcionar el archivo correcto)" 
                />
                 <InstruccionesComponente numero="03" 
                titulo="Trabajado en CMYK"
                parentesis="(Si el archivo no tiene este modo de color, al momento de imprimir podría variar los tonos)" 
                />
                <InstruccionesComponente numero="04" 
                titulo="Resolución a 100DPIS"
                parentesis="(Si el archivo viene a 100dpis el archivo no debe estar a escala, debe ser el tamaño real. Si tiene textos pequeños dejar resolución entre 200dpis y 300dpis.)" 
                />

                <InstruccionesComponente numero="05" 
                titulo="Resolución a 80DPIS"
                parentesis="(Si el archivo viene a 80dpis el archivo no debe estar a escala, debe ser el tamaño real)" 
                />
                <InstruccionesComponente numero="06" 
                titulo="Textos pequeños"
                parentesis="(Si el diseño tiene textos pequeños y/o delgados, cuidar que no
                sean menores a 8mm de lo contraio no serán muy legibles)" 
                />


                <Text color={colors.azul} bold fontSize={20} alignSelf={"flex-end"} mr={5}>¿Cómo guardar el archivo?</Text>
                <GuardarComponente text="Siempre guardar al tamaño final de impresión" />
                <GuardarComponente text="A 80dpis." />
                <GuardarComponente text="En JPG." />
                <GuardarComponente text="Si tiene áreas blancas al filo del diseño, poner un stroke en negro para deliimitar el diseño." />

           

            </ScrollView>
            
           
        </View>
    </NativeBaseProvider>
  );
};

export default VinilImpreso;
