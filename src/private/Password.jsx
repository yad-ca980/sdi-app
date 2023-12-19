import { NativeBaseProvider, ScrollView, Text, View, Input, Icon, Pressable, Button} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import fetchPost from "../helper/fetchPost";
import { Alert } from "react-native";

const Password =(props) =>{

    const { IdU } = props.route.params;
    const [show, setShow ] = useState(false);
    const [show1, setShow1 ] = useState(false);
    const [show2, setShow2 ] = useState(false);

    const [pass, setPass ] = useState("");
    const handlePass = (value) => {
        setPass(value);
      };
    const [newPass, setNewPass ] = useState("");
    const handleNewPass = (value) => {
        setNewPass(value);
      };
    const [confirm, setConfirm ] = useState("");
    const handleConfirm = (value) => {
        setConfirm(value);
      };



    const [ actualizando, setActualizando] = useState(false);
    //ACTUALIZA DATOS
    const Actualizar = async() => {
      setActualizando(true);
      if (newPass.length<4){
        Alert.alert(
            'Error',
            'Ingresa una contraseña de al menos 5 carácteres',
            [
              { text: 'OK',  onPress: () => console.log("Arregla longitud de password")  },
            ],
            { cancelable: false },
          );
      }else  if (newPass!==confirm) {
        Alert.alert(
            'Error',
            'La nueva contraseña no coincide',
            [
              { text: 'OK',  onPress: () => console.log("Verifica contraseña")  },
            ],
            { cancelable: false },
          );
  
      
      }else{
  
          const dataNew = new FormData();
          dataNew.append("idU", IdU);
          dataNew.append("pass", pass);
          dataNew.append("newPass", newPass);
  
          const url = `http://sdiqro.store/abdiel/Perfil/update_password`
          const options ={
            method:'POST',
            body: dataNew
          };
          {/**respuesta */}
          const response = await fetchPost(url, options);
          console.log("response", response);
          if (response===true) {
             
                Alert.alert(
                  '!Éxito!',
                  "!Se actualizó tu contraseña",
                  [
                    { text: 'OK',  onPress: () =>  props.navigation.navigate("CuentaMenu") },
                  ],
                  { cancelable: false },
                );
              
          }else{
              Alert.alert(
                  '!Ups....!',
                  'Hubo un error, verifica tu contraseña e intenta más tarde',
                  [
                    { text: 'OK',  onPress: () => console.log("error editar perfil")  },
                  ],
                  { cancelable: false },
                );
  
          }
  
      }
      setActualizando(false);
      
    }


    return(
        <NativeBaseProvider>
            <View flex={1} bg="white">
           
                <ScrollView my={9} mx={5} shadow={6} borderRadius={20} bg="white" space={4}>
                    
             
                    <Text mt={4} ml={4} mb={2}>Contraseña actual:</Text>
                    <Input size="lg"  alignSelf={"center"} 
                    value={pass} onChangeText={handlePass}
                    w={{
                    base: "75%",
                    md: "25%"
                    }} type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
                        <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                    </Pressable>} placeholder="Password" />


                    <Text mt={4} ml={4} mb={2}>Nueva contraseña:</Text>
                    <Input  size="lg" alignSelf={"center"} 
                    value={newPass} onChangeText={handleNewPass}
                    w={{
                    base: "75%",
                    md: "25%"
                    }} type={show1 ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow1(!show1)}>
                        <Icon as={<MaterialIcons name={show1 ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                    </Pressable>} placeholder="Password" />


                    <Text mt={4} ml={4} mb={2}>Confirma nueva contraseña:</Text>
                    <Input size="lg" alignSelf={"center"}
                    value={confirm} onChangeText={handleConfirm}
                     w={{
                    base: "75%",
                    md: "25%"
                    }} type={show2 ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow2(!show2)}>
                        <Icon as={<MaterialIcons name={show2 ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                    </Pressable>} placeholder="Password" />
               

                    <Button size="lg" colorScheme="secondary" mx={20} mt={5} isLoading={actualizando} isLoadingText="Guardando" onPress={()=>Actualizar()}> Guardar</Button>
                    <Button size="lg"  mx={20} mt={5} isLoading={actualizando} isLoadingText="Guardando" onPress={()=>props.navigation.navigate("Perfil")}> Volver</Button>

                </ScrollView>
            </View>
        </NativeBaseProvider>
    );
};
export default  Password;