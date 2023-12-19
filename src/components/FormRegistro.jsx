import React, { useState,useEffect } from "react";
import {TouchableOpacity} from "react-native"
import {  Ionicons,MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons'; 
import { Icon, Text, Center,ScrollView, View, Input,FormControl, Box, Select, CheckIcon, Pressable, Link} from "native-base";
import CheckBox from "expo-checkbox";
import { URL } from "./API/useFetch";
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';



const FormRegistro = (props) => {

    const [sucursales, setSucursales] = useState([]);
    const navigation =useNavigation();
   
    useEffect(() => {
                const sucursal = `${URL.BASE_URL}SucursalesGet/getSucursalesQro`
                fetch(sucursal)
                .then(response => response.json())
                .then((resultado)=> {
                    setSucursales(resultado.Registro)
                })
                .catch((error) => {
                    console.log("error",error)
                })
    },[]);

    //values 
    const [ show, setShow] = useState(false);
    const [ show2, setShow2] = useState(false);
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

    const [formNombre,   setFormNombre]                       = useState(false);
    const [formApellido, setFormApellido]                     = useState(false);
    const [formCelular, setFormCelular]                       = useState(false);
    const [formSucursal, setFormSucursal]                     = useState(false);
    const [formCorreo, setFormCorreo]                         = useState(false);
    const [formPassword, setFormPassword]                     = useState(false);
    const [formPasswordConfirmar, setFormPasswordConfirmar]   = useState(false);
    const [checkFormBothpass, setFormcheckBothpass]           = useState(false);
    const validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const Validarform =  (s) => {
            if(usuario == ''){
                setFormNombre(true)
            }else{
                setFormNombre(false)
            }
            if (apellido == '' || apellido.length <= 0){
                setFormApellido(true)
            }else{
                setFormApellido(false)
            }
    
            if(celular == '' || (celular.length == 10 || celular.length <= 10)){
                setFormCelular(true)
            }else{
                setFormCelular(false)
            }
            if(sucursal == null || sucursal == ''){
                setFormSucursal(true)
            }else{
                setFormSucursal(false)
            }
            if(correo == '' || !correo.match(validRegex)){
                setFormCorreo(true)
            }else{
                setFormCorreo(false)
            }
            if(!password == null || password.length < 4  ){
                setFormPassword(true)
            }else{
                setFormPassword(false)
            }
            if(!passwordConfirmar == null || passwordConfirmar.length > 5 ){
                // console.log("pass", passwordConfirmar)
                setFormPasswordConfirmar(true)
                if(passwordConfirmar != password){
                    setFormcheckBothpass(true)
                    // console.log("no son iguales s")
                }else{
                    setFormcheckBothpass(false)
                    // console.log("son iguales s")
                }
            }else{
                setFormPasswordConfirmar(false)
                setAgree(false)
            }

            if((inputNombre == false && 
                inputApellido == false && 
                inputTelefono == false && 
                inputSucursal == false && 
                agree == true &&
                inputCorreo == false && inputPassword == false && inputPasswordConfirmar == false))
            {
                setBandera(false)
                console.log("inputNombre", usuario)
                console.log("inputApellido", apellido)
                console.log("inputTelefono", celular)
                console.log("inputSucursal", sucursal)
                console.log("inputCorreo", correo)
                console.log("inputPassword", password)
                console.log("inputPasswordConfirmar", inputPasswordConfirmar)

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
                        Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión', [
                            
                            // {text: 'Ir a inicio', onPress: () => navigation.reset({
                            //     index: 0,
                            //     routes: [{ name: 'Home' }],
                            // })},
                            {
                              text: 'Iniciar sesión', onPress: () => navigation.replace("Welcome", { status: true })
                            },
                          ]);
                    
                          
                          
                    }else{
                        
                        Alert.alert('Error en registro', `${resultado.mensaje}`, [
                            
                            {text: 'OK', onPress: () => console.log("ok error")
                            },
                          ]);
                    }
                })
                .catch((error) => {
                    console.log("errorjj",error)
                })

               
            }
            else{
                alert("Faltan campos por llenar")
                console.log("2")
                setBandera(false)

            }
        
        
    }

  
    const [inputNombre, setInputNombre]     = useState(true);
    const [inputApellido, setInputApellido] = useState(true);
    const [inputTelefono, setInputTelefono] = useState(true);
    const [inputSucursal, setInputSucursal] = useState(true);
    const [inputCorreo, setInputCorreo]     = useState(true);
    const [inputPassword, setInputPassword] = useState(true);
    const [inputPasswordConfirmar, setInputPasswordConfirmar] = useState(true);
    
    

    const [bandera, setBandera] = useState(false)


      useEffect(() => {
       // console.log("sucursal", sucursal)
       // console.log("Agree",agree)
        if(usuario.length <= 2){
            setInputNombre(true)
          
           
        }else{
            setInputNombre(false)
            

        }
        if(apellido.length <= 2){

           
            setInputApellido(true)
        }else{
            setInputApellido(false)

        }
        if(celular.length == 10 && celular.length <= 10 ){
          
            setInputTelefono(false)
        }else{
            setInputTelefono(true)

        
        }
        if(sucursal == null || sucursal == ''){
            
            setInputSucursal(true)
        }else{
            setInputSucursal(false)

           
        }
        if(!correo.match(validRegex)){
           
            setInputCorreo(true)
        }else{
            setInputCorreo(false)

           
        }
        if((!password == null || password.length <= 4 )){
         
            setInputPassword(true)
        }else{
            setInputPassword(false)

          
        }
           
        if(!passwordConfirmar == null || passwordConfirmar.length <= 4 ){
          
            setInputPasswordConfirmar(true)
        
        }else{
            setInputPasswordConfirmar(false)
           
            
          
        }
        if((passwordConfirmar != password)){
           
           
            setInputPasswordConfirmar(true)
       // console.log("no son iguales")
        }else {
          
            if(passwordConfirmar == '' || passwordConfirmar == ''){
                setInputPasswordConfirmar(true)
            }else{
                console.log("son iguales")
                setInputPasswordConfirmar(false)
            }
        }



        //true  es error
        //false es correcto


    }, [usuario,apellido,celular,sucursal,correo,password,passwordConfirmar,bandera,inputNombre,inputApellido,inputTelefono,inputSucursal,inputCorreo,inputPassword,inputPasswordConfirmar,agree]);



 return (
  
  <>
    <ScrollView>
            <Center>

             {/*Nombre*/}
            <FormControl isInvalid={inputNombre} w="75%" maxW="300px">
                <FormControl.Label>Nombre(s)</FormControl.Label>
                <Input
                    placeholder="Nombre(s)"
                    keyboardType='default'
                    onChangeText={(val) => {setUsuario(val)}}
                    autoCapitalize='none'
                    value={usuario}
                    InputLeftElement={<Icon as={Ionicons} name="person" size={5} color="#FE308E" m={3}/>} size={5} color="muted.400" />
                {formNombre == true ? (  <FormControl.ErrorMessage leftIcon={<MaterialIcons name="error-outline" size={24} color="red" />}>
                    El campo nombre es obligatorio
                </FormControl.ErrorMessage>):(null)}
                {inputNombre == true ? (  <FormControl.ErrorMessage leftIcon={<MaterialIcons name="error-outline" size={24} color="red" />}>
                    El nombre debe tener al menos 3 caracteres
                </FormControl.ErrorMessage>):(null)}
            </FormControl>
             {/*Termina form nombre */}
            

             {/*Apellido */}
            <FormControl isInvalid={inputApellido}  w="75%" maxW="300px">
                <FormControl.Label>Apellido(s)</FormControl.Label>
                <Input 
                    placeholder="Apellido(s)"
                    keyboardType='default'
                    onChangeText={(val) => {setApellido(val)}}
                    autoCapitalize='none'
                    value={apellido}
                    InputLeftElement={<Icon as={Ionicons} name="person" size={5} color="#FE308E" m={3}/>} size={5} color="muted.400"/>

                {formApellido == true ? (  <FormControl.ErrorMessage leftIcon={<MaterialIcons name="error-outline" size={24} color="red" />}>
                    El campo apellido es obligatorio
                </FormControl.ErrorMessage>):(null)}  

                {inputApellido == true ? (  <FormControl.ErrorMessage leftIcon={<MaterialIcons name="error-outline" size={24} color="red" />}>
                    El apellido debe tener al menos 3 caracteres
                </FormControl.ErrorMessage>):(null)} 
            </FormControl>
             {/*termina form apellido */}
             

            {/*CELULAR */}
            <FormControl isInvalid={inputTelefono} w="75%" maxW="300px">
                <FormControl.Label>Celular</FormControl.Label>

                <Input 
                    placeholder="Celular"
                    keyboardType='number-pad'
                    onChangeText={(val) => {setCelular(val)}}
                    autoCapitalize='none'
                    value={celular}
                    maxLength={10}
                    
                    InputLeftElement={<Icon as={MaterialCommunityIcons} name="cellphone" size={5} color="#FE308E" m={3} mr={5}/>} size={5} color="muted.400" />

                {formCelular == true ? (  <FormControl.ErrorMessage leftIcon={<MaterialIcons name="error-outline" size={24} color="red" />}>
                    El campo celular es obligatorio
                </FormControl.ErrorMessage>):(null)}  
                {inputTelefono == true ? (  <FormControl.ErrorMessage leftIcon={<MaterialIcons name="error-outline" size={24} color="red" />}>
                    El  celular debe tener 10 dígitos
                </FormControl.ErrorMessage>):(null)}  
            </FormControl>
            {/*termina form celular */}


            {/*Sucursal */}
            <FormControl isInvalid={inputSucursal} w="75%" maxW="300px" pt={1}>
                <FormControl.Label mt={3} mx={3}>Sucursal: </FormControl.Label>
                <Box maxW="300">
                    <Select selectedValue={sucursal} minWidth="200" accessibilityLabel="Escoge una sucursal" placeholder="Choose Service" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={itemValue => setSucursal(itemValue)}>
                        { sucursales.length>0 ? (
                      sucursales.map( (sucursal, index)=>{
                                        return(
                                            <Select.Item key={index}
                                            label={sucursal.nombreSuc} 
                                            value={sucursal.idSuc} />
                                        )
                                    } )
                                    ): null}
                        
                    </Select>
                </Box>
                {formSucursal  == true ? (  <FormControl.ErrorMessage leftIcon={<MaterialIcons name="error-outline" size={24} color="red" />}>
                    El campo sucursal es obligatorio
                </FormControl.ErrorMessage>):(null)} 
                </FormControl>
            {/*termina form sucursal*/}

            {/*Email */}
            <FormControl isInvalid={inputCorreo} w="75%" maxW="300px">
                <FormControl.Label>Email</FormControl.Label >
                <Input

                    placeholder="Correo"
                    keyboardType='email-address'
                    onChangeText={(val) => {setCorreo(val)}}
                    autoCapitalize='none'
                    value={correo} 
                    InputLeftElement={<Icon as={MaterialIcons} name="email" size={5} color="#FE308E" m={3}/>} size={5} color="muted.400" />
           
                {formCorreo != false ? (<FormControl.ErrorMessage leftIcon={<MaterialIcons name="error-outline" size={24} color="red" />}>
                    El campo correo es obligatorio 
                </FormControl.ErrorMessage>):(null)}  
                
              
                
                

            </FormControl>
             {/*termina form Email*/}
            
            {/*Contaseña */}
            <FormControl isInvalid={inputPassword} w="75%" maxW="300px">
                <FormControl.Label>Contraseña</FormControl.Label>
                <Input 
                     placeholder="Contraseña"
                     keyboardType='default'
                     onChangeText={(val) => {setPassword(val)}}
                     autoCapitalize='none'
                     value={password} 
                     type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
                     <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                   </Pressable>}         

                    InputLeftElement={<Icon as={MaterialIcons} name="lock" size={5} color="#FE308E" m={3}/>} size={5} color="muted.400" />
                 {formPassword == true ? (  <FormControl.ErrorMessage leftIcon={<MaterialIcons name="error-outline" size={24} color="red" />}>
                    El campo contraseña es obligatorio
                 </FormControl.ErrorMessage>): null}  

            </FormControl>
            
            <FormControl isInvalid={inputPasswordConfirmar} w="75%" maxW="300px">
                <FormControl.Label>Confirmar contraseña</FormControl.Label>
                <Input
                    placeholder="Confirmar contraseña"
                    keyboardType='default'
                    onChangeText={(val) => {setPasswordConfirmar(val)}}
                    autoCapitalize='none'
                    value={passwordConfirmar} 
                    type={show2 ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow2(!show2)}>
                    <Icon as={<MaterialIcons name={show2 ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                  </Pressable>}   
                    InputLeftElement={<Icon as={MaterialIcons} name="lock" size={5} color="#FE308E" m={3}/>} size={5} color="muted.400" />
                    

                {formPasswordConfirmar == true ? (<FormControl.ErrorMessage leftIcon={<MaterialIcons name="error-outline" size={24} color="red" />}>
                    El campo contraseña es obligatorio
                 </FormControl.ErrorMessage>):(null)}  


            </FormControl>
            {/*termina form Contaseña*/}




            <FormControl isInvalid={inputPasswordConfirmar} w="75%" maxW="300px">
                {checkFormBothpass != true ? (  null):(<FormControl.ErrorMessage leftIcon={<MaterialIcons name="error-outline" size={24} color="red" />}>
                    Las contraseñas deben ser iguales
             </FormControl.ErrorMessage>)}  


            </FormControl>
            

             <View flexDirection={"row"}>   
                   <Center><CheckBox
                        style={{ marginTop: 20}}
                        value={agree}
                        onValueChange={() => ChangeTC()}
                        color={agree ? "#00BAEA" : undefined}
                        />
                        <Link href="https://drive.google.com/file/d/1Tm_xggjn9gZXc0NeIeagmw0T-nynd2Wo/view?usp=drive_link">
                                He leído y acepto los terminos y condiciones
                        </Link>
                        </Center> 
             </View>


            <TouchableOpacity style={{paddingTop: 20}} disabled={bandera}  onPress={() => Validarform()} >
            <Center bg={bandera == true ? ("#6C6C6C"):("#FE308E")} h={"41px"} w={"274px"} borderRadius={20} > 
                <Text color={"white"}>Registrate</Text></Center>
            </TouchableOpacity>



            </Center>
    </ScrollView>
    </>
    
  )
}




export default FormRegistro;