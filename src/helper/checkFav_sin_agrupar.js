import URL from "./URL";
import fetchPost from "./fetchPost";

const checkFav_sin_agrupar = async(idU, idAS)=>{
    const BASE_URL= URL.BASE_URL;
        
    const dataFav = new FormData();
    dataFav.append("idU", idU);
    dataFav.append("idAS", idAS);
    const url = `${BASE_URL}abdiel/favoritos/check_item`
    const options = {
      method:'POST',
      body: dataFav
    };
    const res = await fetchPost(url, options);
    //console.log("check:", res);
    return res;
   // 
    
    
  }
  export default checkFav_sin_agrupar;