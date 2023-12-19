import { NativeBaseProvider, View, Text, Icon, Stack, Input, Pressable, ScrollView, Button} from "native-base";
import colors from "../colors";
import { useState, useEffect } from "react";
import { FontAwesome, Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import Loader from "../components/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchPost from "../helper/fetchPost";
import { Alert } from "react-native";

export default function Perfil(props) {
  const [show, setShow] = useState(false);
  const [ loading, setLoading ] = useState(true);

  const [nombre, setNombre] = useState("");
  const handleNombre = (value) => {
    setNombre(value);
  };
  console.log("nombre", nombre)
  
  const [apellidos, setApellidos] = useState("");
  const handleApellidos = (value) => {
    setApellidos(value);
  };
  
  const [celular, setCelular] = useState("");
  const handleCelular = (value) => {
    setCelular(value);
  };
  const[correo, setCorreo] = useState("")
  

  //Conseguir el ID  de usuario almacenado en login Asyncstorage.
  const [ idUser, setIdUser ] = useState(null);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@id_user')
      if(value !== null) {
        console.log("valor id getData", value)
        setIdUser(value);
        getDatos(value);
        
      }
    } catch(e) {
      console.log("error", e);
    }
  }
  useEffect(() => {
    getData()
    console.log("id", idUser)
  }, [idUser]);
  // Fin ID USER

  //get datos
  const getDatos = async(value) => {
    const dataUser = new FormData();
    dataUser.append("idU",value)
    console.log("Soy el id de usuario",value);
    const url = `http://sdiqro.store/abdiel/Perfil/get_info`
    const options = {
      method:'POST',
      body: dataUser
    };
    const res = await fetchPost(url, options);
    console.log("res:", res)
    setApellidos(res.data.apellidos);
    setNombre(res.data.nombreU);
    setCorreo(res.data.correo);
    setCelular(res.data.telefono);
   // setSelected( res.data.sexo);
    //console.log("res", res.data.sexo);
    setLoading(false);
}

  const DatosRender=()=>{
    if (nombre !== ""){
      setLoading(false)
    }setLoading(true)
  }


  const [ actualizando, setActualizando] = useState(false);
    //ACTUALIZA DATOS
    const Actualizar = async() => {
      setActualizando(true);
      if (nombre.length<2) {
          Alert.alert(
              'Nombre invalido',
              'Ingresa un nombre de al menos 3 carácteres',
              [
                { text: 'OK',  onPress: () => console.log("Arregla el nombre")  },
              ],
              { cancelable: false },
            );
      }else if (apellidos.length<2){
          Alert.alert(
              'Apellido invalido',
              'Ingresa un apellido de al menos 3 carácteres',
              [
                { text: 'OK',  onPress: () => console.log("Arregla el nombre")  },
              ],
              { cancelable: false },
            );
  
      }else if (celular.length!==10){
          Alert.alert(
              'Teléfono invalido',
              'Ingresa un numero de al menos 10 carácteres',
              [
                { text: 'OK',  onPress: () => console.log("Arregla el nombre")  },
              ],
              { cancelable: false },
            );
      }else{
  
          const dataNew = new FormData();
          dataNew.append("nombreU", nombre);
          dataNew.append("apellidos", apellidos);
          dataNew.append("telefono", celular);
          dataNew.append("idU", idUser);
  
          const url = `http://sdiqro.store/abdiel/Perfil/update_user`
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
                  "!Se actualizaron tus datos!'",
                  [
                    { text: 'OK',  onPress: () =>  props.navigation.navigate("CuentaMenu") },
                  ],
                  { cancelable: false },
                );
              
          }else{
              Alert.alert(
                  '!Ups....!',
                  'Hubo un error, intenta más tarde',
                  [
                    { text: 'OK',  onPress: () => console.log("error editar perfil")  },
                  ],
                  { cancelable: false },
                );
  
          }
  
      }
      setActualizando(false);
      
    }


    // Borrar cuenta
    const borrarAviso = () =>{
      
      console.log("Entro a la consonante borrar");

      Alert.alert(
        '¿Seguro que deseas borrar tu cuenta?',
        "Esta acción no se puede deshacer",
        [
          {
            text: 'Volver',
        onPress: () => console.log('Cancel Pressed'),
          },

          { text: 'Eliminar cuenta',  onPress: () => {borrarCuenta()},
            },
        ],
        { cancelable: false },
      );
    }

    const borrarCuenta = async()=>{
      console.log("Entre en borrar cuenta");

      const dataUser= new FormData();

      dataUser.append("idU", idUser);
      console.log("sOY DATA USER",dataUser)
      const url = `https://sdiqro.store/abdiel/perfil/delete_usuario`
      const options = {
        method:'POST',
        body: dataUser
      };


      const res = await fetchPost(url, options);
      console.log("RESPONSE: ", res);
      console.log("id USUARIO" , idUser) ;
      
      if (res != true){
        Alert.alert(
          'No se pudo eliminar tu cuenta',
          "Hubo un error",
          [
            { 
              text : 'Salir', onPress: () => props.navigation.navigate("CuentaMenu")

            },
          ]
        )
      }else{
          Alert.alert(
            'Se eliminó tu cuenta.',
            "Esperamos verte pronto",
            [
              { text: 'Volver',  onPress: () => {logOut()} 
            },
            ],
            { cancelable: false },
          );
        }
    }
    const logOut = async() =>{
      
      try{
        await AsyncStorage.clear();
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
      });

      }catch(error){
        console.log(error);
      }
    }


  



  return (
    <NativeBaseProvider>

      {loading === true ? <Loader/> : 
      <View  bg={colors.blanco}>
        <Text bold fontSize={"xl"}  w="90%" ml={5} my={3}>Mi perfil</Text>
        <ScrollView bg={colors.blanco} mx="5%" mb={5}  shadow={6} borderRadius={10}>
          <Stack space={4} w="100%" alignItems="center">
          {/**NOMBRE */}
         
            <Input w={"90%"} mt={2} placeholder="Nombre" variant="underlined" 
            value={nombre} onChangeText={handleNombre} size="lg"
            InputLeftElement={<Icon as={<MaterialIcons name="person" />} 
            size={9} ml="2" mr={2} color={colors.azul} />}  />

            {/**Apellidos */}
            <Input w={"90%"} mt={2} placeholder="Apellidos" variant="underlined" 
            value={apellidos} onChangeText={handleApellidos} size="lg"
            InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={9} ml="2" mr={2} color={"warning.400"} />}  />

            {/**Celular */}
            <Input w={"90%"} mt={2} placeholder="Teléfono" variant="underlined"
            value={celular} onChangeText={handleCelular} size="lg" maxLength={10}
            keyboardType="numeric"
            InputLeftElement={<Icon as={<FontAwesome name="mobile-phone" />} size={9} ml={4}  color={colors.rosa} />}  />

            {/**FALTA LA SUCURSAL */}

            {/**EMAIL */}
            <Input w={"90%"} mt={2} placeholder="Correo electrónico" variant="underlined"
            value={correo} isreadOnly={true} size="lg"
            InputLeftElement={<Icon as={<Ionicons name="mail" />} size={8} ml={2} mr={3} color={colors.amarillo} />}  />

            <Button size="lg"   w="50%" colorScheme="secondary"  isLoading={actualizando} isLoadingText="Guardando" onPress={()=>Actualizar()}> Guardar</Button>

            <Button size="lg"   onPress={()=>props.navigation.navigate("Password", { IdU: idUser })} w="50%"> Cambiar contraseña</Button>


            {/* eliminar cuenta */}
            <Pressable w="90%" mx="5%" flexDirection={"row"} my={5} onPress={()=> borrarAviso()}>
                <Icon as={AntDesign} name="deleteuser" mx={2} mt={1} size="lg"  color="black"  />
                <Text bold color={colors.gris}  ml={2} fontSize="xl">Eliminar cuenta</Text>
            </Pressable>
          
    

        </Stack>

        </ScrollView>

      </View>
      } 
    </NativeBaseProvider>
    
  );
}