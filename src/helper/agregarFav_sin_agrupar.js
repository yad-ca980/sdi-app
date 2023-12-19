import URL from "./URL";
import fetchPost from "./fetchPost";

const agregarFav_sin_agrupar = async(idU, id)=>{
    const BASE_URL= URL.BASE_URL;
        
    const dataFav = new FormData();
    dataFav.append("idU", idU);
    dataFav.append("id", id);
    const url = `${BASE_URL}abdiel/favoritos/add_item_sin_agrupar`
    const options = {
      method:'POST',
      body: dataFav
    };
    const res = await fetchPost(url, options);
    console.log("agrega Fav", res);
    return res;
   // 
    
    
  }
  export default agregarFav_sin_agrupar;