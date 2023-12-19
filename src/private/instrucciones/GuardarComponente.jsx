import React from 'react';
import {  Stack, Text, Icon } from 'native-base';
import colors from '../../colors';
import { AntDesign } from '@expo/vector-icons'; 
const GuardarComponente = (props) => {
    const {text} =props;
  return (
  
            <Stack direction={"row"} mx={5} >
               <Icon as={AntDesign} name="caretright" color={colors.azul} mt={1}/>
                <Text fontSize={"md"}>{text} </Text>
            </Stack>

  );
};

export default GuardarComponente;