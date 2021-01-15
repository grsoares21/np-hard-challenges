import { Box, Text, Image } from "@chakra-ui/react";

const Challenge: React.FC<{
  name: string;
  description: string;
  imgSrc: string;
}> = ({ name, description, imgSrc }) => {
  return (
    <Box border="1px" display="flex" padding="10px">
      <Box bg="#CCCCC" width="40%">
        <Image src={imgSrc}></Image>
      </Box>
      <Box width="60%" paddingX="15px">
        <Text
          textAlign="center"
          as="h3"
          fontWeight="bold"
          fontFamily="'Roboto', sans-serif"
          marginY="10px"
        >
          {name}
        </Text>
        <Text>{description}</Text>
      </Box>
    </Box>
  );
};

const challengeData = [
  {
    name: "The Travelling thief problem",
    description:
      "It is a combination of two well-known problems, the knapsack problem and the travelling salesman problem. Some parameters which are responsible for the interdependence of these two sub-problems are defined.",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Knapsack.svg/1280px-Knapsack.svg.png",
  },
  {
    name: "The Knapsack Problem",
    description:
      "The knapsack problem is a problem in combinatorial optimization: Given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible.",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Knapsack.svg/1280px-Knapsack.svg.png",
  },
  {
    name: "Challenge 3",
    description: "This is the challenge 3",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Knapsack.svg/1280px-Knapsack.svg.png",
  },
  {
    name: "Challenge 4",
    description: "This is the challenge 4",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Knapsack.svg/1280px-Knapsack.svg.png",
  },
];

export default function Challenges() {
  return (
    <Box width="100%" display="flex" flexWrap="wrap">
      {challengeData.map((chal, i) => (
        <Box width="50%" paddingX="60px" marginBottom="30px">
          <Challenge
            key={i}
            name={chal.name}
            description={chal.description}
            imgSrc={chal.imgSrc}
          />
        </Box>
      ))}
    </Box>
  );
}
