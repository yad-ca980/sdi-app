import React from 'react';
import {  Stack, Text } from 'native-base';
import colors from '../../colors';
const InstruccionesComponente = (props) => {
    const {numero, titulo, parentesis} =props;
  return (
  
            <Stack direction={"row"} mx={2} >
                <Text fontSize={48} bold  >{numero}</Text>
                <Stack direction={"column"} mr={16} ml={3}>
                    <Text fontSize={"xl"} bold>
                        {titulo}
                    </Text>
                    <Text italic fontSize={"xs"}>
                    {parentesis}
                    </Text>

                </Stack>

            </Stack>

  );
};

export default InstruccionesComponente;