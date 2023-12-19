
import { NativeBaseProvider, Box, Text, Stack, Pressable, Center, ScrollView } from 'native-base';
import colors from '../colors';
import fetchPost from '../helper/fetchPost';
import SwiperList from '../components/SwiperList';
import ProductoComponent from '../components/ProductoComponent';
import URL from '../helper/URL';
import { useState, useEffect, useRef } from 'react';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants";
import {  Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
      //  alert('Failed to get push token for push notification!');
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        }))
      //  alert(token.data);
        console.log("TOKEN Home", token);
    } else {
     // alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

export default function Home(props) {
  const BASE_URL =URL.BASE_URL;
 const [ idU, setIdU ] = useState(null);

 // notificaciones
 const [expoPushToken, setExpoPushToken] = useState('');
 const [notification, setNotification] = useState(false);
 const notificationListener = useRef();
 const responseListener = useRef();


 useEffect(() => {
  registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    setNotification(notification);
  });

  responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    console.log(response);
  });

  return () => {
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  };
}, []);


 const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@id_user')
    if(value !== null) {
      console.log("idU async: ", value);
      setIdU(value);
    }
  } catch(e) {
    console.log("error async home", e);
  }
}

  const navegacion= (item) => {
    props.navigation.navigate(item);
  }; 

const [loader, setLoader ]= useState(true);

  const detalleCategorias= (item, link, user) => {
    props.navigation.navigate("DetalleCategoria", {
      estado: item,
      url: link,
      user: user
    });
  };



  const [ impresos, setImpresos ] = useState([]);
  const getImpresos = async()=>{
    const url = `${BASE_URL}abdiel/Productos/ver_impresos10`
    const options = {
      method:'POST',
    };
    const res = await fetchPost(url, options);
    setImpresos(res.data);
   // console.log("res", res.data);
    
  }
  useEffect(() => {
    getData();
    getImpresos();
    getNoImpresos();
    console.log("idU: ", idU)
  },[])

  const [ noImpresos, setNoImpresos ] = useState([]);
  const getNoImpresos = async()=>{
    const url = `${BASE_URL}abdiel/Productos/ver_noimpresos10`
    const options = {
      method:'POST',
    };
    const res = await fetchPost(url, options);
    setNoImpresos(res.data);
   //console.log("res", res.data);
    setLoader(false);
    
  }




  
 
  return (
    <NativeBaseProvider >
      {loader===true ? <Loader/> : 
      <Box h={"100%"} bg={colors.blanco}>
        <Box h={"20%"}>
        <SwiperList/>
        </Box>
        
        <Box ml={3}>
        <Text bold fontSize={'md'} my={2}> Categorías</Text>
        </Box>

      

    
        <Center w={"95%"} ml={3}>
        <Stack direction={"row"}>
          <Pressable h={10} w={"45%"} bg={colors.azul} shadow={6} 
          borderRadius={12} m={3} onPress={()=>detalleCategorias(true, "http://sdiqro.store/abdiel/Productos/ver_impresos", idU)}>
            <Center h={"100%"} w={"100%"}>
              
              <Text bold color={"white"} letterSpacing={1} fontSize={'sm'}>Impresos</Text>
           
            </Center>
          </Pressable>

          <Pressable h={10} w={"45%"} bg={colors.azul} shadow={6} 
          borderRadius={12} m={3} onPress={()=>detalleCategorias(false, "http://sdiqro.store/abdiel/Productos/ver_noimpresos", idU)}>
            <Center h={"100%"} w={"100%"}>
             
              <Text bold color="white" letterSpacing={1} fontSize={'sm'}>No Impresos</Text>
           
            </Center>
          </Pressable>

          { /*
                      <Pressable h={10} w={"27%"} bg={colors.azul} shadow={6} 
                      borderRadius={12} m={3} onPress={()=>detalleCategorias_agrupa(false, "http://sdiqro.store/abdiel/Productos/ver_sin_agrupacion", idU)}>
                        <Center h={"100%"} w={"100%"}>
            
                          <Text bold color="white" letterSpacing={1} fontSize={'sm'} style = {{
                            textAlign : 'center',
                            alignItems : 'center'
            
                          }}>Sin Agrupacion</Text>
                       
                        </Center>
                      </Pressable>


                        */}




          
      </Stack>

        </Center> 


        <ScrollView>
      <Box> 
        <Stack direction={"row"} justifyContent={"space-between"} mx={9} my={1}>
          <Text bold >Más vendidos impresos</Text>
          <Pressable onPress={()=>detalleCategorias(false, "https://sdiqro.store/abdiel/Productos/ver_impresos10", idU)}>
            <Text color={"#ff0000"}> Ver más</Text>
          </Pressable>

        </Stack>
        {impresos.length > 0 ? 

        <ScrollView horizontal={true}>
          { impresos.map( (impreso, index)=>{
            return(
              <ProductoComponent 
              key={index} nombre={impreso.nombreS} id={impreso.idS}
              precio = {impreso.precioS}
              image={impreso.image_url}
              idAS={impreso.idAS}
              impreso={true}
              idU={idU}
              desS={impreso.desS}/>
            ) 
          } )

          }
        </ScrollView>
         : <Text alignSelf={"center"} my={8}>No hay productos por el momento</Text>}
      </Box>


      <Box my={3}>
        <Stack direction={"row"} justifyContent={"space-between"} mx={9} my={1}>
          <Text bold >Más vendidos no impresos</Text>
          <Pressable onPress={()=>detalleCategorias(false, "http://sdiqro.store/abdiel/Productos/ver_noimpresos10", idU)}>
            <Text color={"#ff0000"}> Ver más</Text>
          </Pressable>

        </Stack>

        {noImpresos.length > 0 ? 
        <ScrollView horizontal={true}>
        { noImpresos.map( (noImpreso, index)=>{
            return(
              <ProductoComponent 
              key={index} nombre={noImpreso.nombreS} id={noImpreso.idS}
              precio = {noImpreso.precioS}
              image={noImpreso.image_url}
              impreso={false}
              idAS={noImpreso.idAS}
              idU={idU}
              desS={noImpreso.desS}/>
            ) 
          } )

          }
        
        </ScrollView>
        : <Text alignSelf={"center"} my={8}>No hay productos </Text>}
      </Box>
      </ScrollView>
        
        
      </Box>
      }

      


    </NativeBaseProvider>
  );
}
