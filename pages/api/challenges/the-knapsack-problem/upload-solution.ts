import runMiddleware from "../../../../lib/runMiddleware";
import multer from "multer";
import kanpsackInstance from "./instance-1.json";
import firestore from "../../../../lib/firebase/firestore";
import authenticationMiddleware, {
  AuthenticatedRequest,
} from "../../../../lib/firebase/authenticationMiddleware";
import { NextApiRequest } from "next";

const upload = multer({ storage: multer.memoryStorage() });

export interface FileUploadRequest extends NextApiRequest {
  file: { buffer: string };
}

export default async (
  req: AuthenticatedRequest & FileUploadRequest,
  res: any
) => {
  await runMiddleware(req, res, authenticationMiddleware);
  await runMiddleware(req, res, upload.single("solution"));

  try {
    const solution = String(req.file.buffer).split("\n");
    let newRecord = false;

    let totalScore = 0;
    let currentSize = 0;

    for (let i = 0; i < solution.length; i++) {
      const { value, size } = kanpsackInstance.items[+solution[i]];

      currentSize += size;
      totalScore += value;

      if (currentSize > kanpsackInstance.knapsackSize) {
        res.send({
          score: 0,
          validSolution: false,
          newRecord,
        });

        return;
      }
    }

    const userDocument = firestore.collection("users").doc(req.user.uid);

    const scoreDocument = await userDocument
      .collection("scores")
      .doc("the-knapsack-problem");

    const existingScore = await scoreDocument.get();

    if (!existingScore.exists) {
      await scoreDocument.set({ value: totalScore });

      const userData = (await userDocument.get()).data();
      userDocument.set({
        ...userData,
        totalScore: userData.totalScore + totalScore,
      });

      newRecord = true;
    } else {
      const previousScore = existingScore.data().value;

      if (totalScore > previousScore) {
        newRecord = true;

        const userData = (await userDocument.get()).data();

        userDocument.set({
          ...userData,
          totalScore: userData.totalScore + (totalScore - previousScore),
        });

        await scoreDocument.set({ value: totalScore });
      }
    }

    return res.send({
      score: totalScore,
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
