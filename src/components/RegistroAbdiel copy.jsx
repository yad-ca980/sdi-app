import React, { useState,useEffect } from "react";
import {TouchableOpacity} from "react-native"
import {  Ionicons,MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons'; 
import { Icon, Text, Center,ScrollView, View, Input,FormControl, NativeBaseProvider, Checkbox, Box, Select, CheckIcon, HStack} from "native-base";

import colors from "../colors";

const RegistroAbdiel = ()=>{
    //Obtener sucursales
    const [sucursales, setSucursales] = useState();
    const getSucursales= ()=>{
        const sucursal = `http://sdiqro.store/api/SucursalesGet/getSucursalesQro`
        fetch(sucursal)
        .then(response => response.json())
        .then((resultado)=> {
            setSucursales(resultado.Registro)
        })
        .catch((error) => {
             console.log("error",error)
        })
    }
    useEffect(() => {
        getSucursales();
               console.log(sucursales)
    },[]);

    //values 
    const [agree, setAgree]                           = useState(false);
    const [usuario, setUsuario]                       = useState('');
    const [apellido, setApellido]                     = useState('');
    const [celular, setCelular]                       = useState('');
    const [sucursal, setSucursal]                     = useState('');
    const [correo, setCorreo]                         = useState('');
    const [password, setPassword]                     = useState('');
    const [passwordConfirmar, setPasswordConfirmar]   = useState('');

    const ChangeTC = () => {
        if(agree == true){
            setAgree(false)
        }else{
            setAgree(true)
        }
    }

    const validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log("sucursal", sucursal);
   
    const Validarform =  () => {
        if (usuario.length>3 && apellido.length>3 && celular.length===10 && correo.length>3  && password===passwordConfirmar){
             var Form = new FormData();
                   Form.append("nombre",       usuario)
                   Form.append("apellidos",    apellido)
                   Form.append("telefono",     celular)
                   Form.append("sucursal",     sucursal)
                   Form.append("correo",       correo)
                   Form.append("contrasenia",  password)

             
             fetch("http://sdiqro.store/api/Registro/registro_usuario",
                {method: 'POST',
                 body: Form
                })
                .then(response => response.json())
                .then((resultado)=> {
                    console.log("resultado",resultado)
                    if(resultado.resultado == true){
                        alert("Registro exitoso")
                    }else{
                        alert("Error en registro, vuelva a intentarlo")
                    }
                })
                .catch((error) => {
                    console.log("errorjj",error)
                })
            }else{
                alert("Error, verifica tus datos")
            }
    
    }

  

    return(
        <NativeBaseProvider>
        <ScrollView>
            <Center>

             {/*Nombre*/}
            <FormControl  w="75%" maxW="300px">
                <FormControl.Label>Nombre(s)</FormControl.Label>
                <Input
                    placeholder="Nombre(s)"
                    keyboardType='default'
                    onChangeText={(val) => {setUsuario(val)}}
                    autoCapitalize='none'
                    value={usuario}
                    InputLeftElement={<Icon as={Ionicons} name="person" size={5} color="#FE308E" m={3}/>} size={5} color="muted.400" />
            </FormControl>
             {/*Termina form nombre */}
            

             {/*Apellido */}
            <FormControl w="75%" maxW="300px">
                <FormControl.Label>Apellido(s)</FormControl.Label>
                <Input 
                    placeholder="Apellido(s)"
                    keyboardType='default'
                    onChangeText={(val) => {setApellido(val)}}
                    autoCapitalize='none'
                    value={apellido}
                    InputLeftElement={<Icon as={Ionicons} name="person" size={5} color="#FE308E" m={3}/>} size={5} color="muted.400"/>

            </FormControl>
             {/*termina form apellido */}
             

            {/*CELULAR */}
            <FormControl  w="75%" maxW="300px">
                <FormControl.Label>Celular</FormControl.Label>

                <Input 
                    placeholder="Celular"
                    keyboardType='number-pad'
                    onChangeText={(val) => {setCelular(val)}}
                    autoCapitalize='none'
                    maxLength={10}
                    value={celular}
                    InputLeftElement={<Icon as={MaterialCommunityIcons} name="cellphone" size={5} color="#FE308E" m={3} mr={5}/>} size={5} color="muted.400" />
 
            </FormControl>
            {/*termina form celular */}


            {/*Sucursal */}
            <HStack>
                <FormControl.Label mt={3} mx={3}>Sucursal: </FormControl.Label>
                <Box maxW="300">
                    <Select selectedValue={sucursal} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={itemValue => setSucursal(itemValue)}>
                        <Select.Item label="Matriz" value={9} />
                        <Select.Item label="Plaza Río" value={10} />
                        <Select.Item label="San Juan del Río" value={11} />
                        
                    </Select>
                </Box>
            </HStack>
            {/*termina form sucursal*/}

            {/*Email */}
            <FormControl  w="75%" maxW="300px">
                <FormControl.Label>Email</FormControl.Label >
                <Input

                    placeholder="Correo"
                    keyboardType='email-address'
                    onChangeText={(val) => {setCorreo(val)}}
                    autoCapitalize='none'
                    value={correo} 
                    InputLeftElement={<Icon as={MaterialIcons} name="email" size={5} color="#FE308E" m={3}/>} size={5} color="muted.400" />
            </FormControl>
             {/*termina form Email*/}
            
            {/*Contaseña */}
            <FormControl  w="75%" maxW="300px">
                <FormControl.Label>Contraseña</FormControl.Label>
                <Input 
                     placeholder="Contraseña"
                     keyboardType='default'
                     onChangeText={(val) => {setPassword(val)}}
                     autoCapitalize='none'
                     type="password"
                     value={password} 
                    InputLeftElement={<Icon as={MaterialIcons} name="lock" size={5} color="#FE308E" m={3}/>} size={5} color="muted.400" />
            </FormControl>
            
            <FormControl  w="75%" maxW="300px">
                <FormControl.Label>Confirmar contraseña</FormControl.Label>
                <Input
                    type="password"
                    placeholder="Confirmar contraseña"
                    keyboardType='default'
                    onChangeText={(val) => {setPasswordConfirmar(val)}}
                    autoCapitalize='none'
                    value={passwordConfirmar}  
                    InputLeftElement={<Icon as={MaterialIcons} name="lock" size={5} color="#FE308E" m={3}/>} size={5} color="muted.400" />
            </FormControl>
            {/*termina form Contaseña*/}
            

             <View flexDirection={"row"}>   
                <Center>
                    <Checkbox
                    style={{ marginTop: 20}}
                    accessibilityLabel="Condiciones"
                    value={agree}
                    onChange={() => ChangeTC()}
                    color={agree ? "#FE308E" : colors.rosa}
                    />
                    <Text>
                            He leído y acepto los terminos y condiciones
                    </Text>
                </Center> 
             </View>

            <TouchableOpacity style={{paddingTop: 20}}  onPress={() => { agree===true ? Validarform() : alert("Debes aceptar terminos y condiciones") }} >
                <Center bg={agree == false ? ("#6C6C6C"):("#FE308E")} h={"41px"} w={"274px"} borderRadius={20} > 
                    <Text color={"white"}>Registrate</Text></Center>
                </TouchableOpacity>
            </Center>
    </ScrollView>
    </NativeBaseProvider>
    )
} 
export default RegistroAbdiel;