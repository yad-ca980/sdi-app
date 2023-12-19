
import { NativeBaseProvider, Text, View, HStack, ScrollView, Box, Divider, Pressable } from "native-base";
import colors from '../colors';
import { FontAwesome } from '@expo/vector-icons'; 


const Tarjetas = (props) => {

    const EliminarBtn = () =>{
        
    }

    const DetalleTarjeta = () =>{
        props.navigation.navigate("DetalleTarjeta")
    }


    const TarjetaRow= (props) => {
        const { text } = props;
        return(
            <Box>
                <HStack w="86%" mx="7%" mt={4} justifyContent="space-between">
                    <FontAwesome name="credit-card" size={24} color={colors.azul} style={{marginTop:5}} />
                    <Pressable w="75%"  h={10} onPress={()=>DetalleTarjeta()}>
                        <Text fontSize={"lg"}>
                            {text}
                        </Text>

                    </Pressable>
                    
                    <FontAwesome name="trash-o" size={20} color={colors.rosa} style={{marginTop:5}} />
                </HStack>
                <Divider w="90%" mx="5%" my={1}/>
            </Box>
        )

    }

    return(
        <NativeBaseProvider>
            <View flex={1} bg={colors.blanco} safeAreaButton={3} >
                <Text bold fontSize={"xl"} ml={5} my={3}>Mis Tarjetas</Text>
                <ScrollView bg={colors.blanco} w="90%" mx="5%"  borderRadius={20} shadow={6} safeAreaTop={4} mb={5}>
                    <TarjetaRow text="0000 (tarjeta de Pepe)"/>
                    <TarjetaRow text="0000 (tarjeta de Lulu)"/>
                    <TarjetaRow text="0000 (tarjeta Hermano)"/>
                    
                </ScrollView>
                <Pressable my={5} alignItems="center">
                    <Text bold underline color={colors.azul} fontSize={18}>Agregar tarjeta</Text>
                </Pressable>
                

            </View>
        </NativeBaseProvider>
    );
};

export default Tarjetas;