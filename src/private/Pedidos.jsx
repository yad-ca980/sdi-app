import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, ScrollView,  View} from "native-base";
import colors from '../colors';
import { Alert } from 'react-native';
import PedidoComponent from '../components/PedidoComponent';
import URL from '../helper/URL';
import fetchPost from '../helper/fetchPost';
import Loader from "../components/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Pedidos = (props) => {
// status de pedido
// 0.Por recoger
// 1. entregado
// 2. cancelado

  const [ idU, setIdU ] = useState(null);

  const [ load, setLoad] = useState(true);

  const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@id_user')
    if(value !== null) {
      console.log("idU async: ", value);
      setIdU(value);
      getPedidos(value);
    }else{
      Alert.alert(
        'Para ver tus pedidos, debes estar registrado e iniciar sesión ',
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

          { text: 'Volver',  onPress: () => {props.navigation.navigate("Home")}  },
        ],
        { cancelable: false },
      );
    }
  } catch(e) {
    console.log("error async home", e);
  }
  }
  useEffect(() => {
    getData();
    console.log("idU: ", idU)

  },[])

  



  
    const BASE_URL = URL.BASE_URL;
    const [ pedidos, setPedidos ] = useState([])
    const getPedidos = async(id)=>{
        const dataPedido= new FormData();
        dataPedido.append("idU", id);
        const url = `${BASE_URL}abdiel/pedidos/ver_pedidos`
        const options = {
          method:'POST',
          body: dataPedido
        };
        const res = await fetchPost(url, options);
        if (res.length !== 0){
          console.log("pedidos GET: ", res)
           setPedidos(res)
           setTimeout(() => {
            setLoad(false);
          }, 1000);
          }else{
            Alert.alert(
              'No tienes pedidos',
              "Cuando realices una compra, tus pedidos y su estatus aparecerán aquí",
              
              [
                { text: 'Volver',  onPress: () => {props.navigation.navigate("Home")}  },
              ],
              { cancelable: false },
            );
          }
        //console.log("res", res.data);
       
      }

      

    

    return(
        <NativeBaseProvider>
            <View flex={1} bg={colors.blanco}>
                {/* <Text m={2}  bold fontSize={"xl"}>Mis Pedidos</Text> */}
                { load ? <Loader/> : 
                  <ScrollView  >
                      {pedidos.map( (pedido, index)=>{
                            return(
                              <PedidoComponent
                              key={index}
                              fecha={pedido.FechaVentaG}
                              sucursal={pedido.nombreSuc}
                              total={pedido.TotalVenta}
                              orden={pedido.idVenta}
                              estatus={pedido.estatus} 
                              color={pedido.color}
                              token={pedido.tokenVenta}
                              navigation={props.navigation}
                              idVenta={pedido.idVenta}
                              idU={idU}
                              />
                            ) 
                          }

                          )
                      }
                  </ScrollView>
                }
            </View>
        </NativeBaseProvider>
    );
};

export default Pedidos;