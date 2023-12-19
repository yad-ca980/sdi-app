import React from "react";
import { Pressable, Center, PresenceTransition, Text, HStack } from "native-base";
import { FontAwesome } from '@expo/vector-icons'; 


const FaqComponent = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
 const { n, question, answer} = props;
 
  return <Center>
      <Pressable onPress={() => setIsOpen(!isOpen)}  w="90%" mx="5%">
        <HStack space={2} justifyContent={"space-between"} my={3} mx={3}>
            <Text bold fontSize={"md"}>{n}.</Text>
            <Text bold fontSize={"md"} flex={1}>{question}</Text> 
            <FontAwesome name={isOpen ? "chevron-up" : "chevron-down"} size={24} color="black"/>
        </HStack>
      </Pressable>

     {isOpen ? 
      <PresenceTransition visible={isOpen}  initial={{
      opacity: 0
    }} animate={{
      opacity: 1,
      transition: {
        duration: 250
      }
    }}>
        <Text mt={1} mb={4}  mx="7%"> {answer}       </Text>
      </PresenceTransition> 
      : <></>}
    </Center>;
};
export default FaqComponent;