import React from 'react';
import {  NativeBaseProvider, ScrollView, Text, View , Pressable, Center} from 'native-base';
import colors from '../../colors';
import InstruccionesComponente2 from './InstruccionesComponent2';
import GuardarComponente from './GuardarComponente';
import NotaComponent from './NotaComponent';

const Viniles = (props) => {
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
        <Text fontSize={42} bold color={colors.azul} alignSelf={"flex-end"} mr={10}>  Viniles </Text>
            <ScrollView>
              <OpcionButton text="VINIL IMPRESO" nav="VinilImpreso"/>
              <OpcionButton text="VINIL TEXTIL IMPRESO" nav="VinilTextil"/>
              <OpcionButton text="VINIL CORTE TEXTIL O ADHESIVO" nav="VinilCorte"/>
              <OpcionButton text="VINIL CORTE A REGISTRO" nav="VinilRegistro"/>
             
                   
                


                <Text color={colors.rosa} bold fontSize={26} alignSelf={"flex-end"} mr={5}>¿Cómo guardar el archivo?</Text>
                <InstruccionesComponente2 numero="  " 
                titulo="BLANCO"
                parentesis="Estatus, Medida, Cantidad, Nombre, Acabados"
                />
                <InstruccionesComponente2 numero="  " 
                titulo="TRANSP / MATE / TEXTIL"
                parentesis="Estatus, Material, Cantidad, Medida, Nombre, Acabados" 
                />
                <InstruccionesComponente2 numero="  " 
                titulo="FOTOGRÁFICO / PELICULA TRANSLUCIDA"
                parentesis="Estatus, Material, Cantidad, Medida, Nombre, Acabados" 
                />
                <InstruccionesComponente2 numero="  " 
                titulo="CANVAS BCO / BEIGE"
                parentesis="Estatus, Material, Cantidad, Medida, Nombre, Acabados" 
                />    
                 <InstruccionesComponente2 numero="  " 
                titulo="ACABADOS"
                parentesis="Si no se requiere ningun acabado, la impresión se entrega tal cual sale del plotter, en rollo.
                Los acabas de estos materiales pasan al área de acabados cuando en el archivo se indica:" 
                /> 

                <GuardarComponente text="CorteAlRas" />
                <GuardarComponente text="SobreCoroPlast/PVC" />
                <GuardarComponente text="RollUp" />
                <Text bold ml={10} mt={3} fontSize={"lg"}>Ejemplos: </Text>
                <GuardarComponente text="Si solo es un vinil blanco con servicio normal y sin acabado especial: 100x100 fulanito.Jpg" />
                <GuardarComponente text="Si son 2 vinil mate iguales con servicio urgente: urge mate 2pz 100x100 fulanito.Jpg" />
                <GuardarComponente text="Si es un mateial diferente al vinil con servicio normal con corte al ras: fotografico 5pz 50x100 fulanito alras.Jpg" />
               

                

            </ScrollView>
            
           
        </View>
    </NativeBaseProvider>
  );
};

export default Viniles;
