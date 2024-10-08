import React, { useEffect, useState } from "react";
import { server } from "../index";
import axios from "axios";
import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorCom from "./ErrorCom";
import CoinCard from "./CoinCard";

const Coin = () => {
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("PKR");

  const currencySymbol =
    currency === "PKR" ? "Rs." : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const btns = new Array(132).fill(1); // Correct array creation syntax

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoin(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchCoin();
  }, [currency, page]);

  if (error) return <ErrorCom message={"Error while fetching data"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={8}>
            <HStack spacing={"4"}>
              <Radio value={"PKR"}>RS.</Radio>
              <Radio value={"usd"}>$</Radio>
              <Radio value={"eur"}>€</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap="wrap" justifyContent={"space-evenly"}>
            {coin.map((i) => (
              <CoinCard
                id={i.id}
                price={i.current_price}
                key={i.id}
                name={i.name}
                img={i.image}
                symbol={i.symbol}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>

          <HStack
            w={"full"}
            overflowX={"auto"}
            p={8}
            css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none", // For Internet Explorer and Edge
              "scrollbar-width": "none", // For Firefox
            }}
          >
            {btns.map((item, index) => (
              <Button
                key={index}
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coin;
