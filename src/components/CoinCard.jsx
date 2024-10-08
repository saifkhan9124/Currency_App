import { Heading, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom"; // Use Link from react-router-dom

const CoinCard = ({ id, name, img, symbol, price, currencySymbol = "Pkr" }) => {
  return (
    <Link to={`/coin/${id}`}>
      <VStack
        w={52}
        shadow="lg"
        borderRadius="lg"
        transition="all 0.3s"
        m={4}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image
          src={img}
          width={"10"}
          h={"10"}
          objectFit={"contain"}
          alt={name}
        />
        <Heading size={"md"} noOfLines={1}>
          {symbol}
        </Heading>
        <Text>{name}</Text>
        <Text>{price ? `${currencySymbol}${price}` : "NA"}</Text>
      </VStack>
    </Link>
  );
};

export default CoinCard;
