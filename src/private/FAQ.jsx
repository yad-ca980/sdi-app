
import { NativeBaseProvider, Text, View, Box, ScrollView } from "native-base";
import FaqComponent from "../components/FaqComponent";
import colors from '../colors';


const FAQ = () => {


    return(
        <NativeBaseProvider>
            <View flex={1} bg={colors.blanco}>
                <Text bold fontSize={"xl"} ml={5} my={3}>Preguntas frecuentes</Text>
                <ScrollView>
                    <FaqComponent n="1" question="¿Cuánto tiempo tardará en llegar mi pedido?" answer="El tiempo de envío depende de varios factores, como la ubicación del comprador, la disponibilidad del producto y el método de envío seleccionado. Generalmente, se estima que los pedidos tardan entre 2 y 7 días hábiles en llegar, pero puede variar. Una vez que se realiza el envío, se enviará un correo electrónico con el número de seguimiento para que pueda rastrear su pedido."/>
                    <FaqComponent n="2" question="¿Puedo devolver un producto si no estoy satisfecho?" answer="Sí, ofrecemos una política de devoluciones para productos que no cumplan con sus expectativas. Debe informarnos dentro de los 30 días posteriores a la recepción del producto si desea devolverlo. El producto debe estar en su estado original y debe incluir todas las partes y accesorios. Una vez que recibamos y procesemos su devolución, le reembolsaremos el costo del producto o le enviaremos un reemplazo."/>
                </ScrollView>                

            </View>
        </NativeBaseProvider>
    );
};

export default FAQ;