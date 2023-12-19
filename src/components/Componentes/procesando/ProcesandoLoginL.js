import React from "react";
import { View } from "react-native";
import LottieLoginL from "../Lotties/LottieLoginL";


const ProcesandoLoginL = (props) => {
    return (
      <View
        style={{
          position: "absolute",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          zIndex: 1001,
        }}
      >
        <View
          style={{
            position: "absolute",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            zIndex: 1,
  
            opacity: 0.8,
          }}
        />
        <View
          style={{
            position: "relative",
            zIndex: 2,
            padding: 10,
            overflow: "hidden",
            borderRadius: 8,
            opacity: 0.7,
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <LottieLoginL/>
        </View>
      </View>
    );
  };

export default ProcesandoLoginL;