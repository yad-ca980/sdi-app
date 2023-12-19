import React from 'react';
import {  Stack, Text } from 'native-base';
import colors from '../../colors';
const NotaComponent = (props) => {
    const {nota} =props;
  return (
  
            <Stack direction={"column"} ml={10} my={3} >
                <Text fontSize={24} bold color={colors.azul} mr={"70%"}>NOTA:</Text>
                <Text mr={10}>{nota}</Text>

            </Stack>

  );
};

export default NotaComponent;