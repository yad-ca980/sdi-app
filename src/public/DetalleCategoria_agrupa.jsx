import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, TouchableOpacity, View } from 'react-native';
import { NativeBaseProvider, Box, Text, Stack, Pressable, Center, ScrollView, VStack, HStack } from 'native-base';
import colors from '../colors';
import { FontAwesome5, Entypo } from '@expo/vector-icons'; 
import Loader from '../components/Loader';
import SwiperList from '../components/SwiperList';
import ProductoComponent3 from '../components/ProductoComponent3';
import ScrollSubCategorias from '../components/ScrollSubCategorias';
import fetchPost from '../helper/fetchPost';
import URL from '../helper/URL';
import { useState, useEffect } from 'react';
import Categoria from '../components/Categoria';

export default function DetalleCategoria_agrupa(props) {
 
  const estado = props.route.params.estado;
  const urlCat = props.route.params.url;
  const idU = props.route.params.user;
  console.log("idU categoria", idU);
  console.log("link" , urlCat);
  console.log("ESTADO ===", estado);
  const [ loader, setLoader ] = useState(true);

  const [ categorias, setCategorias ] = useState([]);
//PRODUCTOS MAPEO
  const [ productos, setProductos ] = useState([]);
   const getProductos= async()=>{
    const url = urlCat
    const options = {
      method:'POST',
    };
    const res = await fetchPost(url, options);
    setProductos(res.data);
    console.log("res", res.data);
  }
  useEffect(() => {
    getProductos();
    console.log(productos)
  }, [])
// fin PRODUCTOS MAPEO

  const getCategorias= async()=>{

    const url = "http://sdiqro.store/abdiel/Productos/categorias"
    const options = {
      method:'POST',
    };
    const res1 = await fetchPost(url, options);
    setCategorias(res1.data);
    console.log("Categorias", res1.data);
    setLoader(false);
    
  }
  useEffect(() => {
    getCategorias();
    console.log(categorias)
  }, [])

  const detalleCategorias= (idCS, impreso, nombreCS) => {
    props.navigation.navigate("DetalleSubCategoria", {
      idCS: idCS,
      impreso: impreso,
      nombreCS: nombreCS,

    });
  };

  
  return (
    <NativeBaseProvider >
      {loader===true?  <Loader/> : 
      <Box flex={1} bg={colors.grisbg}>
        <Box h={"20%"}>
            <SwiperList/>
        </Box>
        
        <Box ml={3} my={3}>
            <Text bold fontSize={'md'}> Productos sin agrupacion</Text>
        </Box>
        {/*  <Center w={"95%"} ml={3}>

       <ScrollView horizontal={true} >
            { categorias.map( (item,index) => {
              return(
                <Pressable mx={1} key={index} onPress={()=>detalleCategorias(item.idCS, estado, item.nombreCS)}>
                <Categoria  image={item.imagen} titulo={item.nombreCS}  idCS={item.idCS} impreso={estado} />
                </Pressable>
              )
            }
            )
            }
        </ScrollView>  Ctrl + k + c  ---> Para comentar
          
         


        </Center>*/}

        <Center> 
         
          <ScrollView horizontal={false} h="72%" style = {{
              marginBottom : 30
          }} >
                <HStack space={4} mr={2}>
                    <VStack >
                    {productos.map((item, index) => {

                      console.log("SOY PRODUCTOS -->",productos);
        // Si el índice es par, comienza una nueva fila
                        if (index % 2 === 0) {
                        return (
                          <ProductoComponent3 
                          key={index} nombre={item.nombreS} id={item.idS}
                          precio={item.precioS} 
                          image={item.image_url}
                          impreso={estado}
                          idU={idU}/>
                        );
                        }
                    })}


                    </VStack>
                    

                    <VStack>
                    {productos.map((item, index) => {
        // Si el índice es par, comienza una nueva fila
                        if (index % 2 !== 0) {
                        return (
                          <ProductoComponent3 
                          key={index} nombre={item.nombreS} 
                          id={item.idS}
                          precio={item.precioS} 
                          image={item.image_url}
                          idU={idU}/>
                        );
                        }
                    })}

                    </VStack>
                </HStack>

           </ScrollView>
           </Center>
        
      </Box>
      }
    </NativeBaseProvider>
  );
}