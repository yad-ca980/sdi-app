
import { NativeBaseProvider, Text, View, Box, VStack } from "native-base";
import colors from '../colors';
import NotificationComponent from "../components/NotificationComponent";


const Notificaciones = () => {


    return(
        <NativeBaseProvider>
            <View flex={1} bg={colors.blanco}>
                <Text bold fontSize={"xl"} ml={5} my={3}>Mis notificaciones</Text>
                <VStack space={4}>

                    <NotificationComponent title="Pedido" text="Tu pedido está listo para recoger" date="01/03/2023 15:45:02"/>
                    <NotificationComponent title="Pedido" text="Pedido pagado con éxito, espera que esté listo para su recolección" date="01/03/2023 15:45:02"/>
                   

                </VStack>
             

            </View>
        </NativeBaseProvider>
    );
};

export default Notificaciones;