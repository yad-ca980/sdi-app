import { Box, Stack, Text } from "native-base";
import colors from "../colors";

const NotificationComponent = (props) =>{

    const {title, text, date} = props;
    return(
        <Stack bg={colors.blanco}  mx="5%"  borderRadius={20} shadow={6} safeArea={4} space={1}>
            <Text bold fontSize={"lg"}> {title} </Text>
            <Text fontSize={"md"}>  {text}  </Text>
            <Text fontSize={"xs"} color={colors.gris} alignSelf="flex-end">{date}</Text>
                    
        </Stack>
    );
}
export default NotificationComponent;