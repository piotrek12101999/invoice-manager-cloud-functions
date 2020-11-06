import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import { handler } from './invoiceService/invoiceService';

const REGION = 'europe-west1';

admin.initializeApp();

export const onInvoiceAdded = functions.region(REGION).firestore.document('{company}/invoices/invoices/{invoice}').onCreate(handler);