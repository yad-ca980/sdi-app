import React from 'react';
import {  NativeBaseProvider, ScrollView, Text, View } from 'native-base';
import colors from '../../colors';
import InstruccionesComponente from './InstruccionesComponente';
import GuardarComponente from './GuardarComponente';
import NotaComponent from './NotaComponent';
        

const Lonas = () => {
  return (
    <NativeBaseProvider>
        <View style={{ flex: 1 }}>
        <Text fontSize={42} bold color={colors.azul} alignSelf={"flex-end"} mr={10}>  LONA </Text>
            <ScrollView>
                <InstruccionesComponente numero="01" 
                titulo="Archivo en JPG o PDF"
                parentesis="(Cualquier otro formato podría causar modificaciones y sería bajo responsabilidad del cliete el dejarlo)" 
                />           
                <InstruccionesComponente numero="02" 
                titulo="Diseño a la medida"
                parentesis="(Sino está a la medida, debe autorizar el cliente el deformarlo, sino está de acuerdo debe proporcionar el archivo correcto)" 
                />
                 <InstruccionesComponente numero="03" 
                titulo="Trabajado en CMYK"
                parentesis="(Si el archivo no tiene este modo de color, al momento de imprimir podría variar los tonos)" 
                />
                <InstruccionesComponente numero="04" 
                titulo="Resolución a 300DPIS"
                parentesis="(Si el archivo viene a 300dpis el archivo no debe medir más de 300x300cm ya sea que este a escala o no)" 
                />

                <InstruccionesComponente numero="05" 
                titulo="Resolución a 80DPIS"
                parentesis="(Si el archivo viene a 80dpis el archivo no debe estar a escala, debe ser el tamaño real)" 
                />
                <InstruccionesComponente numero="06" 
                titulo="Textos pequeños"
                parentesis="(Si el diseño tiene textos pequeños y/o delgados, cuidar que no
                sean menores a 8mm de lo contraio no serán muy legibles)" 
                />


                <Text color={colors.azul} bold fontSize={20} alignSelf={"flex-end"} mr={5}>¿Cómo guardar el archivo?</Text>
                <GuardarComponente text="Siempre guardar al tamaño final de impresión" />
                <GuardarComponente text="A 80dpis." />
                <GuardarComponente text="En JPG." />
                <GuardarComponente text="Si tiene áreas blancas al filo del diseño, poner un stroke en negro para deliimitar el diseño." />

                <NotaComponent
                nota="El ancho del material es de 320cm, si la lona rebasa los 315cm en X y Y, se debe partir en las partes que sean necesarias."
                />
                <Text color={colors.rosa} bold fontSize={24} alignSelf={"flex-end"} mr={5}>¿Cómo nombrar archivos de lona?</Text>
                <InstruccionesComponente numero="  " 
                titulo="BLANCA"
                parentesis="Estatus, Medida, Cantidad, Nombre, Acabados"
                />
                <InstruccionesComponente numero="  " 
                titulo="MATE / MESH / TRANSLUCIDA"
                parentesis="Estatus, Material, Cantidad, Medida, Nombre, Acabados" 
                />
                <InstruccionesComponente numero="  " 
                titulo="VINIL MICROPERFORADO"
                parentesis="(Este se imprime en el plotter de lona) Estatus, Material, Cantidad, Medida, Nombre" 
                />
                <InstruccionesComponente numero="  " 
                titulo="ACABADOS"
                parentesis="Los acabados normales son bastilla y ojillos cada metro a proporción, a excepción de la translucida, lo normal es para tensar. Cuando se requiere diferente a lo normal se usan los diguientes acrónimos:" 
                />
                <GuardarComponente text=" S-B: Se usa cuando la lona no lleva ojillos" />
                <GuardarComponente text="P-T: Se usa cuando se necesita un área extra de lona sin acabados que sirve para tensar (normalmente son 8cm aprox)" />
                <GuardarComponente text="P-O: Se usa cuando el cliente nesesita un numero especifico de ojillos diferente a lo normal." />
                <GuardarComponente text="P-A: se usa cuando se las especificaciones son más comple- mas, ejemplo, “bolsas”, “ojillos y área de tenzado”, “ojillos y bolsas”..." />
                <GuardarComponente text="SinAcabados: se usa cuando no se requieren ojillos, ni basti- lla, ni bolsas, ni área de tenzado." />
                <Text ml={10} mt={5} mb={3} bold fontSize={16}>Ejemplo:</Text>
                <GuardarComponente text="Si solo es una lona blanca con servicio normal y acabados normales: 100x100 fulanito.Jpg" />
                <GuardarComponente text="Si son 2 lonas blancas iguales con servicio urgente y acabado especial: urge 2 100x100 fulanito s-b.Jpg" />
                <GuardarComponente text="Si es una lona no blanca con servicio normal y acabados normales: mesh 100x100 fulanito.Jpg" />
            </ScrollView>
            
           
        </View>
    </NativeBaseProvider>
  );
};

export default Lonas;
