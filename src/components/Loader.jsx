import { NativeBaseProvider, Spinner, Center, Text, View} from "native-base";
import colors from "../colors";

const Loader = ()=>{

    return(
        <NativeBaseProvider
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          
        }}>
            <View bg="white" flex={1} h="100%">

            
            <Center my="50%" >
                <Spinner color={colors.rosa} size={200} />
                <Text bold mt={5} fontSize={24} color={colors.gris}>Cargando</Text>
            </Center>
          </View>
       
      </NativeBaseProvider>
    )
}
export default Loader;