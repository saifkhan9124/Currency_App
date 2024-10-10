import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} h={"85vh"} w={"full"}>
      <Image w={"full"} h={"full"} objectFit={"contain"} src={""} />

      <Text
        fontSize={"6xl"}
        textAling={"center"}
        fontWeight={"thin"}
        color={"whiteAlpha.700"}
        mt={"-20"}
      ></Text>
    </Box>
  );
};

export default Home;
