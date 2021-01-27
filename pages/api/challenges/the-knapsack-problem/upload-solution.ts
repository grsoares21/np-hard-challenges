import runMiddleware from "../../../../lib/runMiddleware";
import multer from "multer";
import admin from "../../../../lib/firebaseAdminApp";
import kanpsackInstance from "./instance-1.json";
import firestore from "../../../../lib/firestore";

const upload = multer({ storage: multer.memoryStorage() });

export default async (req: any, res: any) => {
  await runMiddleware(req, res, upload.single("solution")).then(() => {});

  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const { uid } = await admin.auth().verifyIdToken(token);
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

      const userDocument = firestore.collection("users").doc(uid);

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
      res.status(401);
      return res.send("Unauthorized");
    }
  } else {
    res.status(401);
    return res.send("Unauthorized");
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
