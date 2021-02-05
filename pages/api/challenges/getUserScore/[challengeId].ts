import { NextApiRequest, NextApiResponse } from "next";
import challengeInputs from "../../../../challenges/challengeInputs";
import authenticationMiddleware, {
  AuthenticatedRequest,
} from "../../../../lib/firebase/authenticationMiddleware";
import firestore from "../../../../lib/firebase/firestore";
import runMiddleware from "../../../../lib/runMiddleware";

export default async (
  req: NextApiRequest & AuthenticatedRequest,
  res: NextApiResponse
) => {
  await runMiddleware(req, res, authenticationMiddleware);
  const {
    query: { challengeId },
  } = req;

  const userData = (
    await firestore.collection("users").doc(req.user.uid).get()
  ).data();

  const existingScore = userData.scores[challengeId as string];

  res.send(existingScore ?? 0);
};
