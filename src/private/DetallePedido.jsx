import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, ScrollView, Text , Box, Center,  Divider} from "native-base";
import colors from '../colors';
import CheckOutComponent from '../components/CheckOutComponent';
import fetchPost from '../helper/fetchPost';
import URL from '../helper/URL';
import Loader from '../components/Loader';


const DetallePedido = (props) => {
    const BASE_URL= URL.BASE_URL
    const idVenta = props.route.params.id;
    const total = props.route.params.tot;
    const sucursal = props.route.params.suc;
    console.log("id venta:", idVenta)
    const [ pedidos, setPedidos ] = useState([])
    const [load, setLoad ] = useState(true)
    const getPedidos = async()=>{
        const dataPedido= new FormData();
        dataPedido.append("idVenta", idVenta);
        const url = `${BASE_URL}abdiel/pedidos/detalle_venta`
        const options = {
          method:'POST',
          body: dataPedido
        };
        const res = await fetchPost(url, options);
        if (res !== null){
           console.log("pedidos GET: ", res)
           setPedidos(res)
           setLoad(false)
          // setLoad(false);
          }else{
            null
          }
        //console.log("res", res.data);
        
      }


      useEffect(() => {
       
        getPedidos()
        console.log("pedidos:", pedidos)
       
      }, [])



    return(
        <NativeBaseProvider>
          { load ?  <Loader/> : 
            <ScrollView flex={1} bg={colors.blanco} showsVerticalScrollIndicator={true} persistentScrollbar={true} >
          
            
           <Box  >  
             {
             
                pedidos.map( (p, index)=>{
                    return(
                    <CheckOutComponent
                    key={index}
                    nombre={p.nombreS}
                    image={p.image_url}
                    cantidad={p.Cantidad}
                    precio={p.PrecioUnitario}
                    subtotal={p.subtotal}
                    />
                    )
                } )
             }  
            
                
                
            </Box>
            
            <Divider bg={colors.azul} borderRadius={100} mt={4} h={1} w="80%" alignSelf={"center"} my={1}/>
            <Center h="70" w="85%"  mx={7} >  
                <Text fontSize={22} bold>Total con IVA: ${total}</Text>
                <Text fontSize={18} >Recolección: Sucursal {sucursal} </Text>
            </Center>

            </ScrollView>
           
          }
        </NativeBaseProvider>
    );
};

export default DetallePedido;