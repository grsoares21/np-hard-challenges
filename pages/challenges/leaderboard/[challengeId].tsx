import { Box, Text } from "@chakra-ui/react";
import { join } from "path";
import fs from "fs";
import matter from "gray-matter";
import firestore from "../../../lib/firebase/firestore";

interface ChallengeLeaderboardProps {
  challengeName: string;
  leaderboardList: { name: string; score: number }[];
}

const ChallengeLeaderboard: React.FC<ChallengeLeaderboardProps> = ({
  challengeName,
  leaderboardList,
}) => {
  return (
    <Box
      border="dashed 1px black"
      marginTop="20px"
      marginX={["10px", "20px", "70px", "200px", "300px"]}
      padding="15px"
    >
      <Text
        as="h1"
        fontSize="1.25em"
        textAlign="center"
        fontWeight="bold"
        marginY="15px"
      >
        {challengeName} Leaderboard
      </Text>
      {leaderboardList.map((user, i) => (
        <Box width="100%" key={i} marginY="5px" display="flex">
          <Text width="60%">{user.name}</Text>
          <Text width="40%">{user.score}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default ChallengeLeaderboard;

export async function getServerSideProps({ query }) {
  const { challengeId } = query;
  const challengesDirectory = join(process.cwd(), "challenges");

  const users = await Promise.all(
    (
      await firestore
        .collection("users")
        .orderBy(`scores.${challengeId}`, "desc")
        .limit(100)
        .get()
    ).docs.map(async (doc) => await doc.data())
  );

  const challengeData = matter(
    fs.readFileSync(
      join(challengesDirectory, challengeId, "statement.md"),
      "utf8"
    ),
    {}
  );

  return {
    props: {
      challengeName: challengeData.data.name,
      leaderboardList: users.map(({ name, scores }) => ({
        name,
        score: scores[challengeId],
      })),
    },
  };
}
