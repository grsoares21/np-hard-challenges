import { Box, list, Text } from "@chakra-ui/react";
import firestore from "../../lib/firestore";

interface LeaderboardProps {
  leaderboardList: { name: string; totalScore: number }[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboardList }) => {
  return (
    <Box width="100%" display="flex" flexWrap="wrap">
      <Box
        flex={1}
        marginX="200px"
        border="1px solid black"
        paddingX="10px"
        paddingY="5px"
      >
        {/** TODO: transform this into a table */}
        {leaderboardList.map((user, i) => (
          <Box width="100%" key={i} marginY="5px" display="flex">
            <Text width="60%">{user.name}</Text>
            <Text width="40%">{user.totalScore}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export async function getServerSideProps(): Promise<{
  props: LeaderboardProps;
}> {
  let users = firestore.collection("users");

  var listUsers = await Promise.all(
    (await users.orderBy("totalScore", "desc").limit(100).get()).docs.map(
      async (doc) => await doc.data()
    )
  );

  console.log(listUsers);

  return {
    props: {
      leaderboardList: listUsers.map(({ name, totalScore }) => ({
        name,
        totalScore: totalScore,
      })),
    },
  };
}

export default Leaderboard;
