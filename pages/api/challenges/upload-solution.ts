import runMiddleware from "../../../lib/runMiddleware";
import multer from "multer";
import firestore from "../../../lib/firebase/firestore";
import authenticationMiddleware, {
  AuthenticatedRequest,
} from "../../../lib/firebase/authenticationMiddleware";
import { NextApiRequest } from "next";
import evaluationFunctions from "../../../challenges/evaluationFunctions";

const multipartFormHandler = multer({ storage: multer.memoryStorage() });

export interface FileUploadRequest extends NextApiRequest {
  file: { buffer: string };
}

export default async (
  req: AuthenticatedRequest & FileUploadRequest,
  res: any
) => {
  await runMiddleware(req, res, authenticationMiddleware);
  await runMiddleware(req, res, multipartFormHandler.single("solution") as any);

  try {
    let newRecord = false;

    // TODO: add validation for challenge Id and return 400 if invalid
    const { score, validSolution } = evaluationFunctions[req.body.challengeId](
      String(req.file.buffer)
    );

    if (!validSolution) {
      res.send({
        score,
        validSolution,
        newRecord: false,
      });

      return;
    }

    const userDocument = firestore.collection("users").doc(req.user.uid);
    const userData = await (await userDocument.get()).data();
    const userScores = userData.scores;

    const existingScore = userScores[req.body.challengeId];

    if (!existingScore) {
      const newScores = { ...userData.scores };
      newScores[req.body.challengeId] = score;
      await userDocument.set({
        ...userData,
        scores: newScores,
        totalScore: userData.totalScore + score,
      });

      newRecord = true;
    } else {
      if (score > existingScore) {
        newRecord = true;

        const newScores = { ...userData.scores };
        newScores[req.body.challengeId] = score;
        await userDocument.set({
          ...userData,
          scores: newScores,
          totalScore: userData.totalScore + (score - existingScore),
        });
      }
    }

    return res.send({
      score,
      validSolution: true,
      newRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
    return res.send("Internal server error");
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
