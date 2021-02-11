import admin from "./firebaseAdminApp";
import { NextApiRequest, NextApiResponse } from "next";
import firestore from "./firestore";

export interface AuthenticatedRequest extends NextApiRequest {
  user?: { name: string; email: string; uid: string; totalScore: number };
}

export default async function authenticationMiddleware(
  req: AuthenticatedRequest,
  res: NextApiResponse,
  next: (result?: any) => void
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const { name, email, uid } = await admin.auth().verifyIdToken(token);
    const totalScore = 0;
    req.user = { name, email, uid, totalScore };

    const usersCollection = firestore.collection("users");
    const user = await usersCollection.doc(uid).get();

    if (!user.exists) {
      await usersCollection
        .doc(uid)
        .set({ name, email, totalScore, scores: {} });
    } else {
      const userData = user.data();
      req.user.email = userData.email;
      req.user.name = userData.name;
      req.user.totalScore = userData.totalScore;
    }

    next();
  } catch (err) {
    res.status(401).send("Unauthorized");
    next(err);
  }
}
