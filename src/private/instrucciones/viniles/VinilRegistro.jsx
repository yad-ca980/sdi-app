import React from 'react';
import {  NativeBaseProvider, ScrollView, Text, View , Pressable, Center, Image} from 'native-base';
import colors from '../../../colors';
import InstruccionesComponente from '../InstruccionesComponente';
import NotaComponent from '../NotaComponent';
import GuardarComponente from '../GuardarComponente';


const VinilRegistro = (props) => {
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
        <Text fontSize={30} bold color={colors.azul} >  VINIL CORTE A REGISTRO </Text>
            <ScrollView>
                <InstruccionesComponente numero="01" 
                titulo="Archivo en JPG o PDF"
                parentesis="(Cualquier otro formato podría causar modificaciones y sería bajo responsabilidad del cliete el dejarlo)" 
                />           
                <InstruccionesComponente numero="02" 
                titulo="Diseño a la medida"
                parentesis="(Las planillas son de 95x100 o 95x50)" 
                />
                 <InstruccionesComponente numero="03" 
                titulo="Trabajado en CMYK"
                parentesis="(Si el archivo no tiene este modo de color, al momento de imprimir podría variar los tonos)" 
                />
                <InstruccionesComponente numero="04" 
                titulo="Resolución a 300DPIS"
                parentesis="(Si el archivo tiene menos de 300dpis y tiene textos o detalles pequeños pueden ser no claros)" 
                />

                
                <InstruccionesComponente numero="05" 
                titulo="Textos pequeños"
                parentesis="(Si el diseño tiene textos pequeños y/o delgados, cuidar que no
                sean menores a 5mm cuando esta sobre color, o menos a 3mm sobre fondo blanco, menor a eso pierden definición y legibilidad. 
                )" 
                />
                <Center my={-16}>
                  <Image source={require("../img/vinil.png")} 
                 alt="Alternate Text" size={96} resizeMode='contain'/>
                </Center>   


                <Text color={colors.azul} bold fontSize={20} alignSelf={"flex-end"} mr={5}>¿Cómo guardar el archivo?</Text>
                <GuardarComponente text="Especificar material: mate, brillante, transparete." />
                <GuardarComponente text="Siempre especificar cantidad, medida y nombrar." />
               
           

            </ScrollView>
            
           
        </View>
    </NativeBaseProvider>
  );
};

export default VinilRegistro;
