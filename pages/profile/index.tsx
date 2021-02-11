import {
  Box,
  Spinner,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import UserContext from "../../contexts/UserContext";

const Profile: React.FC = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    totalScore: number;
  }>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    user?.getIdToken().then((token) => {
      fetch(`/api/get-current-user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((result) => result.json())
        .then((userData) => setUserData(userData));
    });
  }, [user]);

  const updateCurrentUser = () => {
    setIsLoading(true);
    user?.getIdToken().then((token) => {
      fetch(`/api/update-current-user`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: userData.name, email: userData.email }),
      }).then(() => setIsLoading(false));
    });
  };

  return userData ? (
    <Box width="100%" display="flex" flexWrap="wrap">
      <Box flex={1} marginX="200px" border="1px solid black" padding="15px">
        <Text marginBottom="10px">
          <b>Total score: </b>
          {userData.totalScore}
        </Text>
        <form>
          <FormControl id="email" marginBottom="10px">
            <FormLabel>Name:</FormLabel>
            <Input
              type="text"
              value={userData.name}
              onChange={(e) => {
                setUserData({ ...userData, name: e.target.value });
              }}
            />
          </FormControl>
          <FormControl id="email" marginBottom="15px">
            <FormLabel>Email:</FormLabel>
            <Input
              type="email"
              value={userData.email}
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
              }}
            />
          </FormControl>
          <Box display="flex" justifyContent="flex-end">
            <Button disabled={isLoading} onClick={updateCurrentUser}>
              {isLoading ? <Spinner /> : "Save Profile"}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  ) : (
    <Box display="flex" justifyContent="center">
      <Spinner size="xl" />
    </Box>
  );
};

export default Profile;
