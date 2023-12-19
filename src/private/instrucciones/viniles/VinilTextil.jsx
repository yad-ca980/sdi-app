import React from 'react';
import {  NativeBaseProvider, ScrollView, Text, View , Pressable, Center} from 'native-base';
import colors from '../../../colors';
import InstruccionesComponente from '../InstruccionesComponente';
import NotaComponent from '../NotaComponent';
import GuardarComponente from '../GuardarComponente';

const VinilTextil = (props) => {
  const navegacion= (item) => {
    props.navigation.navigate(item);
  }; 

const OpcionButton = ( props)=>{
    const {as, name, text, nav } = props;
    return(
        <Pressable w="90%" mx="5%"  mt={3} onPress={()=>navegacion(nav)} bg={colors.azul} borderRadius={10} >
            {/* <Icon as={as} name={name} mx={2} mt={1} size="lg"  color="black"  /> */}
            <Center py={2}>
              <Text bold color={colors.blanco}   fontSize="xl">{text}</Text>
            </Center>
        </Pressable>
    )
  }


  return (
<NativeBaseProvider>
        <View style={{ flex: 1 }}>
        <Text fontSize={32} bold color={colors.azul} >  VINIL TEXTIL IMPRESO </Text>
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
                sean menores a 5mm cuando esta sobre color, o menos a 3mm sobre fondo blanco, menor a eso pierden definición y legibilidad. 
                )" 
                />


                <Text color={colors.azul} bold fontSize={20} alignSelf={"flex-end"} mr={5}>¿Cómo guardar el archivo?</Text>
                <GuardarComponente text="Siempre guardar al tamaño final de impresión" />
                <GuardarComponente text="A no menos de 100dpis." />
                <GuardarComponente text="En JPG." />
                <GuardarComponente text="Si tiene áreas blancas al filo del diseño, poner un stroke en negro para delimitar el diseño." />

                <NotaComponent nota="El ancho del material es de 50cm con un máximo de impresión de 48cm"/>
           
           

            </ScrollView>
            
           
        </View>
    </NativeBaseProvider>
  );
};

export default VinilTextil;
