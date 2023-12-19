import React from 'react';
import {  Divider, NativeBaseProvider, ScrollView, Stack, Text, View } from 'native-base';
import colors from '../../colors';
import InstruccionesComponente from './InstruccionesComponente';
import GuardarComponente from './GuardarComponente';
import NotaComponent from './NotaComponent';
const Offset = () => {
  return (
<NativeBaseProvider>
        <View style={{ flex: 1 }}>
        <Text fontSize={42} bold color={colors.azul} alignSelf={"flex-end"} mr={10}>  OFFSET </Text>
            <ScrollView>
                <InstruccionesComponente numero="01" 
                titulo="Archivo en JPG o PDF"
                parentesis="(Cualquier otro formato podría causar modificaciones y sería bajo responsabilidad del cliente el dejarlo)" 
                />  
                <InstruccionesComponente numero="02" 
                titulo="Trabajado en CMYK"
                parentesis="(Si el archivo no tiene este modo de color, al momento de imprimir podría variar los tonos)" />
                <InstruccionesComponente numero="03" 
                titulo="Resolución a 300DPIS"
                parentesis="(Para una impresión de calidad)" 
                />    
                <InstruccionesComponente numero="04" 
                titulo="Tamaños de diseño"
                parentesis="(Si no cumple con el tamaño, el cliente debe autorizar la deformación o proporcionar el archivo correcto)" 
                />  
                <Stack direction={"row"} alignSelf={"center"}>
                  <Stack direction={"column"} mr={7}  >
                    <Text bold>Tarjetas:</Text>
                    <Text bold>Volante 1-4:</Text>
                    <Text bold>Volante 1-2:</Text>
                    <Text bold>Volante 1-3:</Text>
                    <Text bold>Separador:</Text>
                    <Text bold>Postal Mini:</Text>
                  </Stack>
                  <Stack direction={"column"} alignItems={"flex-start"} >
                    <Text bold>9x4.8</Text>
                    <Text bold>9.7x13.6</Text>
                    <Text bold>19.7x13.6</Text>
                    <Text bold>19.7x9.1</Text>
                    <Text bold>4.8x18.3</Text>
                    <Text bold>9.7x9</Text>
                  </Stack>
                  <Divider orientation='vertical' width={0.5} bg="#555555" mx={1}/>
                  <Stack direction={"column"} mr={7} >
                    <Text bold>Postal Ch:</Text>
                    <Text bold>Postal Gde:</Text>
                    <Text bold>Tabloide:</Text>
                    <Text bold>Carta:</Text>
                    <Text bold>4 Cartas:</Text>
                    <Text bold>8 Cartas:</Text>  
                  </Stack>
                  <Stack direction={"column"} alignItems={"flex-start"}>
                    <Text bold>9x14.7</Text>
                    <Text bold>9x16.4</Text>
                    <Text bold>27.5x39.7</Text>
                    <Text bold>19.5x27.5</Text>
                    <Text bold>55.3x39.7</Text>
                    <Text bold>79.7x55.3</Text>  
                  </Stack>


                </Stack>
                <InstruccionesComponente numero="05" 
                titulo="Colores con 3 tintas"
                parentesis="(El color debe estar compuesto por no más de 3 tintas (CMYK), de lo contrario la carga de tinta puede generar manchas y presentar visibles desfaces)" 
                />
                <InstruccionesComponente numero="06" 
                titulo="Negros"
                parentesis="El negro profundo se compone por CMY:40% y  K:100% (Solo para fondos y plastas grandes) 
                Elementos delgados y pequeños como textos, íconos y códigos QR solo deben tener K:100%" 
                />
                <InstruccionesComponente numero="07" 
                titulo="Textos"
                parentesis="El tamaño de texto más pequeño recomendado es de 10pts, si este esta sobre un fondo negro profundo debe tener un stroke de 1 o 2 pts de pura tinta K:100% para protegerlo y no se lo coma la tinta. " 
                />   
                


                <Text color={colors.azul} bold fontSize={20} alignSelf={"flex-end"} mr={5}>¿Cómo guardar el archivo?</Text>
                <GuardarComponente text="Siempre guardar al tamaño final de impresión en JPG  a 300 DPIS" />
                <GuardarComponente text="Indicar cantidad, tamaño, si es 4x0, 4x1 ó 4x4 y el frente y la vuelta, ejemplo: Tarj 4x1 Nombre F.jpg - Tarj 4x1 Nombre V.JPG" />
               

               

            </ScrollView>
            
           
        </View>
    </NativeBaseProvider>
  );
};

export default Offset;
