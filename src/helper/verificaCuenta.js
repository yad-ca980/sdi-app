import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';



const verificaCuenta = async () => {

const navigationRef = useNavigationContainerRef();

    try {
      const value = await AsyncStorage.getItem('@id_user')
      if(value !== null) {
        console.log("idU async: ", value);
        return value
      }else{
        return (
            Alert.alert(
                'Debes estar registrado e iniciar sesión para ver tu perfil',
                "",
                
                [
                  {
                    text: 'Iniciar sesion / Registrarse',
                onPress: () => { navigationRef.navigate('CuentaMenu');},
                  },
        
                  { text: 'Volver',  onPress: () => { navigationRef.navigate('CuentaMenu');}  },
                ],
                { cancelable: false },
              )
        )
      }
    } catch(e) {
      console.log("error async home", e);
      Alert.alert(
        'Debes estar registrado e iniciar sesión para ver tu perfil',
        "",
        
        [
          {
            text: 'Iniciar sesion / Registrarse',
        onPress: () => { navigationRef.navigate('CuentaMenu');},
          },

          { text: 'Volver',  onPress: () => { navigationRef.navigate('CuentaMenu');}  },
        ],
        { cancelable: false },
      )
      
    }
  }

   export default verificaCuenta;