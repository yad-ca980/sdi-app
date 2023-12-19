import React, { useState, useEffect } from 'react';
import { Center, NativeBaseProvider, Text, Stack, Pressable, 
  Divider, Box, Image, HStack,  Icon, ScrollView, VStack, Select, CheckIcon} from "native-base";
import colors from '../colors';
import {  AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TextInput } from 'react-native';
import checkFav from '../helper/checkFav';
import agregarFav from '../helper/agregarFav';
import agregarFav_sin_agrupar from '../helper/agregarFav_sin_agrupar';
import checkFav_sin_agrupar from '../helper/checkFav_sin_agrupar';
import eliminarFav from '../helper/eliminarFav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import URL from '../helper/URL'; 
import fetchPost from '../helper/fetchPost';

const DetalleProducto_agrupa   = (props) => {




    
    const BASE_URL = URL.BASE_URL;
    const id = props.route.params.id;

    console.log("Soy el id del servicio",id);

    const desS = props.route.params.desS;
    const impreso = props.route.params.impreso;
    const image = props.route.params.image;
    const nombre = props.route.params.nombre;

    console.log("Soy el nombre del producto",nombre);
    const idU = props.route.params.idU;
    
    console.log("impreso PROPS ====", impreso);
    
    const [ idCarrito, setIdCarrito ] = useState(null);
    const [ unidad, setUnidad ] = useState("Cantidad");
    const [ idUnidad, setIdUnidad ] = useState(null)
    const [ comentario, setComentario ] = useState("");

    const getData = async () => {
        try {
        let value = await AsyncStorage.getItem('@id_carrito')
        if(value !== null) {
            setIdCarrito(value);
        }
        } catch(e) {
        console.log("error id carrito", e)
        }
    }

    const getDataSucursal = async () => {
        try {
        let value = await AsyncStorage.getItem('@id_sucursal')
        if(value !== null) {
            setSucursal(value);
        }
        } catch(e) {
        console.log("error id carrito", e)
        }
    }
    useEffect(() => {
      getDataSucursal()
      console.log("id User detalle producto", idU);
      
    }, [])


    
    
    useEffect(() => {
        getData();
      console.log("id carrito: ", idCarrito)
    }, [idCarrito])   
    
    const [loader, setLoader ]= useState(true);
    //SELECTOR DE FAVORITO
    const [ selected, setSelected] = useState(false);

    const handleIconPress = (id, idU) => {

      console.log("Soy id del servicio",id);

      console.log("Soy el id del usuario",idU);

      if (selected===true){
          eliminarFav(idU, id);

          setSelected(false);
      }else{
          agregarFav_sin_agrupar(idU, id);
          setSelected(true);}
    };

    const checked = async()=>{
      let state = await checkFav_sin_agrupar(idU, id);
      setSelected(state);
  }

   useEffect( ()=>{
      checked();
   },[selected]);

    //inicia funciones para contar
    const [ count, setCount ] = useState(0);
   // console.log("count fuera: ", count)

   useEffect(() => {
    if (count < 1){
      console.log("es menor a 1");
      
    }else{
      console.log("es mayor a 1");
      
    }
  }, [count]);
    const [atributos, setAtributos] = useState([]);
    const getAtributos = async()=>{
        const dataAtributo = new FormData();
        dataAtributo.append("idS", id);
        const url = `${BASE_URL}abdiel/atributos/get_producto_sin_agrupa`
        const options = {
        method:'POST',
        body: dataAtributo
        };

        console.log("Soy a id del servicio",dataAtributo);

        const responseAtributo = await fetchPost(url, options);
        if (responseAtributo !== null){
         // console.log(responseAtributo);
          getData();
            setAtributos(responseAtributo);
        }else{
            setAtributos([]);
        }
    }

    useEffect(() => {
        getAtributos();
        //console.log("atributos", atributos)
        //console.log("Impreso PROPS: ", impreso)
    }, []);

   const [producto, setProducto ] = useState(null);
   const [ productoSelect, setProductoSelect] = useState(null);
   const [inventario, setInventario ] = useState(null);
   const [ sucursal, setSucursal] = useState(null)


   const getDetalleProducto = async(itemValue)=>{
        const dataAtributo = new FormData();
        dataAtributo.append("idS", itemValue);
        dataAtributo.append("impreso", impreso);
        const url = `${BASE_URL}abdiel/atributos/get_producto_detalle_sin_agrupar`
        const options = {
        method:'POST',
        body: dataAtributo
        };
        const responseAtributo = await fetchPost(url, options);
        if (responseAtributo !== null){
          //  console.log("GET RESPOSE FULL : ", responseAtributo);
           // console.log("GET DETALLE PRODUCTO : ", responseAtributo.producto[0]);
            setProducto(responseAtributo.producto[0]);
            //console.log(" !!! NOMBRE UNNIDAS !!!",responseAtributo.producto[0].nombreUni );
            
            setUnidad(responseAtributo.producto[0].nombreUni)
            setIdUnidad(responseAtributo.producto[0].idUnidad)
            //console.log("GET INVENTARIO : ", responseAtributo.inventario);
            //console.log("¿¿Impreso???==",responseAtributo.mensaje)
            setInventario(responseAtributo.inventario)
        }else{
            setProducto([]);
        }
        
    }


    useEffect(() => {
      // console.log("producto selecccionado", productoSelect)
      
        
    }, [productoSelect]);

    const AtributoSelector = (props) => { 
        
        return(
         
                <Box ml={"20%"} mr="10%">
                    <Select selectedValue={productoSelect} minWidth="300" accessibilityLabel={productoSelect} placeholder={productoSelect} _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="4" />
                    }} mt={1} onValueChange={ (itemValue) => {{setProductoSelect(itemValue); getDetalleProducto(itemValue); }}
                      
                        
                       }>
                    { atributos.length>0 ?
                                    atributos.map( (atributo, index)=>{
                                        return(
                                            <Select.Item key={index}
                                            label={`${atributo.nombreS}`}
                                            value={atributo.idS} />
                                        )
                                    } )
                    :  <Select.Item label="Revisa tu conexion a internet" value={null} />}
                    

                    
                    
                    </Select>
                    
            </Box>
         
        
        )
    }

    /*INVENTARIO SWITCH*/ 
    const InventarioRender = ()=>{
        switch (true) {
            case inventario === null:
              return (
                <Text>Selecciona una opcion para ver el inventario de agrupacion T.T</Text>
              )
            case Array.isArray(inventario) && inventario.length > 0:
                return (
                    <Center>
                    <Box >
                        <Select selectedValue={sucursal} w={56} accessibilityLabel={sucursal} placeholder={"Selecciona la sucursal"} _selectedItem={{
                        bg: "#FE308E", 
                        endIcon: <CheckIcon size="8" color={"white"} />
                        }} mt={1} onValueChange={ (itemValue) => {setSucursal(itemValue)}
                          
                            
                           }>
                        { inventario.length>0 ?
                                        inventario.map( (sucursal, index)=>{
                                            return(
                                                <Select.Item key={index}
                                                label={sucursal.nombreSuc + ". Existencia: " + parseInt(sucursal.inventario)}
                                                value={sucursal.idSuc} />
                                            )
                                        } )
                        :  <Select.Item label="Revisa tu coneccion a internet" value={null} />}
                        </Select>
                        </Box>
                        {/* <Text>{ "id atributo: " +productoSelect}</Text> */}
                    </Center>
        
                  )
            case Array.isArray(inventario) && inventario.length === 0:
                return (
                    <Text>Por el momento no contamos con el producto</Text>
                  )
            default:
                return (
                    <Text>Error, intentalo nuevamente</Text>
                  )
          }
        
    }


    const agregarCar = async()=>{
        const BASE_URL= URL.BASE_URL;
            
        const dataCar = new FormData();
        dataCar.append("idC", idCarrito);
        dataCar.append("idS", productoSelect );
        dataCar.append("count", count);
        dataCar.append("idSuc", sucursal );
        dataCar.append("impreso", impreso);
        dataCar.append("precio",precioFinal );
        dataCar.append("comentario", comentario);
        
        const url = `${BASE_URL}abdiel/carrito/add_item`
        const options = {
          method:'POST',
          body: dataCar
        };
        const res = await fetchPost(url, options);
        //console.log("agrega Carrito", res);
        if (res=== true){
            return (
                Alert.alert('Producto agregado al carrito', 'Se acaban de agregar productos a tu carrito', [
                    {
                        text: 'Ir al carrito',
                        onPress: () => props.navigation.navigate("Carrito") //props.navigation.navigate("Welcome"),
                      
                    },
                    {
                        text: 'Ir al inicio',
                    onPress: () => props.navigation.navigate("Home"),
    
                    }
                    
                  ])
            );
        }else{
            return (
                Alert.alert('Error', 'Verifica tu conexión a internet y prueba más tarde', [
                    {
                        text: 'Registrarme o iniciar sesión',
                        onPress: () => console.log("ok") //props.navigation.navigate("Welcome"),
                      
                    },
                    {
                        text: 'Volver',
                    onPress: () => console.log('Cancel Pressed'),
    
                    }
                    
                  ])
            );
        }
        
       // 
        
        
      }


    const agregarCarrito=()=>{


        switch (true) {

            case (count === 0 ):
                Alert.alert('Error de producto', 'Selecciona una cantidad mayor a 0', [
                    {
                      text: 'Volver',
                      onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    }
                    
                  ]);
                break;

            case (productoSelect===null):
                Alert.alert('Error de producto', 'Selecciona el producto antes de agregarlo a tu carrito.', [
                    {
                      text: 'Volver',
                      onPress: () => props.navigation.navigate("Welcome"),
                      style: 'cancel',
                    }
                    
                  ]);
                break;
            case (sucursal===null):
                Alert.alert('Error de sucursal', 'Selecciona la sucursal antes de agregarlo a tu carrito.', [
                    {
                        text: 'Volver',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    }
                    
                    ]);
                break;
            case (idCarrito===null):
                Alert.alert('No se encontro tu carrito', 'Favor de registrarse o iniciar sesión para agregar productos a tu carrito', [
                    {
                        text: 'Registrarme o iniciar sesión',
                        onPress: () => props.navigation.navigate("Welcome", { status:true}),
                      
                    },
                    {
                        text: 'Volver',
                    onPress: () => console.log('Cancel Pressed'),

                    }
                    
                  ]);
            break;
            case (btn):
                //console.log("!!!Compra entra!!!")
                agregarCar();




            break;

            case (btn===false):
                Alert.alert('Cantidad incorrecta', 'Escribe solo números enteros.', [
               
                    {text: 'OK', onPress: () => console.log("boton ok")},
                  ]);
            break;  
            
        
            default:
               // console.log("????")
                break;
        }
        
    }

    const [ nombrePrecio, setNombrePrecio ] = useState(null);
    const [ precioFinal , setPrecioFinal  ] = useState(0.00);

    const [ subtotal, setSubtotal ] = useState(0.00);
    useEffect(() => {
        //console.log("===Producto===", producto);
       
    }, [producto])
    
    // const CalculaPrecio=()=>{
    //     //P = precio, C=cantidad
       
    //    let precio= producto.precioS;
    //    let nombrePrecio= "mayoreo";

       

    // }
    useEffect( ()=>{
      //  console.log("count", count)
        if(producto!==null){
            
            notNumber();
        }else{
            null
        }

  
    },[count]);
    
    const notNumber=()=>{
        if (isNaN(count) ){
          // console.log("COUNT NO ES NUMERO !!!!! ",count )
           
        }else{
          //  console.log("COUNT SIII ES NUMERO !!!!! ",count )
            switch (true) {
                case (  count >=1 && count < producto.cantidadMedioMayoreo):
                    setNombrePrecio("normal")
                    setPrecioFinal(producto.precioS)
                    setSubtotal((count*producto.precioS))
                    break;
                case (count >=producto.cantidadMedioMayoreo && count < producto.cantidadMayoreo):
                    setNombrePrecio("medio mayoreo")
                    setPrecioFinal(producto.precioMedioMayoreo)
                    setSubtotal((count*producto.precioMedioMayoreo))
                    break;
                case (count >=producto.cantidadMayoreo):
                    setNombrePrecio(" mayoreo")
                    setPrecioFinal(producto.precioMayoreo)
                    setSubtotal((count*producto.precioMayoreo))
                    break;
                case ( count < 1 && count >0):
                    setPrecioFinal(producto.precioS)
                    setSubtotal(1 * producto.precioS)
                case ( count == 0):
                        setPrecioFinal(producto.precioS)
                        setSubtotal(1 * producto.precioS)
                        setBtn(false)
                        alert("La cantidad debe ser mayor a 0")
                default:
                    console.log("DEFAULT BREACK ")
                    break;
            }

        }
    }

    useEffect(() => {
    //  console.log(subtotal)
    //  console.log(precioFinal)
    //  console.log(nombrePrecio)
    }, [subtotal])

    const [ btn, setBtn ]= useState(false)
    const NUMERIC_PATTERN = /^[0-9]*$/;
    const toInteger=(value)=> {
        let check = NUMERIC_PATTERN.test(value);
      //  console.log("@@@@@ es numero?", check)
        if (check) {
            const integer = parseInt(value);
            
            if (integer !== 0){
                setBtn(true);
                setCount(integer)
            }else{
                setBtn(false);
                setCount(1)
                alert("la cantidad debe ser mayor a 0")
            }
            
        } else {
            Alert.alert('Cantidad incorrecta', 'Escribe solo números enteros.', [
               
                {text: 'OK', onPress: () => console.log("boton ok")},
              ]);
          
          
        }
      }

    const NUMERIC_PATTERN_DECIMAL = /^(\d+)?(\.\d+)?$/;

    const toDecimal=(value)=> {
    let check = NUMERIC_PATTERN_DECIMAL.test(value);
  //  console.log("@@@@@ es numero?", check)
    if (check) {
        const decimal = parseFloat(value);
        setCount(decimal);
        setBtn(true);
    } else {
        Alert.alert('Cantidad incorrecta', 'Escribe un número decimal válido.', [
        { text: 'OK', onPress: () => console.log("boton ok") },
        ]);
    }
    }
    const [ alto, setAlto] = useState(0);
    const [ ancho, setAncho] = useState(0);


    const toDecimalAlto=(value)=> {
        let checkAlto = NUMERIC_PATTERN_DECIMAL.test(value);
    //    console.log("@@@@@ es numero?", checkAlto)
        if (checkAlto) {
            const decimal = parseFloat(value);
            setAlto(decimal);
          //  setBtn(true);
        } else {
            Alert.alert('Cantidad incorrecta', 'Escribe un número decimal válido.', [
            { text: 'OK', onPress: () => console.log("boton ok") },
            ]);
        }
        }


    function toDecimalAncho(value) {
        let checkAncho = NUMERIC_PATTERN_DECIMAL.test(value);
      //  console.log("@@@@@ es numero?", checkAncho)
        if (checkAncho) {
            const decimal = parseFloat(value);
            setAncho(decimal);
            //setBtn(true);
        } else {
            Alert.alert('Cantidad incorrecta', 'Escribe un número decimal válido.', [
            { text: 'OK', onPress: () => console.log("boton ok") },
            ]);
        }
        }




    const handleMetroCuadrado= (alto, ancho)=>{
        let checkAlto = NUMERIC_PATTERN_DECIMAL.test(alto);
        let checkAncho = NUMERIC_PATTERN_DECIMAL.test(ancho);
        if (checkAlto && checkAncho){
            let m2 = alto * ancho;
        //    console.log("METROS CUADRADOS:", m2);
            setCount(m2)
            let mensaje = `Ancho: ${ancho}m.  Alto: ${alto}m.` 
        //    console.log("mensaje:  ", mensaje)
            setComentario(mensaje);
            setBtn(true);
            
        }else{
            Alert.alert('Medidas incorrecta', 'Escribe valores de medida validos.', [
                { text: 'OK', onPress: () => console.log("boton ok") },
                ]);
        }
     }

     useEffect(() => {
      //  console.log("UseEffect alto", alto);
      //  console.log("UseEffect ancho", ancho);
        if(alto>0 && ancho>0){
           
            handleMetroCuadrado(alto, ancho);
        }else{
            null
        }
    }, [alto, ancho]);
    const renderCantidad = () => {
        switch (idUnidad) {
          case 4:
            return (
              <Stack direction={"row"} space={3}>
                <HStack
                  my={1}
                  bg={colors.blanco}
                  borderRadius={10}
                  borderWidth={2}
                  shadow={6}
                  w={40}
                  borderColor={colors.azul}
                >
                  <Center pl={2}>
                    <Text bold>Alto (m): </Text>
                  </Center>
      
                  <Center w={20}>
                    <TextInput
                      value={alto}
                      onChangeText={(text) => toDecimalAlto(text)}
                      keyboardType="numeric"
                    />
                  </Center>
                </HStack>
      
                <HStack
                  my={1}
                  bg={colors.blanco}
                  borderRadius={10}
                  borderWidth={2}
                  shadow={6}
                  w={40}
                  borderColor={colors.azul}
                >
                  <Center pl={2}>
                    <Text bold>Ancho (m): </Text>
                  </Center>
      
                  <Center w={20}>
                    <TextInput
                      value={ancho}
                      onChangeText={(text) => toDecimalAncho(text)}
                      keyboardType="numeric"
                    />
                  </Center>
                </HStack>
              </Stack>
            );
      
          case 5:
            return (
              <Stack direction={"row"} space={3}>
                <HStack
                  my={1}
                  bg={colors.blanco}
                  borderRadius={10}
                  borderWidth={2}
                  shadow={6}
                  w={56}
                  borderColor={colors.azul}
                >
                  <Center pl={2}>
                    <Text bold>{unidad}: </Text>
                  </Center>
      
                  <Center w={20}>
                    <TextInput
                      value={count}
                      onChangeText={(text) => toDecimal(text)}
                      keyboardType="numeric"
                    />
                  </Center>
                </HStack>
              </Stack>
            );
      
          default:
            return (
              <Stack direction={"row"} space={3}>
                <HStack
                  my={3}
                  py={3}
                  bg={colors.blanco}
                  borderRadius={10}
                  shadow={6}
                  w={"93%"}
                 
                >
                  <Center pl={2}>
                    <Text bold>{unidad}: </Text>
                  </Center>
      
               
                    <TextInput
                      value={count}
                    
                      onChangeText={(text) => toInteger(text)}
                      keyboardType="numeric"
                      style={{padding: 3,   color:"black", borderColor:colors.azul, borderWidth:1 , borderRadius:10,  width:150, marginLeft:5}}
                    />
                 
                </HStack>
              </Stack>
            );
        }
      };
 
    return(
        <NativeBaseProvider >
            <ScrollView bg={colors.blanco} flex={1}>
             {/**Titulo */}
              <Center mt={1}>
                  <Text bold fontSize={18}>{producto===null ? nombre : producto.nombreS}</Text>
              </Center>
              {/**IMAGEN */}
              <Center   w="90%" mx="5%" >
                  <Image source={{
                  uri: `http://sdiqro.store/static/imgServicios/${ producto!== null ? producto.image_url : image}`
                  }} alt="Alternate Text" size="xl" />
              </Center>
              <Text bold ml={"10%"}>Selecciona tu producto:</Text>
              {/** ATRIBUTOS SELECT */}
                          <AtributoSelector />
                  {/** color, talla y precio */}
              {producto !== null ? 
              (
                <>
              <Text bold ml={"10%"}>Precios:</Text>
                <Stack direction={"row"}  ml={"20%"} mr={3} >
                    <VStack flex={1} mr="3%" mt={1} p={2} px={4} bg={colors.grisclaro} borderRadius={10} shadow={6} mb={2}>
                        
                    
                        <Text>Normal: {producto !==null ? ("$" + producto.precioS) : ""} </Text>
                        <Text>A partir de {producto.cantidadMedioMayoreo} {unidad}: {producto !==null ? ("$" + producto.precioMedioMayoreo) : ""} </Text>
                        <Text>A partir de {producto.cantidadMayoreo} {unidad}:  {producto !==null ? ("$" + producto.precioMayoreo) : ""} </Text>
                    </VStack>
                </Stack>
                </>
              )  :
                <Text textAlign={"center"} my={3}>Selecciona tipo de producto para ver su precio </Text> 
                }


              <Divider w="90%" mx="5%" bg={colors.azul} h={0.5}/>
              {/** STOCK */}
              <Text bold ml={"10%"} mt={1}>Stock:</Text>
                <Stack direction={"column"} p={3}  ml="20%" mr={5} bg={colors.grisclaro} borderRadius={10} shadow={6} mb={2}> 
                    <InventarioRender />
                </Stack>
         
               <Divider w="90%" mx="5%" bg={colors.azul} h={0.5}/>
                {/** DESCRIPCION */}
                <Box  mt={1} mb={1} >
                    <Text ml="10%"  bold>Descripción:</Text>
                    <Text mr={5} ml="20%">{ producto !== null ? producto.desS :  desS}</Text>
                </Box> 

                {/**BOTONES DEL FINAL */}
                <Stack direction={"column"} >
                    
                    {/**BOTON CANTIDAD  */}
                    {productoSelect !== null && sucursal !==null ?  
                       <Box ml="20%"> 
                       {renderCantidad()}
                        {idUnidad === 4 && (
                        <Text ml="10%" mt={2} bold>Metros cuadrados: {count.toFixed(2)}</Text>
                        )} 
                        </Box>
                    : <Text mx={5} borderWidth={1} p={2} borderRadius={10} my={3} borderColor={colors.azul}>Selecciona el producto y la sucursal para ingresar la cantidad</Text> }
                      {/**FIN BOTON CANTIDAD */}
                      <Stack direction={"column"} ml={"20%"} mr={"5%"} borderRadius={10} borderWidth={1} shadow={6}  borderColor={colors.rosa} bg={colors.blanco} py={1}>
                              <Text fontSize={"md"} bold mx={4}>Precio {nombrePrecio}: ${precioFinal}</Text>
                              <Text fontSize={"md"} bold mx={4}>Subtotal: ${subtotal.toFixed(2)}</Text>
                      </Stack>
                    

                        {/**BOTON AGREGAR */}
                    <Stack direction={"column"} justifyContent="space-around" mt={2} ml="20%" mr="5%">   

                    {/**FAVORITO */}
                    <Pressable onPress={()=>handleIconPress(idS, idU)}  borderWidth={1} borderRadius={10} borderColor={colors.rosa} shadow={7}  bgColor={colors.blanco} mb={4} p={2} >
                        <Stack direction={"row"} >
                            <Center px={1}>
                                { selected===true ?
                                <Icon as={AntDesign} name="heart"    size={6} color={colors.rosa}/> :
                                <Icon as={AntDesign} name="hearto"    size={6} />
                            }
                            </Center>
                            <Center>Agregar a favoritos</Center>
                        </Stack>
                      </Pressable>
                      <Pressable bg={colors.azul} borderRadius={10} shadow={6} mb={10}  p={2} onPress={()=>agregarCarrito()} >
                          <Stack direction={"row"} >
                              <Center p={1}>
                                  <Icon as={MaterialCommunityIcons} name="cart-plus" size={6}    color="white"/>
                              </Center>
                              <Center>
                                  <Text bold color={"white"} >Agregar al carrito</Text>
                              </Center>
                          </Stack>
                      </Pressable>
                      
                    </Stack>
                </Stack>
            </ScrollView>
        </NativeBaseProvider>
    );
};
export default DetalleProducto_agrupa;