import React from 'react';
import {  Image, NativeBaseProvider, ScrollView, Text, View } from 'native-base';
import colors from '../../colors';
import InstruccionesComponente from './InstruccionesComponente';
import GuardarComponente from './GuardarComponente';
import NotaComponent from './NotaComponent';

const Canvas = () => {
  return (
<NativeBaseProvider>
        <View style={{ flex: 1 }}>
        <Text fontSize={42} bold color={colors.azul} alignSelf={"flex-end"} 
        mr={10}>  Canvas </Text>
            <ScrollView>
                <InstruccionesComponente numero="01" 
                titulo="Archivo en JPG o PDF"
                parentesis="(Cualquier otro formato podría causar modificaciones y sería bajo responsabilidad del cliete el dejarlo)" 
                />           
                 <InstruccionesComponente numero="02" 
                titulo="Trabajado en CMYK"
                parentesis="(Si el archivo no tiene este modo de color, al momento de imprimir podría variar los tonos)" 
                />
                <InstruccionesComponente numero="03" 
                titulo="Resolución no menor  100DPOS"
                parentesis="(Si el archivo viene a 100dpis el archivo no debe estar a escala, debe ser tamaño real. Si tiene textos pequeños dejar resolución entre 200DPIS y 300DPIS)" 
                />
             
               
                


                <Text color={colors.azul} bold fontSize={20} alignSelf={"flex-end"} mr={5}>¿Cómo guardar el archivo?</Text>
                <GuardarComponente text="Siempre guardar al tamaño final de impresión" />
                <GuardarComponente text="a no menos de 100 DPI" />
                <GuardarComponente text="En JPG" />
                <GuardarComponente text="Si tiene áreas blancas al filo del diseño, poner un stroke en negro para delimitar la lona." />
                <GuardarComponente text="Especificar material: mate (blanco) o brillante (ligeramente beige)." />
               

                <NotaComponent
                nota="El anocho del material es de 150cm, si el canvas rebasa los 150cm en X y Y, se debe partir en las partes que sean necesarías."
                />

            </ScrollView>
            
           
        </View>
    </NativeBaseProvider>
  );
};

export default Canvas;
