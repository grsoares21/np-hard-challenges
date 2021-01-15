import { Box, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaPuzzlePiece, FaTrophy, FaGithub, FaFlag } from "react-icons/fa";

export default function MainMenu() {
  return (
    <Box
      borderBottom="1px"
      borderTop="1px"
      borderStyle="dashed"
      marginY="20px"
      paddingY="10px"
      width="100%"
      display="flex"
      justifyContent="space-evenly"
    >
      <Link href="/challenges">
        <Button bg="white">
          <FaPuzzlePiece />
          <Text marginLeft="10px">Challenges</Text>
        </Button>
      </Link>
      <Button bg="white">
        <FaTrophy />
        <Text marginLeft="10px">Leaderboard</Text>
      </Button>
      <Button bg="white">
        <FaGithub />
        <Text marginLeft="10px">Login With Github</Text>
      </Button>
      <Button bg="white">
        <FaFlag />
      </Button>
    </Box>
  );
}
