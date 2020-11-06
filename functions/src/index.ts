import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import { handler, deleteHandler } from './invoiceService/invoiceService';

const REGION = 'europe-west1';

admin.initializeApp();

const invoicePrefix = functions.region(REGION).firestore.document('{company}/invoices/invoices/{invoice}');

export const onInvoiceAdded = invoicePrefix.onCreate(handler);

export const onInvoiceDeleted = invoicePrefix.onDelete(deleteHandler);