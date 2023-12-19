import URL from "./URL";
import fetchPost from "./fetchPost";

const agregarFav = async(idU, idAS, id)=>{
  console.log("<<<<<<<<<<<<<VOY  AIR A AGREGAR FAVORITO >>>>>>>>>>>>>>>>>>>>>");
  console.log("Soy el id del usuario",idU);
 
  console.log("Soy el id de la agrupacion",idAS);

  console.log("Soy el id del servicio  ", id);


    const BASE_URL= URL.BASE_URL;
        
    const dataFav = new FormData();
    dataFav.append("idU", idU);
    dataFav.append("idAS", idAS);
    dataFav.append("idS", id);
    const url = `${BASE_URL}abdiel/favoritos/add_item`
    const options = {
      method:'POST',
      body: dataFav
    };
    const res = await fetchPost(url, options);
    console.log("agrega Fav", res);
    return res;

    
  }
export default agregarFav;