import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../lib/firebaseAdminApp";
import firestore from "../../lib/firestore";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    const usersCollection = firestore.collection("users");
    try {
      const { uid, email, name } = await admin.auth().verifyIdToken(token);

      const user = await usersCollection.doc(uid).get();

      if (!user.exists) {
        await usersCollection.doc(uid).set({
          name,
          email,
          totalScore: 0,
        });
      }

      res.status(200);
      return res.send("Signed in");
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
