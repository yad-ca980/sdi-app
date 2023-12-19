import React from 'react';
import {  NativeBaseProvider, ScrollView, Text, View , Pressable, Center} from 'native-base';
import colors from '../../../colors';
import InstruccionesComponente from '../InstruccionesComponente';
import NotaComponent from '../NotaComponent';
import GuardarComponente from '../GuardarComponente';


const VinilCorte = (props) => {
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
        <Text fontSize={32} bold color={colors.azul} alignSelf={"flex-end"} mr={10}>  VINIL CORTE TEXTIL O ADHESIVO </Text>
            <ScrollView>
                <InstruccionesComponente numero="01" 
                titulo="Archivo PDF Vectorizado"
                parentesis="(Cuidar que textos e imagenes esten vectorizados)" 
                />           
                <InstruccionesComponente numero="02" 
                titulo="Diseño a la medida"
                parentesis="(48 de ancho maximo para textil / 58cm de ancho máximo adhesivo)" 
                />
                 <InstruccionesComponente numero="03" 
                titulo="Elementos pequeños"
                parentesis="(Si el diseño tiene elementos pequeños y/o delgados, cuidar que no sean menores a 3mm de ancho y 3cm de alto, de lo contrario el corte puede levantarse y podría dañar nuestro equipo)" 
                />
                 
             


                <Text color={colors.azul} bold fontSize={20} alignSelf={"flex-end"} mr={5}>¿Cómo guardar el archivo?</Text>
                <GuardarComponente text="Siempre especificar tamaño final y en formato ai o eps" />
                <GuardarComponente text="Especificar color: poner el color de acuerdo al muestarío." />
        
           

            </ScrollView>
            
           
        </View>
    </NativeBaseProvider>
  );
};

export default VinilCorte;
