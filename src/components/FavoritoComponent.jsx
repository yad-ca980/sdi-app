import { Box, Pressable, Icon, Center, Image, Text, Stack } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import colors from "../colors";
import { useNavigation } from "@react-navigation/native";
import fetchPost from "../helper/fetchPost";
import { Alert } from "react-native";
import URL from "../helper/URL";
const FavoritoComponent = (props) => {
  const BASE_URL=URL.BASE_URL;
  const navigation = useNavigation();

  const {
    nombre,
    precioNormal,
    precioImpreso,
    id,
    image,
    impreso,
    noImpreso,
    idAS,
    idU,
  } = props;

  const detalleProducto = (item, impreso, image, idAS, nombre, idU) => {
    navigation.navigate("DetalleProducto", {
      id: item,
      impreso: impreso,
      image: image,
      idAS: idAS,
      nombre: nombre,
      idU: idU,
    });
  };

  const favoritoNavegador = () => {
    switch (true) {
      case impreso == 1 && noImpreso == 1:
        console.log("LOS DOS IMPRESOS");
        Alert.alert(
          "El producto puede ser con impresión o sin ella",
          "¿Cual opción deseas ver?",
          [ 
            {
              text: "Impreso",
              onPress: () => detalleProducto(id, impreso, image, idAS, nombre),
            },
            {
              text: "No impreso",
              onPress: () => detalleProducto(id, 0, image, idAS, nombre),
            },
          ]
        );

        break;

      case impreso == 1 && noImpreso == 0:
        console.log("SOLO IMPRESO");
        detalleProducto(id, impreso, image, idAS, nombre);

        break;

      case impreso == 0 && noImpreso == 1:
        console.log("SOLO NO IMPRESO");
        detalleProducto(id, impreso, image, idAS, nombre);
        break;

      default:
        break;
    }
  };

  const eliminarFav = async()=>{
    const BASE_URL= URL.BASE_URL;
        
    const dataFav = new FormData();
    dataFav.append("idU", idU);
    dataFav.append("idAS", idAS);
    const url = `${BASE_URL}abdiel/favoritos/delete_item`
    const options = {
      method:'POST',
      body: dataFav
    };
    const res = await fetchPost(url, options);
    if (res===true){
      console.log("true eliminado");
      navigation.navigate("Favoritos")
    }else{
      console.log("False eliminado");
      
    }
    return res;
   // 
    
    
  }

  const eliminarFavorito = () => {
    Alert.alert(
      "Borrar Favorito",
      `¿Deseas borrar ${nombre} de favoritos?`,
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Confirmar", onPress: () => eliminarFav() },
      ],
      { cancelable: true }
    );
  };

  return (
    <>
      <Box
        h={32}
        w={"90%"}
        mx={"5%"}
        my={2}
        shadow={6}
        bg="white"
        borderRadius={20}
      >
        <Stack direction={"row"}>
          <Pressable onPress={() => eliminarFavorito()}>
            <Icon
              as={AntDesign}
              name="heart"
              size={6}
              ml={3}
              mt={3}
              color={colors.rosa}
            />
          </Pressable>

          <Image
            source={{
              uri: `http://sdiqro.store/static/imgServicios/${image}`,
            }}
            alt="Alternate Text"
            size="lg"
            mt={4}
            mx={1}
            resizeMode="contain"
          />
          <Stack direction={"column"} flex={1} mt={2}>
            <Text bold pt={1}>
              {" "}
              {nombre}
            </Text>
            {impreso == 1 ? (
              <Stack direction={"row"}>
                <Text fontSize={"sm"}>Precio sin impresión: </Text>
                <Text bold fontSize={"md"}>
                  ${precioNormal}
                </Text>
              </Stack>
            ) : null}
            {noImpreso == 1 ? (
              <Stack direction={"row"}>
                <Text fontSize={"sm"}>Precio con impresión: </Text>
                <Text bold fontSize={"md"}>
                  ${precioImpreso}
                </Text>
              </Stack>
            ) : null}

            <Box my={1}>
              <Pressable
                bg={colors.azul}
                borderRadius={10}
                w={24}
                h={9}
                onPress={() => favoritoNavegador()}
              >
                <Center>
                  <Stack direction={"row"} mt={1}>
                    <Text bold color={"white"} mt={1}>
                      Ver más
                    </Text>
                  </Stack>
                </Center>
              </Pressable>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default FavoritoComponent;
