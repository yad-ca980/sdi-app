import {  Divider, Icon, NativeBaseProvider, Pressable, Text,  Stack, ScrollView, Image } from 'native-base';

import colors from '../colors';
import { FontAwesome5, Entypo, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'; 
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import { useState, useEffect } from 'react';
import fetchPost from '../helper/fetchPost';
import URL from '../helper/URL';





const CuentaMenu=(props)=> {
  const BASE_URL = URL.BASE_URL;
  const navegacion= (item) => {
    props.navigation.navigate(item);
  }; 

  const [ load, setLoad ] = useState(true)
  const [ idU, setIdU ] = useState(null)

      const getData = async () => {
        console.log(load);
        try {
          const value = await AsyncStorage.getItem('@id_user')
          if(value !== null) {
            //console.log("idU async: ", value);
            setIdU(value);
            setLoad(false)
          }else{
            registroAviso()
          }
        } catch(e) {
          console.log("error async home", e);
          registroAviso();
        }
      }

      useEffect(() => {
        getData();
       console.log("id user perfil", idU)
       
       
      
      }, [idU])
      

      const PerfilButton = ( props)=>{
        const {as, name, text, nav } = props;
        return(
            <Pressable w="90%" mx="5%" flexDirection={"row"} my={3} onPress={()=>navegacion(nav)}>
                <Icon as={as} name={name} mx={2} mt={1} size="lg"  color="black"  />
                
                <Text bold color={colors.gris}  ml={2} fontSize="xl" style={{ whiteSpace: 'pre-wrap' }}> {text} </Text>
                
            </Pressable>
            
        )



      }
      const registroAviso = () =>{
        Alert.alert(
          'Debes estar registrado e iniciar sesión para ver tu perfil',
          "Selecciona una opción",
          
          [
            {
              text: 'Iniciar sesion',
          onPress: () => { props.navigation.navigate('Welcome', { status: true })},
            },
            {
              text: 'Registrarse',
          onPress: () => { props.navigation.navigate('Welcome', { status: false } )},
            },
  
            { text: 'Volver',  onPress: () => {navegacion("Home")}  },
          ],
          { cancelable: false },
        );
      }


    const salirAviso = () =>{
      Alert.alert(
        '¿Seguro que deseas cerrar sesión?',
        "",
        
        [
          {
            text: 'Volver',
        onPress: () => console.log('Cancel Pressed'),
          },

          { text: 'Salir',  onPress: () => {logOut()
        }  },
        ],
        { cancelable: false },
      );
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

    

    const borrarAviso = () =>{
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
      const dataUser= new FormData();
      dataUser.append("idU", idU);
      const url = `${BASE_URL}abdiel/perfil/delete_usuario`
      const options = {
        method:'POST',
        body: dataUser
      };
      const res = await fetchPost(url, options);
      console.log("RESPONSE: ", res);
      console.log("id USUARIO" , idU) ;
      
      if (res != true){
        alert("Error al borrar cuenta, intentelo más tarde.")
        }else{
          Alert.alert(
            'Se eliminó tu cuenta.',
            "Esperamos verte pronto",
            [
    
              { text: 'Volver',  onPress: () => { logOut();},
                },
            ],
            { cancelable: false },
          );
        }
    }

  return (
    <NativeBaseProvider>
      

        {
          idU === null ? <Loader/> :

          <ScrollView bg={colors.blanco} flex={1}  >

            <Image source={require("../../assets/iconT.png")}
             alt="Alternate Text" size={48} alignSelf={'center'} resizeMode="contain" />
            <Stack shadow={6} mx={8} mb={3} borderRadius={10} bg={colors.blanco} space={1}  p={3} borderColor={"#dcdcdc"} borderWidth={1.5}>
            
           <PerfilButton as={FontAwesome5} name="user-alt" text="Mi Perfil"  nav="Perfil"/>
           <Divider h={0.5} bg={colors.gris} w="90%" mx="5%"/>

           

            <PerfilButton as={FontAwesome5} name="question-circle" text="Preguntas frecuentes" nav="FAQ"/>
            <Divider h={0.5} bg={colors.gris} w="90%" mx="5%"/>

            <PerfilButton as={MaterialCommunityIcons} name="printer-check" text={"Instrucciones para \n recepción de pedidos"} nav="RecepcionPedidos"/>
            <Divider h={0.5} bg={colors.gris} w="90%" mx="5%"/>

            <Pressable w="90%" mx="5%" flexDirection={"row"} my={3} onPress={()=> salirAviso()}>
              <Icon as={Entypo} name="log-out" mx={2} mt={1} size="lg"  color="black"  />
              
              <Text bold color={colors.gris}  ml={2} fontSize="xl">Cerrar Sesión</Text>
                    
            </Pressable>
            {/* <Divider h={0.5} bg={colors.gris} w="90%" mx="5%"/> */}
            


            {/* <Pressable w="90%" mx="5%" flexDirection={"row"} my={3} onPress={()=> borrarAviso()}>
              <Icon as={AntDesign} name="deleteuser" mx={2} mt={1} size="lg"  color="black"  />
              <Text bold color={colors.gris}  ml={2} fontSize="xl">Eliminar cuenta</Text>
            </Pressable> */}

            
          
            </Stack>
          </ScrollView>

        }
        
    </NativeBaseProvider>
  );
}
export default CuentaMenu;