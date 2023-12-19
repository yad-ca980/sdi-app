import { StyleSheet } from "react-native";
import baseColor from "../private/api/baseColor";


export default StyleSheet.create({

    Texts: {
        fontFamily: "CircularApp",
        color: "#000000"
      },
    
    Color: {
      //backgroundColor: "#236DB7",
      backgroundColor: baseColor.color,
    },

    textColor: {
      fontFamily: "CircularApp",
      color: baseColor.colorFont
    },

    bg:{
      backgroundColor: baseColor.bg
    },
    textColor2: {
      fontFamily: "CircularApp",
      color: baseColor.colorFont2
    },
        
    texto:{
      fontFamily: "CircularApp",
    }
    

 })