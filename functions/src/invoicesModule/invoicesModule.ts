import * as functions from 'firebase-functions';

export const handler = (snapshot: functions.firestore.QueryDocumentSnapshot, context: functions.EventContext) => {
    console.log('hi');
};