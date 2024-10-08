import {
  Badge,
  Box,
  Center,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { useState, useEffect } from "react";
import axios from "axios";
import { server } from "..";
import ErrorCom from "./ErrorCom";

const CoinDetail = () => {
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("PKR");

  const params = useParams();

  const currencySymbol =
    currency === "PKR" ? "Rs." : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        setCoin(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchCoin();
  }, [params.id]);

  if (error) return <ErrorCom message={"Error while fetching Coin"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box borderWidth={1} w={"full"}></Box>

          <RadioGroup value={currency} onChange={setCurrency} p={8}>
            <HStack spacing={"4"}>
              <Radio value={"PKR"}>RS.</Radio>
              <Radio value={"usd"}>$</Radio>
              <Radio value={"eur"}>€</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"}>
              Last Update On {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>

            <Image
              src={coin.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            ></Image>

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {" "}
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "decrease"
                      : "increase"
                  }
                />
                {coin.market_data.price_change_24h}%
              </StatHelpText>
            </Stat>

            <Badge
              fontSize={"2xl"}
              bgColor={"blackAlpha.900"}
              color={"white"}
            >{`#${coin.market_cap_rank}`}</Badge>

            <CustomBar high={"232"} low={"40"} />
          </VStack>
        </>
      )}
    </Container>
  );
};

const CustomBar = ({ high, low }) => {
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme="red" />
      <Text></Text>
      <Badge children={high} colorScheme="green" />
    </HStack>
  </VStack>;
};
export default CoinDetail;
