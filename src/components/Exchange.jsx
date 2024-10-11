import React, { useEffect, useState } from "react";
import { server } from "../index";
import axios from "axios";
import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorCom from "./ErrorCom";

const Exchange = () => {
  const [loading, setLoading] = useState(true);
  const [exchange, setExchange] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchange = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchange(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchExchange();
  }, []);

  if (error) return <ErrorCom message={"Error by while fetching"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <HStack wrap="wrap" justifyContent={"space-evenly"}>
          {exchange.map((i) => (
            <ExChangeCard
              key={i.id}
              name={i.name}
              img={i.image}
              rank={i.trust_score_rank}
              url={i.url}
            />
          ))}
        </HStack>
      )}
    </Container>
  );
};

const ExChangeCard = ({ name, img, rank, url }) => {
  return (
    <a href={url} target={"_blank"} rel="noopener noreferrer">
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
          Rank: {rank}
        </Heading>
        <Text>{name}</Text>
      </VStack>
    </a>
  );
};

export default Exchange;
