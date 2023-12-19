import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, TouchableOpacity, View } from 'react-native';
import { NativeBaseProvider, Box, Text, Stack, Pressable, Center, ScrollView, Icon } from 'native-base';
import colors from '../colors';
import { FontAwesome5, Entypo } from '@expo/vector-icons'; 



export default function ScrollSubCategorias(props) {





    const detalleSub= () => {
        props.navigation.navigate("DetalleSubCategoria");
      };


  return (

     

        <ScrollView horizontal={true}>

            <Pressable mx={1} onPress={()=>detalleSub(1)}>
                <Center bg="#cfcfcf" h={16} w={16} borderRadius={16}>
                    <FontAwesome5 name="tshirt" size={24} color="#808080" />
                </Center>
            </Pressable>
            <Pressable mx={1}>
                <Center bg="#cfcfcf" h={16} w={16} borderRadius={16}>
                    <Entypo name="cup" size={24} color="#808080" />
                </Center>
            </Pressable>

            <Pressable mx={1}>
                <Center bg="#cfcfcf" h={16} w={16} borderRadius={16}>
                    <FontAwesome5 name="pencil-alt" size={24} color="#808080" />
                </Center>
            </Pressable>

            <Pressable mx={1}>
                <Center bg="#cfcfcf" h={16} w={16} borderRadius={16}>
                    <Entypo name="book" size={24} color="#808080" />
                </Center>
            </Pressable>

            <Pressable mx={1}>
                <Center bg="#cfcfcf" h={16} w={16} borderRadius={16}>
                    <Entypo name="scissors" size={24} color="#808080" />
                </Center>
            </Pressable>
            <Pressable mx={1}>
                <Center bg="#cfcfcf" h={16} w={16} borderRadius={16}>
                    <FontAwesome5 name="tshirt" size={24} color="#808080" />
                </Center>
            </Pressable>


            

        </ScrollView>


    

  
  );
}