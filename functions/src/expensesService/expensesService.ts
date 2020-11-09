import * as functions from "firebase-functions";
import admin from "firebase-admin";

export const deleteHandler = async (
  snapshot: functions.firestore.QueryDocumentSnapshot,
  context: functions.EventContext
) => {
  try {
    const bucket = admin.storage().bucket();
    return await bucket.file(`${context.params.company}/expenses/${snapshot.id}`).delete();
  } catch (err) {
    throw new Error(err);
  }
};
