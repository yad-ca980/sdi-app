import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, ScrollView, Text , Box, Center,  Divider, Pressable} from "native-base";
import colors from '../colors';
import fetchPost from '../helper/fetchPost';
import URL from '../helper/URL';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckOutComponent from '../components/CheckOutComponent';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const CheckOut = (props) => {
  const navigation =useNavigation();
    const BASE_URL= URL.BASE_URL
    // const idVenta = props.route.params.id;
    // const total = props.route.params.tot;
     const idSuc = props.route.params.idSuc;
     const nombreSuc = props.route.params.nombreS;
    // console.log("id venta:", idVenta)
    const [ pedidos, setPedidos ] = useState([])
    const [load, setLoad ] = useState(true)
    const [idU, setIdU] = useState(null)

    const getIdU = async () => {
      try {
        const value = await AsyncStorage.getItem('@id_user')
        if(value !== null) {
          console.log("idU async: ", value);
          setIdU(value);
          getData();
        }
      } catch(e) {
        console.log("error async home", e);
      }
    }

    const pagarTest = async()=>{
        const dataPedido= new FormData();
        dataPedido.append("idU", idU);
        dataPedido.append("total", total);
        dataPedido.append("idSuc", idSuc);
        dataPedido.append("comentario", "testing pago");
        dataPedido.append("idC", idCarrito);
        const url = `${BASE_URL}abdiel/pedidos/nuevo_pedido`
        const options = {
          method:'POST',
          body: dataPedido
        };
        const res = await fetchPost(url, options);
        if (res === true){
           console.log("resultado PAGO: ", res)
           alertExito();
           setLoad(false);
          }else{
            console.log("resultado PAGO: ", res)
            alertError();
          }
        console.log("res", res.resultado);
      }

       useEffect(() => {
       
     //    getPedidos()
        console.log("idSuc:", idSuc)
       
      }, [])

//CARRITOO
      const[ idCarrito, setIdCarrito ] = useState(null);
      const [ carrito, setCarrito ] = useState([]);
      const [ total, setTotal ] = useState(null);
     
      

     
      const getCarrito = async(value)=>{
        
        const dataFav = new FormData();
        dataFav.append("idC", value);
        const url = `${BASE_URL}abdiel/carrito/contenido_carrito`
        const options = {
          method:'POST',
          body: dataFav
        };
        const responseFav = await fetchPost(url, options);
        if (responseFav !== null){
          setCarrito(responseFav.data);
          //console.log("TOTAL", responseFav.total)
          setTotal(responseFav.total)
          //pagarTest();
          setLoad(false)
        }else{
          setCarrito([]);
        }
       
        //console.log("res", responseFav.data);
        //setLoader(false);
        
      }
      const getData = async () => {
        try {
        const value = await AsyncStorage.getItem('@id_carrito')
        if(value !== null) {
            setIdCarrito(value);
            getCarrito(value);
        }
        } catch(e) {
        console.log("error id carrito", e)
        }
    }

    useEffect(() => {
        getIdU();
      console.log("id carrito: ", idCarrito)
      console.log("total: ", total);
      console.log("carrito contenido: ", carrito);
      
      
      
    }, [carrito.length]) 
    
  //FIN CARRITO

  ///ALERTS
  const alertExito = ()=>{
    Alert.alert('Pago realizado', 'Se aprobó tu pago, puedes ver información del pedido en el apartado Pedidos ', [
      // {
      //   text: 'Ir a Mis Pedidos',
      //   onPress: () => props.navigation.navigate("Pedidos"),
        
      // },
      {text: 'Aceptar', onPress: () => navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
    }),},
    ],{ cancelable: false },);
  }

  const alertError = ()=>{
    Alert.alert('Error en pago', 'Ocurrió un error en el pago, intentalo más tarde', [
      {
        text: 'Aceptar',
        onPress: () => navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
      }),
        
      },
     // {text: 'OK', onPress: () => console.log('OK Pressed')},
    ], { cancelable: false },);
  }

  const goStripe = (id, tot, suc, car)=>{
    console.log("go stripe")
    navigation.navigate("PasarelaStripe", {
      id:id, 
      tot: tot,
      suc: suc,
      car: car
    })
  }

    return(
        <NativeBaseProvider>
          { load ?  <Loader/> : 
            <Box flex={1} bg={colors.blanco} >
              <ScrollView>
          
          <Box minH={48} maxH={96}>
            { carrito.length > 0 ? 
                    <ScrollView  >    
                        { carrito.map( (producto, index)=>{
                        return(
                        <CheckOutComponent
                        key={index} 
                        nombre={producto.nombreS} 
                        id={producto.id}
                        idS={producto.idS}
                        precio = {producto.PrecioCarrito}
                        cantidad = {producto.cantidad}
                        image={producto.image_url}
                        sucursal={producto.nombreSuc}
                        impreso={producto.impreso}
                        idU={producto.idSuc}
                        subtotal={producto.subtotalCarrito}/>
                        ) 
                      } )

                      }
                    </ScrollView>
                    : null
            }
            </Box>
            
            <Divider bg={colors.azul} borderRadius={100} h={1} w="80%" alignSelf={"center"} my={1}/>
            <Center h="70" w="85%"  mx={7} >  
                <Text fontSize={22} bold>Total con IVA: {total}</Text>
                <Text fontSize={18} >Recolección: Sucursal {nombreSuc} </Text>
            </Center>

            <Pressable justifyContent={"center"} alignItems={"center"} w="80%" mx="10%" bg={colors.azul} h={12} 
                borderRadius={50} my={4}   onPress={()=> goStripe(idU, total, idSuc, idCarrito)}>
                    <Text bold fontSize={"lg"}  color={colors.blanco}> Pagar con stripe </Text>
                
            </Pressable> 
            {/* Boton prueba, el comentado es el bueno
              {/* <Pressable justifyContent={"center"} alignItems={"center"} w="80%" mx="10%" bg={colors.azul} h={12} 
                  borderRadius={50} my={4}   onPress={()=> pagarTest()}>
                      <Text bold fontSize={"lg"}  color={colors.blanco}> Pagar con stripe </Text>
                  
              </Pressable> */}
            </ScrollView>
            </Box>
            

            
           
          }
        </NativeBaseProvider>
    );
};

export default CheckOut;