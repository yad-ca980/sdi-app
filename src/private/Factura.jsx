import { NativeBaseProvider, View, Text, Box, Stack, Icon, Input, Pressable } from "native-base";
import colors from "../colors";
import { useState } from "react";
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'; 

export default function Factura() {
  const [show, setShow] = useState(false);


  const [nombre, setNombre] = useState(false);
  const handleNombre = (value) => {
    setNombre(value);
  };
  
  const [apellidos, setApellidos] = useState(false);
  const handleApellidos = (value) => {
    setApellidos(value);
  };
  
  const [celular, setCelular] = useState(false);
  const handleCelular = (value) => {
    setCelular(value);
  };
  
  const [sucursal, setSucursal] = useState(false);
  const handleSucursal = (value) => {
    setSucursal(value);
  };
  
  const [pass, setPass] = useState(false);
  const handlePass = (value) => {
    setPass(value);
  };
  
  const [confirmPass, setConfirmPass] = useState(false);
  const handleConfirmPass = (value) => {
    setConfirmPass(value);
  };
  
  const Email = "cabdiel@gmail.com";
  



  return (
    <NativeBaseProvider>
      <View flex={1} bg={colors.blanco}>
        <Text bold fontSize={"xl"} ml={5} my={3}>Datos de facturación</Text>
        <Box bg={colors.blanco} w="90%" mx="5%" h={"400px"} shadow={6} borderRadius={20}>
        <Stack space={4} w="100%" alignItems="center">
          {/**NOMBRE */}
          <Input w={"90%"} mt={2} placeholder="Nombre" variant="underlined" />
          <Input w={"90%"} mt={2} placeholder="RFC" variant="underlined" />
          <Input w={"90%"} mt={2} placeholder="Regimen fiscal" variant="underlined" />
          <Input w={"90%"} mt={2} placeholder="Código Postal" variant="underlined" />
          <Input w={"90%"} mt={2} placeholder="Correo electrónico" variant="underlined" />


       
          
         

        </Stack>

        </Box>

      </View>
    </NativeBaseProvider>
    
  );
}