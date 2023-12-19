import React, { useState, useEffect } from 'react';
import { Center, NativeBaseProvider, Text, Stack, Pressable, 
  Divider, Box, Image, HStack,  Icon, ScrollView, VStack, Select, CheckIcon} from "native-base";
import colors from '../colors';
import {  AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TextInput } from 'react-native';
import checkFav from '../helper/checkFav';
import agregarFav from '../helper/agregarFav';
import eliminarFav from '../helper/eliminarFav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Button, TouchableOpacity } from 'react-native';
import URL from '../helper/URL'; 
import fetchPost from '../helper/fetchPost';

const DetalleProducto   = (props) => {


        console.log("Entre A DETALLE DE Producto!!!!   soy detalle de los   PROPS ",props);




    const BASE_URL = URL.BASE_URL;
    const id = props.route.params.id;

    console.log("Soy el id del servicio    ",id);


    const desS = props.route.params.desS;
    const impreso = props.route.params.impreso;

    console.log("Soy el id de los impresos   ",impreso);

    const image = props.route.params.image;

    console.log("Sooy los proops de la imagenn  de buenoo   UwU    ",image);

    const idAS = props.route.params.idAS;


    console.log("Soy el id del IDAS    ",idAS);

    const nombre = props.route.params.nombre;
    const idU = props.route.params.idU;


    
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

    const handleIconPress = (idAS, idU, id) => {
      if (selected===true){
          eliminarFav(idU, idAS, id);

          setSelected(false);
      }else{
          agregarFav(idU, idAS, id);
          setSelected(true);}
    };

    const checked = async()=>{
      let state = await checkFav(idU, idAS, id);
      setSelected(state);
  }

   useEffect( ()=>{
      checked();
   },[selected]);

    //inicia funciones para contar
    const [ count, setCount ] = useState(0);


   console.log("count fuera RESET:  ---> - ", count)

   useEffect(() => {
    if (count < 1){
      console.log("es menor a 1");
      
    }else{
      console.log("es mayor a 1");
      
    }
  }, [count]);
    const [atributos, setAtributos] = useState([]);

    console.log("Soy el atributos   bien PERRONES    ",atributos);


    const getAtributos = async()=>{

        console.log("Entre a getAtributos      :v");

        console.log("Soy los atributos   ");

        const dataAtributo = new FormData();
        dataAtributo.append("idS",id);
        dataAtributo.append("idAS", idAS);

        console.log("Soy data atributo   ",idAS);
        

        console.log("Soy el id del servicio    ",id);
        const url = `${BASE_URL}abdiel/atributos/get_producto_atributos`
        const options = {
        method:'POST',
        body: dataAtributo
        };
        console.log("Soy las opciones del atributo   ", options.body );


        const responseAtributo = await fetchPost(url, options);

        console.log("Soy el responseAtributo    ",responseAtributo);
        if (responseAtributo !== null){
         // console.log(responseAtributo);

            console.log("entre en 1 de atributos       ---> MIRAME");
          getData();
            setAtributos(responseAtributo.productos);
        }else{

            console.log("Entre en 2 de atributos   ")
            setAtributos([]);
        }

    }

    useEffect(() => {
        getAtributos();
        getPreciosAdicional();
        //console.log("atributos", atributos)
        //console.log("Impreso PROPS: ", impreso)
    }, []);

   const [producto, setProducto ] = useState(null);

   const [ productoSelect, setProductoSelect] = useState(null);

   const [promocionalesSelect, setpromocionalesSelect ] = useState(null);

   const [inventario, setInventario ] = useState(null);


   console.log("Soy el inventario y debo ser cantidad mayor a inventario     ", inventario);


   const [ sucursal, setSucursal] = useState(null)

    const [selectedBasePrecio, setSelectedBasePrecio] = useState(0.00);

   const [precios_bases_select, setprecios_bases_select ] = useState(null);



   const [precioAdicional, setprecioAdicional] = useState([]);



   const getPreciosAdicional = async(id)=>{

        console.log("LLEGUE A PRECIOS ADICIONALESSSSS");



        console.log("soy el preecios adicional que voy    ",id);

   


        const preciosBases = new FormData();

        preciosBases.append("idS", id);

        const url = `${BASE_URL}abdiel/atributos/atributos_seleccionados`
        const options = {
            method:'POST',
            body : preciosBases
        };
        console.log(options.body);

        const responsePreciosBases = await fetchPost(url, options);

        if( responsePreciosBases !== null){


           

            setprecioAdicional(responsePreciosBases.precios_bases);

        }else{
            setprecioAdicional([]);
        }





    }

    const [TotalNuevo, setTotalNuevo] = useState(0.00);

    console.log("Soy el precio nuevo TOTAL   TOTAL   ",TotalNuevo);

    const [SubTotalNuevo, setSubtotalNuevo] = useState(0.00);

    console.log("Soy el subtotal nuevo   ", SubTotalNuevo);

    
    console.log("Soy tipo de dato     ", typeof precioAdicional);
    console.log("Soy los atributos que voy a sumar precios adicionales    ", precioAdicional);


    const Suma_atributos = (itemValue) => {

        console.log("!!!!!!!!SUMA DE ATRIBUTOS!!!!!!!!!!!!!!!!!");

        console.log("Soy el atributo de select de atribnutos nuevooo y soy el dinero      ",itemValue);


        let Precio_atributo = parseFloat(itemValue);

        console.log("Soy el nuevo precio de atributo   ",Precio_atributo);

        console.log("Soy un nuevo atributo y soy el tipo de datoooooooo  ", typeof Precio_atributo);

        console.log("Soy el nuevo total     ", TotalNuevo);


        console.log("Soy el nuevo subtotal    ",SubTotalNuevo);


        console.log("Soy el contador  que entro en Suma Atributos     ", count);


        let atributo_total = (parseFloat(TotalNuevo) + parseFloat(Precio_atributo));


        console.log("Soy el atributo total     tiene que salir 1477   ",atributo_total);


        let atributo_subtotal = (parseFloat(atributo_total) * parseFloat(count));

        console.log("Soy el precio de atributos subtotal     ",atributo_subtotal);



        setPrecioFinal(atributo_total);



        setSubtotal(atributo_subtotal);



    }


   const getDetalleProducto = async(itemValue)=>{

        const dataAtributo = new FormData();
        console.log("Soy el de dataAtributo  ", dataAtributo);

        dataAtributo.append("idS", itemValue);
        dataAtributo.append("impreso", impreso);
        const url = `${BASE_URL}abdiel/atributos/get_producto_detalle`
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
            setgetPreciosDinamicos(responseAtributo.precios)
            //console.log("¿¿Impreso???==",responseAtributo.mensaje)
            setInventario(responseAtributo.inventario)
            setCategoria_nuevo(responseAtributo.categoria);

        }else{                    
            setProducto([]);
        }

    }

    const [ Categoria_nuevo, setCategoria_nuevo] = useState(null)

    console.log("Soy la nueva categoria de nuevo     " , Categoria_nuevo);

    


    const getPrecioNuevo = async(productoSelect, count)=>{

        console.log("!!!!!!!!!''''ENTRE A getPrecioNuevo '''!!!!");

        console.log("Soy el producto seleccionado  ::  ",productoSelect);
        console.log("Soy el contador   : ", count);

        console.log("Soy el inventario dentro de nuevo precio    ",inventario);


            if (!inventario || inventario.length === 0) {

              Alert.alert(
                'POR EL MOMENTO NO CONTAMOS CON EL PRODUCTO',
                'Lo sentimos :c',
                [

                    {
                        text: 'Aceptar',
                        onPress: () => {
                            console.log("Se valido el innventario     ");
                        },

                    },
                ]

            );
            }


        const cantidad_inventario = parseFloat(inventario[0].inventario);



        console.log("Soy la cantidad de inventario MIRAME AQUI MORRRO    ",cantidad_inventario);



        if(count == 0 || count < 1 || count < 0){

            console.log("Entre en el if de count menos de 0");

            Alert.alert(
              'CANTIDAD ERROR',
              'La cantidad debe ser mayor a 0',
              [
                {
                  text: 'Aceptar',
                  onPress: () => {
                    console.log("Se presionó aceptar y debe quitarse la alerta");
                  },
                },
              ]
            );
        }



        else if(count > cantidad_inventario){

                Alert.alert(
                    'No hay suficiente inventario',
                    'La cantidad debe ser igual o menor al inventario',
                    [

                        {
                            text: 'Aceptar',
                            onPress: () => {
                                console.log("No hay suficiente inventario para comprar");

                            },

                        },  
                    ]



                );


        }


        else{


        const dataPreciosDinamicos = new FormData();

        dataPreciosDinamicos.append("idS",productoSelect);
        dataPreciosDinamicos.append("count",count);
        dataPreciosDinamicos.append("impreso",impreso);

        const url = `${BASE_URL}abdiel/atributos/getPrecios_Dinamicos`
        const options = {
            method:'POST',
            body: dataPreciosDinamicos
        };

        console.log("Soy las opciones de precio NUEVO  ",options.body);

        const responsePreciosDinamicos = await fetchPost(url, options);

        console.log("Soy el responsePreciosDinamicos    ",responsePreciosDinamicos);


            if(responsePreciosDinamicos !== null){

                console.log("Soy el responsePreciosDinamicos   o :   0 : ", responsePreciosDinamicos.precios);
                setTotalNuevo(responsePreciosDinamicos.total);
                setSubtotalNuevo(responsePreciosDinamicos.subtotal);
                setSubtotal(responsePreciosDinamicos.subtotal);
                setPrecioFinal(responsePreciosDinamicos.total);


            }else{
                setTotalNuevo([]);
                setSubtotalNuevo([]);
                setSubtotal([]);
                setPrecioFinal([]);

            }





        }

        


    }








        const getPromocionalesNuevo = async(itemValue)=>{


            const dataPromocionales = new FormData();

            dataPromocionales.append("idS",productoSelect);

            const url = `${BASE_URL}abdiel/atributos/get_promocionales`
            const options = {
                method:'POST',
                body: dataPromocionales
            };

            console.log("Soy las opciones de precio NUEVO  ",options.body);

            const responsePromocionales = await fetchPost(url, options);

           


            if(responsePromocionales !== null){

                console.log("Soy el responsePreciosDinamicos   o :   0 : ", responsePromocionales.promocionales);
                setNuevosPromocionales(responsePromocionales.promocionales);


            }else{
                setNuevosPromocionales([]);

            }


        }



    const [NuevosPromocionales, setNuevosPromocionales] = useState([]);

    console.log("Soy el nuevos promocionales       .....    ",NuevosPromocionales);

    




    const [getPreciosDinamicos , setgetPreciosDinamicos ] = useState(null);
   



    const [NuevoPrecioDinamico, setNuevoPrecioDinamico] = useState(0.00);

     

    {

        /*
               function PreciosDinamicos(id,precio,cont){


        console.log("SOMOS Y SEREMOS LOS PRECIOS DINAMICOS POR FAVOR YA QUEDA NETA");

        console.log("EstOY tRIsTe  :_C");
        

        let idServicio = id;

        console.log("Soy el id del servicio  ",idServicio);

        let precios = precio;

        console.log("Soy el precios de dinamicos  ",precios);


        let contador = cont;

        console.log("Soy el contador del producto   ", count);

        let precios_dinamicos_todos = getPreciosDinamicos;



        for(let i = 0; i < precios_dinamicos_todos.length; i++){

            let elementoActual = precios_dinamicos_todos[i];


            if(count == elementoActual.cantidad && count <= precios_dinamicos_todos[i + 1].cantidad){


                    console.log("Elemento correspondiente   ", elementoActual);

                  

                 
                 break;




            }else{

                console.log("Entre en nivel 2");

                console.log("Por que no encontro la cantidad     :v");


                setNuevoPrecioDinamico(parseFloat(producto.precioS) + (producto.precioImpresion !== null ? parseFloat(producto.precioImpresion) : 0));
;
            }

        }



    }


        */


    }

  
    const [atributo_pago, setatributo_pago] = useState(null);


    console.log("Soy la opcion de los atributos de paga     _Z>    <Z>   ", atributo_pago);


    const [nombre_promocional, set_nombre_promos] = useState(null);

    console.log("SOY EL NUEVO PRECIO DINAMICO uWu", nombre_promocional);

    console.log("Soy PRRecios dinamicosss    ", NuevoPrecioDinamico);





    useEffect(() => {
      // console.log("producto selecccionado", productoSelect)
      
        
    }, [productoSelect]);
    

    const AtributoSelector = (props) => { 
        
        return(
         
                <Box ml={"20%"} mr="10%">
                    <Select selectedValue={productoSelect} minWidth="300" accessibilityLabel={productoSelect} placeholder={productoSelect} _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="4" />
                    }} mt={1} onValueChange={ (itemValue) => {{setProductoSelect(itemValue); getDetalleProducto(itemValue); getPreciosAdicional(itemValue);getPromocionalesNuevo(itemValue); }}
                      
                        
                       }>
                    { atributos.length>0 ?
                                    atributos.map( (atributo, index)=>{
                                        return(
                                            <Select.Item key={index}
                                            label={`${atributo.atributos ? `${atributo.atributos} - ${atributo.nombreS}` : atributo.nombreS}`}
                                            value={atributo.idS} />
                                        )
                                    } )
                    :  <Select.Item label="Revisa tu conexion a internet" value={null} />}
                    

                    
                    
                    </Select>
                    
            </Box>
         
        
        )
    }

        const Select_atributos = (props) => {
          return (
            <Box ml={"20%"} mr="10%">
              <Select
                selectedValue={precios_bases_select}
                minWidth={300}
                accessibilityLabel={precios_bases_select}
                placeholder={precios_bases_select}
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size="4" />,
                }}
                mt={1}
                onValueChange={(itemValue) => {
                  setprecios_bases_select(itemValue);
                  getPreciosAdicional(id);
                  setatributo_pago(itemValue);
                  Suma_atributos(itemValue);
                  renderCantidad();
                 

                }}
              >
                {precioAdicional && precioAdicional.length > 0 ? (
                  precioAdicional.map((basePrecio) => (
                    <Select.Item
                      key={basePrecio.idAtrD}
                      label={`${basePrecio.nombreAtrD} - ${basePrecio.precio}`}
                      value={basePrecio.precio}
                    />
                  ))
                ) : (
                  <Select.Item label="No hay atributos disponibles" value={null} />
                )}
              </Select>
            </Box>
          );
        };

        const Promocionales = (props) => {
        return (
            <Box ml={"20%"} mr="10%">
              <Select
                selectedValue={promocionalesSelect}
                minWidth={300}
                accessibilityLabel={promocionalesSelect}
                placeholder={promocionalesSelect}
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size="4" />,
                }}
                mt={1}
                onValueChange={(itemValue) => {
                  //setprecios_bases_select(itemValue);
                  //getPreciosAdicional(id);
                  //renderCantidad();
                   set_nombre_promos(itemValue);                        

                }}
              >
                {NuevosPromocionales && NuevosPromocionales.length > 0 ? (
                  NuevosPromocionales.map((promos) => (
                    <Select.Item
                      key={promos.idAtrD}
                      label={`${promos.nombreAtrD}`}
                      value={promos.idAtrD}
                    />
                  ))
                ) : (
                  <Select.Item label="No promocionales" value={null} />
                )}
              </Select>
            </Box>
          );


        };


   
    /INVENTARIO SWITCH/ 
    const InventarioRender = ()=>{
        switch (true) {
            case inventario === null:
              return (
                <Text>Selecciona una opcion para ver el inventario</Text>
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
                        :  <Select.Item label="Revisa tu conexion a internet" value={null} />}
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
        dataCar.append("promocionales", nombre_promocional  !== null ? nombre_promocional : null);

        
        const url = `${BASE_URL}abdiel/carrito/add_item`
        const options = {
          method:'POST',
          body: dataCar
        };

        console.log("Soy las opciones de agregar a carrito    ",options.body);



       
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

    console.log("Precio Final ", precioFinal);








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
            
            //notNumber();
        }else{
            null
        }

  
    },[count]);
    
    const notNumber=()=>{
        if (isNaN(count) ){
          // console.log("COUNT NO ES NUMERO !!!!! ",count )
           
        }else{

            switch (true) {

                case( producto.precioMedioMayoreo <= 0 && count >= 1 ):

                    console.log("Entre 1     UwU");
               
                    setPrecioFinal(parseFloat(producto.precioS)  + parseFloat(precios_bases_select !== null ? parseFloat(precios_bases_select*count) : 0) );
                    setSubtotal((count * producto.precioS) + parseFloat(precios_bases_select !== null ? parseFloat(precios_bases_select*count) : 0));


                    break;
                case (  count >=1 && count < producto.cantidadMedioMayoreo):

                    console.log("Entre 2   UwU");




                    setNombrePrecio("normal")
                    setPrecioFinal(parseFloat(producto.precioS) + parseFloat(precios_bases_select !== null ? parseFloat(precios_bases_select*count) : 0));
                    setSubtotal((count*producto.precioS) + parseFloat(precios_bases_select !== null ? parseFloat(precios_bases_select*count) : 0));
                    break;
                case (count >=producto.cantidadMedioMayoreo && count < producto.cantidadMayoreo):

                    console.log("Entre en 3    UwU");
                    setNombrePrecio("medio mayoreo")

                    setPrecioFinal(parseFloat(producto.precioMedioMayoreo) + parseFloat(precios_bases_select !== null ? parseFloat(precios_bases_select) : 0));
                    setSubtotal((count*producto.precioMedioMayoreo) + parseFloat(precios_bases_select !== null ? parseFloat(precios_bases_select*count) : 0));
                    break;
                case (count >=producto.cantidadMayoreo):

                    console.log("Entre en 4 UwU");

                    console.log("Soy el precio dinamico   ", NuevoPrecioDinamico);


                    setNombrePrecio(" mayoreo")

                    //setPrecioFinal(NuevoPrecioDinamico);

                    setPrecioFinal(parseFloat(NuevoPrecioDinamico) + parseFloat(precios_bases_select !== null ? parseFloat(precios_bases_select) : 0 ));

                    //setSubtotal(NuevoPrecioDinamico);

                    setSubtotal(parseFloat(count*NuevoPrecioDinamico) + parseFloat(precios_bases_select !== null ? parseFloat(precios_bases_select*count) : 0));

                    break;
                case ( count < 1 && count >0):

                    console.log("Entre en 5  UwU");
                    setPrecioFinal(producto.precioS)
                    setSubtotal(1 * producto.precioS)
                    break;
                case ( count == 0):


                        console.log("Entre en   6  UwU");

                        setPrecioFinal(producto.precioS)
                        setSubtotal(1 * producto.precioS)
                        setBtn(false)
                        alert("La cantidad debe ser mayor a 0")
                        break;
                default:

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
                //setCount(1)
                //alert("la cantidad debe ser mayor a 0")
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
                  uri: `http://sdiqro.store/static/imgServicios/${image}`
                  }} alt="Alternate Text" size="xl" />
              </Center>
              <Text bold ml={"10%"}>Selecciona tu producto:</Text>
              {/** ATRIBUTOS SELECT */}
                          <AtributoSelector />

                <Text bold ml={"10%"}>Selecciona precio adicional</Text> 

                            <Select_atributos  />  

                <Text bold ml={"10%"}>Selecciona promocionales</Text>
                            {Categoria_nuevo == null || Categoria_nuevo == ""  || Categoria_nuevo == 0

                            ?
                             
                                <Text textAlign={"center"} my={3}>No es producto de tipo promocion </Text> 



                            : <Promocionales />



                            }




                          
                          { /*<Precios_bases / >  */}
                  {/** color, talla y precio */}
              {producto !== null ?
              (
                <>


              <Text bold ml={"10%"}>Precios:</Text>
                <Stack direction={"row"}  ml={"20%"} mr={3} >
                    <VStack flex={1} mr="3%" mt={1} p={2} px={4} bg={colors.grisclaro} borderRadius={10} shadow={6} mb={2} style={{
                        height: 120, // Ajusta la altura según sea necesario
                            width: 700,  // Ajusta el ancho según sea necesario


                    }}>
                        
                    
                        <Text>Normal: {producto !==null ? ("$" + producto.precioS) : ""}</Text>
                        <Text>
                              Precio con impresión : {producto && producto.precioS !== null && producto.precioImpresion !== null
                                ? `$${(parseFloat(producto.precioS) + parseFloat(producto.precioImpresion)).toFixed(2)}`
                                : "No disponible"}
                        </Text>



                        {

                            /*
                            <Text>A partir de {producto.cantidadMedioMayoreo} {unidad}: {producto !==null ? ("$" + producto.precioMedioMayoreo) : ""} </Text>


                            */
                        }

                                {getPreciosDinamicos !== null && getPreciosDinamicos.length > 0 && (
                              <Text>
                                {getPreciosDinamicos.map((item, index) => (
                                  <Text key={index}>
                                    {index > 0 && <Text>{'\n'}</Text>}
                                        <Text>
                                             A partir de {item.cantidad} {unidad}: ${item.precio} precio {parseFloat(item.precio) + parseFloat(producto.precioImpresion)}
                                        </Text>
                                  </Text>
                                ))}
                              </Text>
                            )}

                            <Text>{'\n'}</Text>

                              {

                                /*


                            {cantidadPreciosMedioMayoreo !== null && cantidadPreciosMedioMayoreo.length > 0 && (
                              <Text>
                                {cantidadPreciosMedioMayoreo.map((item, index) => (
                                  <Text key={index}>
                                    {index > 0 && <Text>{'\n'}</Text>}
                                        <Text>
                                            A partir de {item.cantidad} {unidad}: ${item.precio}
                                        </Text>
                                  </Text>
                                ))}
                              </Text>
                            )}



                                */

                            }
                            




                       
                          

                            { /*<Text> A partir de {cantidadPreciosMedioMayoreo[0]?.cantidad} {unidad} : {cantidadPreciosMedioMayoreo !== null ? ("$" + cantidadPreciosMedioMayoreo[0]?.precio) : ""}</Text>

                            */}



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

                <Box mt={1} mb={1}>




                    

                </Box>

                {/**BOTONES DEL FINAL */}
                <Stack direction={"column"} >
                    
                    {/**BOTON CANTIDAD  */}
                    {productoSelect !== null && sucursal !==null ?  
                       <Box ml="20%"> 
                       {renderCantidad()}
                        {idUnidad === 4 && (
                        <Text ml="10%" mt={2} bold>Metros cuadrados: {count.toFixed(2) !== 0 ? count.toFixed(2) : 0}</Text>


                        )}
                        <TouchableOpacity
                          onPress={() => getPrecioNuevo(productoSelect, count)}
                          style={{
                            backgroundColor: 'blue',
                            padding: 10,
                            borderRadius: 10,
                            shadow: 6,
                            padding: 2,
                            marginBottom: 4,
                          }}
                        >
                          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                            Aceptar
                          </Text>
                        </TouchableOpacity>

                        </Box>
                    : <Text mx={5} borderWidth={1} p={2} borderRadius={10} my={3} borderColor={colors.azul}>Selecciona el producto y la sucursal para ingresar la cantidad</Text> }
                      {/**FIN BOTON CANTIDAD */}
                      <Stack direction={"column"} ml={"20%"} mr={"5%"} borderRadius={10} borderWidth={1} shadow={6}  borderColor={colors.rosa} bg={colors.blanco} py={1}>
                              <Text fontSize={"md"} bold mx={4}>Precio {nombrePrecio}: ${precioFinal}</Text>
                              <Text fontSize={"md"} bold mx={4}>Subtotal: ${subtotal.toFixed(2)}</Text>
                              

                              

                              { /*<Text fontSize={"md"} bold mx={4}>Nuevo Precio Dinamico: ${TotalNuevo}</Text> */}
                            


                              { /*  <Text fontSize={"md"} bold mx={4}>SubTotal Dinamico : ${SubTotalNuevo.toFixed(2)}</Text>*/}
                      </Stack>
                    

                        {/**BOTON AGREGAR */}
                    <Stack direction={"column"} justifyContent="space-around" mt={2} ml="20%" mr="5%">   

                    {/**FAVORITO */}
                    <Pressable onPress={()=>handleIconPress(idAS, idU, id)}  borderWidth={1} borderRadius={10} borderColor={colors.rosa} shadow={7}  bgColor={colors.blanco} mb={4} p={2} >
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
export default DetalleProducto;