import { Center, Pressable, Text, Image } from "native-base";

const Categoria = (props) => {
const{ image, titulo} = props;



    return(
       <>
            <Center  bg="#cfcfcf" h={24} w={24} borderRadius={16} shadow={6}>
                <Image
                source={{
                    uri: `http://sdiqro.store/static/img/categoriasServ/${image}`
                    }} alt="Alternate Text" size="lg"  borderRadius={16}/>
           
            </Center>
           
                <Text w={24} fontSize={12} textAlign="center">{titulo}</Text>
            
        </>

    )
}
export default Categoria;