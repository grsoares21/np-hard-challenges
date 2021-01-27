import { Box, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { FaPuzzlePiece, FaTrophy, FaGithub, FaFlag } from "react-icons/fa";
import UserContext from "../contexts/UserContext";
import firebase from "../lib/firebaseApp";
import githubAuthProvider from "../lib/githubAuthProvider";

const LoginButton: React.FC = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <Button
      bg="white"
      onClick={() => {
        if (user) {
          console.log(`Yayy ${user.name} is logged in`);
        } else {
          firebase
            .auth()
            .signInWithPopup(githubAuthProvider)
            .then((result) => {
              const { displayName, email } = result.user;
              result.user.getIdToken().then((token) => {
                console.log(token);
                setUser({
                  token,
                  email,
                  name: displayName,
                });
              });
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }}
    >
      {user ? (
        <>
          <FaGithub />
          <Text marginLeft="10px">{user.name}</Text>
        </>
      ) : (
        <>
          <FaGithub />
          <Text marginLeft="10px">Login With Github</Text>
        </>
      )}
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
      <Button bg="white">
        <FaTrophy />
        <Text marginLeft="10px">Leaderboard</Text>
      </Button>
      <LoginButton />
      <Button bg="white">
        <FaFlag />
      </Button>
    </Box>
  );
}
