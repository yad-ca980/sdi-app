import React from 'react';
import {  Stack, Text } from 'native-base';
import colors from '../../colors';
const InstruccionesComponente2 = (props) => {
    const {numero, titulo, parentesis} =props;
  return (
  
            <Stack direction={"row"} mx={2} >
                
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

export default InstruccionesComponente2;