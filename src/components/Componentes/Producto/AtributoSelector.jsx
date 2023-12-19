import { Text, Select, Box, CheckIcon, Center } from "native-base";
import { useState } from "react";

const AtributoSelector = (props) => { 
    const { idAtr, nombreAtr} =props;


const [ categoriaAtributo, setCategoriaAtributo ] = useState();

    return(
        <Center>
        <Box maxW="300">
          <Select selectedValue={categoriaAtributo} minWidth="200" accessibilityLabel={String(idAtr)} placeholder={nombreAtr + ":" + idAtr} _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />
        }} mt={1} onValueChange={itemValue => setCategoriaAtributo(itemValue)}>
            <Select.Item label="UX Research" value="ux" />
            <Select.Item label="Web Development" value="web" />
            <Select.Item label="Cross Platform Development" value="cross" />
            <Select.Item label="UI Designing" value="ui" />
            <Select.Item label="Backend Development" value="backend" />
          </Select>
        </Box>
      </Center>
    )
 }
 export default AtributoSelector;