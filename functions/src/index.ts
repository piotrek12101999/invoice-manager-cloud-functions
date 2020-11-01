import * as functions from 'firebase-functions';
import { handler } from './invoicesModule/invoicesModule';

const REGION = 'europe-west1';

export const onInvoiceAdded = functions.region(REGION).firestore.document('{company}/invoices/invoices/{invoice}').onCreate(handler)