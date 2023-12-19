import React from 'react';
import { NativeBaseProvider, View, ScrollView, Text, Pressable, Center } from 'native-base';
import colors from '../colors';

const RecepcionPedidos = (props) => {
    const navegacion= (item) => {
        props.navigation.navigate(item);
      }; 

    const OpcionButton = ( props)=>{
        const {as, name, text, nav } = props;
        return(
            <Pressable w="80%" mx="10%"  mt={2} onPress={()=>navegacion(nav)} bg={colors.azul} borderRadius={10} >
                {/* <Icon as={as} name={name} mx={2} mt={1} size="lg"  color="black"  /> */}
                <Center p={2}>
                  <Text bold color={colors.blanco}  ml={2} fontSize="xl">{text}</Text>
                </Center>
            </Pressable>
        )
      }


  return (
    <NativeBaseProvider>
        <View flex={1} bg={colors.blanco}>
          <Text mx={4} mt={3} fontSize={"md"}>Instrucciones para enviar los archivos para tus productos impresos:</Text>
            <ScrollView shadow={6} mx={8} borderRadius={10} bg={colors.blanco} space={1} mt={3} p={3} borderColor={"#dddddd"} borderWidth={2}>
              <OpcionButton text="Lonas" nav="Lonas"/>
              <OpcionButton text="Viniles" nav="Viniles"/>
              <OpcionButton text="Canvas" nav="Canvas"/>
              <OpcionButton text="Stand" nav="Stand"/>
              <OpcionButton text="Credenciales PVC" nav="Credenciales"/>
              <OpcionButton text="OFFSET" nav="Offset"/>
              <OpcionButton text="Botones" nav="Botones"/>
              <OpcionButton text="DTF" nav="Dft"/>
            </ScrollView>
        </View>
    </NativeBaseProvider>
  );
};

export default RecepcionPedidos;
