import URL from "./URL";
import fetchPost from "./fetchPost";

const eliminarFav = async(idU, idAS,id)=>{
    const BASE_URL= URL.BASE_URL;
        
    const dataFav = new FormData();
    dataFav.append("idU", idU);
    dataFav.append("idAS", idAS);
    dataFav.append("idS", id);
    
    const url = `${BASE_URL}abdiel/favoritos/delete_item`
    const options = {
      method:'POST',
      body: dataFav
    };
    const res = await fetchPost(url, options);
    //console.log("delete fav:", res);
    return res;
   // 
    
    
  }
  export default eliminarFav;