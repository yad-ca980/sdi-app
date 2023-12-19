import React, { useState, useEffect } from 'react';
import {
    View,
    Center,
    FormControl,
    Input,
    Pressable,
    Icon,
    Text,
    ScrollView,
    Link,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProcesandoLoginL from './Componentes/procesando/ProcesandoLoginL.js';
import { useNavigation } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import URL from '../helper/URL.js';
import fetchPost from '../helper/fetchPost.js';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const Login = () => {
    const BASE_URL = URL.BASE_URL;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [correo, setCorreo] = useState('');
    const [inputCorreo, setInputCorreo] = useState(true);
    const [formCorreo, setFormCorreo] = useState(false);
    const [inputPassword, setInputPassword] = useState(true);
    const [formPassword, setFormPassword] = useState(false);
    const [password, setPassword] = useState('');
    const validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [id, setId] = useState();

    //Token Notificaciones
    const [expoPushToken, setExpoPushToken] = useState('');

    const registerForPushNotificationsAsync = async () => {
        let token;
        let token2;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } =
                    await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
              //  alert('Failed to get push token for push notification!');
                return;
            }
            //token funcional el expo y local
            // token = (await Notifications.getExpoPushTokenAsync()).data;
            //nuevo token con projectId
            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig.extra.eas.projectId,
            });
           // alert(token.data);
            console.log('token login: ', token.data);
            token2 = token.data;
            setExpoPushToken(token2);
        } else {
          //  alert('Must use physical device for Push Notifications');
        }

        return token2;
    };

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) =>
            setExpoPushToken(token)
        );

        // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        //   setNotification(notification);
        // });

        // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        //   console.log(response);
        console.log('useEffect token', expoPushToken);
    }, [expoPushToken]);
    //FIN NOTIFICACIONES

    const Validarform = async () => {
        if (correo == '' || !correo.match(validRegex)) {
            setFormCorreo(true);
            setInputCorreo(true);
        } else {
            setFormCorreo(false);
            setInputCorreo(false);
        }
        if (!password == null || password == '') {
            setInputPassword(true);
            setFormPassword(true);
            console.log('entro aqui true');
        } else {
            setFormPassword(false);
            setInputPassword(false);
            console.log('entro aqui false');
        }

        if (inputCorreo == false && inputPassword == false) {
            setLoading(true);

            console.log('inputPassword', password);

            var Form = new FormData();
            Form.append('correo', correo);
            Form.append('contrasenia', password);

            function miFuncion() {
                fetch('http://sdiqro.store/abdiel/Login/inicio_sesion', {
                    method: 'POST',
                    body: Form,
                })
                    .then((response) => response.json())
                    .then((resultado) => {
                        console.log('resultado', resultado);
                        if (resultado.status == true) {
                            setLoading(false);
                            console.log('login resultado', resultado);
                            storeData(resultado.idU);
                            sendToken(resultado.idU);
                            storeCarrito(resultado.idC.id);
                            storeSucursal(resultado.idC.idSuc);
                            console.log('token bienvenido log', expoPushToken);

                            //alert('Bienvenido ' + expoPushToken);



                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }],


                            });


                    }else {
                        setLoading(false);
                        alert(
                            
                            'Claves incorrectas o cuenta eliminada',
                          
                        
                        );
                        } 
                    })
                    .catch((error) => {
                        setLoading(false);
                        console.log('Error login T.T', error);
                    });
            }
            setTimeout(miFuncion, 1000);
        } else {
            setLoading(false);
        }
    };

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@id_user', value);
            let idAsync = await AsyncStorage.getItem('@id_user');
            console.log('exito async idU', idAsync);
        } catch (e) {
            console.log('error async', e);
        }
    };

    const storeCarrito = async (value) => {
        try {
            await AsyncStorage.setItem('@id_carrito', value);
            let idAsync = await AsyncStorage.getItem('@id_carrito');
            console.log('exito async idC', idAsync);
        } catch (e) {
            console.log('error async', e);
        }
    };

    const storeSucursal = async (value) => {
        try {
            await AsyncStorage.setItem('@id_sucursal', value);
            let idAsync = await AsyncStorage.getItem('@id_sucursal');
            console.log('exito async sucursal', idAsync);
        } catch (e) {
            console.log('error async', e);
        }
    };
    const [showPassword, setShowPassword] = useState(false);

    const sendToken = async (idU) => {
        const dataToken = new FormData();
        dataToken.append('idU', idU);
        dataToken.append('token', expoPushToken);
        console.log(dataToken);
        const url = `${BASE_URL}abdiel/perfil/send_token`;
        const options = {
            method: 'POST',
            body: dataToken,
        };
        const responseToken = await fetchPost(url, options);
        console.log('TOKEN?', responseToken);
        if (responseToken === true) {
            null;
        } else {
            alert('error en Notificaciones');
            null;
        }
        //setLoader(false);
    };

    return (
        <ScrollView mt={5}>
            <Center>
                {/*Email */}
                <FormControl
                    isInvalid={inputCorreo}
                    w='75%'
                    maxW='300px'
                >
                    <FormControl.Label>Email</FormControl.Label>
                    <Input
                        placeholder='Correo'
                        keyboardType='email-address'
                        onChangeText={(val) => {
                            setCorreo(val);
                        }}
                        autoCapitalize='none'
                        value={correo}
                        InputLeftElement={
                            <Icon
                                as={MaterialIcons}
                                name='email'
                                size={5}
                                color='#FF69B4'
                                m={3}
                            />
                        }
                        size={5}
                        color='muted.400'
                    />

                    {formCorreo != false ? (
                        <FormControl.ErrorMessage
                            leftIcon={
                                <MaterialIcons
                                    name='error-outline'
                                    size={24}
                                    color='#FF69B4'
                                />
                            }
                        >
                            El campo correo es obligatorio
                        </FormControl.ErrorMessage>
                    ) : null}
                </FormControl>
                {/*termina form Email*/}

                {/*Contaseña */}
                <FormControl
                    isInvalid={inputPassword}
                    w='75%'
                    maxW='300px'
                >
                    <FormControl.Label>Contraseña</FormControl.Label>
                    <Input
                        placeholder='Contraseña'
                        keyboardType='default'
                        onChangeText={(val) => {
                            setPassword(val);
                        }}
                        autoCapitalize='none'
                        value={password}
                        secureTextEntry={!showPassword}
                        type='password'
                        InputLeftElement={
                            <Icon
                                as={MaterialIcons}
                                name={showPassword ? 'visibility' : 'look'}
                                size={5}
                                color='#FF69B4'
                                m={3}
                                onPress={() => setShowPassword(!showPassword)}
                            />
                        }
                        size={5}
                        color='muted.400'
                    />
                    {formPassword == true ? (
                        <FormControl.ErrorMessage
                            leftIcon={
                                <MaterialIcons
                                    name='error-outline'
                                    size={24}
                                    color='#FF69B4'
                                />
                            }
                        >
                            El campo contraseña es obligatorio
                        </FormControl.ErrorMessage>
                    ) : null}
                </FormControl>
                {/*termina form Contaseña*/}

                <Pressable
                    onPress={() => {
                        Validarform();
                    }}
                >
                    <Center
                        bg='white'
                        h={'41px'}
                        w={'274px'}
                        my={4}
                        borderRadius={20}
                        borderWidth={'1px'}
                        borderColor={'#00BAEA'}
                    >
                        {loading == true ? (
                            <Text
                                Text
                                color={'#00BAEA'}
                            >
                                Validando crendeciales...
                            </Text>
                        ) : (
                            <Text
                                Text
                                color={'#00BAEA'}
                            >
                                Iniciar sesión
                            </Text>
                        )}
                    </Center>
                </Pressable>

                <Link
                    _text={{
                        fontSize: 'md',
                        _light: {
                            color: 'cyan.500',
                        },
                        color: 'cyan.300',
                    }}
                    href='http://sdiqro.store/ResetPass'
                    isUnderlined
                    _hover={{
                        _text: {
                            _light: {
                                color: 'cyan.600',
                            },
                            color: 'cyan.400',
                        },
                    }}
                >
                    ¿Olvidaste tu contraseña?
                </Link>
            </Center>

            {loading == true ? <ProcesandoLoginL /> : null}
        </ScrollView>
    );
};
export default Login;
