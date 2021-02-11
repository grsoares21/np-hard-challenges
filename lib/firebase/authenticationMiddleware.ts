import admin from "./firebaseAdminApp";
import { NextApiRequest, NextApiResponse } from "next";
import firestore from "./firestore";

export interface AuthenticatedRequest extends NextApiRequest {
  user?: { name: string; email: string; uid: string };
}

export default async function authenticationMiddleware(
  req: AuthenticatedRequest,
  res: NextApiResponse,
  next: (result?: any) => void
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const { name, email, uid } = await admin.auth().verifyIdToken(token);
    req.user = { name, email, uid };

    const usersCollection = firestore.collection("users");
    const user = await usersCollection.doc(uid).get();

    if (!user.exists) {
      await usersCollection
        .doc(uid)
        .set({ name, email, totalScore: 0, scores: {} });
    }

    next();
  } catch (err) {
    res.status(401).send("Unauthorized");
    next(err);
  }
}
