import { Box, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { FaPuzzlePiece, FaTrophy, FaGithub, FaFlag } from "react-icons/fa";
import UserContext from "../contexts/UserContext";
import firebase from "../lib/firebase/firebaseApp";
import githubAuthProvider from "../lib/firebase/githubAuthProvider";

const LoginButton: React.FC = () => {
  const { user, setUser } = useContext(UserContext);

  return user ? (
    <Link href="/profile">
      <Button bg="white">
        <>
          <FaGithub />
          <Text marginLeft="10px">{user.displayName ?? user.email}</Text>
        </>
      </Button>
    </Link>
  ) : (
    <Button
      bg="white"
      onClick={() => {
        firebase
          .auth()
          .signInWithPopup(githubAuthProvider)
          .then((result) => {
            setUser(result.user);
          })
          .catch((error) => {
            console.error(error);
          });
      }}
    >
      <>
        <FaGithub />
        <Text marginLeft="10px">Login With Github</Text>
      </>
    </Button>
  );
};

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
      <Link href="/leaderboard">
        <Button bg="white">
          <FaTrophy />
          <Text marginLeft="10px">Leaderboard</Text>
        </Button>
      </Link>
      <LoginButton />
    </Box>
  );
}
