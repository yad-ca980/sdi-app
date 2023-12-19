import React, { useEffect, useState } from 'react';
import {  Dimensions, StyleSheet, View } from 'react-native';
import { Image, Box } from 'native-base';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import URL from '../helper/URL';
import fetchPost from '../helper/fetchPost';
import Loader from './Loader';


const SwiperList = () => {
  const [ load, setLoad] = useState(true)
  
  const BASE_URL = URL.BASE_URL;  
  const [banners, setBanners] = useState([])
  const getBanners = async () => {
    const url = `${BASE_URL}abdiel/favoritos/banners`;
    const options = {
      method: 'POST',
    };
  
    try {
      const response = await fetchPost(url, options);
      if (response !== null) {
        //console.log(response);
        setBanners(response);
      } else {
        alert("Revisa tu conexión a internet");
      }
    } catch (error) {
      console.error(error);
      // Maneja el error adecuadamente
      // Puedes mostrar un mensaje de error o realizar alguna acción específica
    }
  };
  useEffect(() => {
   getBanners()
  }, [banners.length]);

  const BannersRender=()=>{

    {banners.length > 0 ? 
      
        (banners.map((banner, index) => (
          <Image
            key={index}
            source={{ uri: `${BASE_URL}static/img/banners/${banner.imagen}` }}
            alt={`banner${index + 1}`}
            w={Dimensions.get('window').width}
            h={"100%"}
            resizeMode="contain"
          />
        )))
      
     : (
      <Box w={Dimensions.get('window').width}>
        <Image
          source={{
            uri: 'https://shop.marypymes.es/BANNER-PAPELERIA.png',
          }}
          alt="banner1"
          w={Dimensions.get('window').width}
          h={"100%"}
          resizeMode="contain"
        />
      </Box>
    )}
    

  }
  
  
  return(
  <View style={styles.container}>
    {banners.length<=0 ? <Loader/> : 
    
    <SwiperFlatList autoplay autoplayDelay={2} autoplayLoop index={1} //showPagination 
    >
      {banners.length >0 ? 
    (banners.map((banner, index) => (
          <Image
            key={index}
            source={{ uri: `${BASE_URL}static/img/banners/${banner.imagen}` }}
            alt={`banner${index + 1}`}
            w={Dimensions.get('window').width}
            h={"100%"}
            resizeMode="cover"
          />
        )))

      :
      (
        <Box w={Dimensions.get('window').width}>
          <Image
            source={{
              uri: 'https://shop.marypymes.es/BANNER-PAPELERIA.png',
            }}
            alt="banner1"
            w={Dimensions.get('window').width}
            h={"100%"}
            resizeMode="contain"
          />
        </Box>
      )
      }
      
    </SwiperFlatList>
}
  </View>
)};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, height:150 },
  child: { width, justifyContent: 'center' },
  text: { fontSize: width * 0.5, textAlign: 'center' },
});

export default SwiperList;