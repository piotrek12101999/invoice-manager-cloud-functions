import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import { handler, deleteHandler as invoiceDeleteHandler } from './invoiceService/invoiceService';
import { deleteHandler as expenseDeleteHandler } from './expensesService/expensesService';

const REGION = 'europe-west1';

admin.initializeApp();

const firestorePrefix = functions.region(REGION).firestore;

const invoicePrefix = firestorePrefix.document('{company}/invoices/invoices/{invoice}');

export const onInvoiceAdded = invoicePrefix.onCreate(handler);

export const onInvoiceDeleted = invoicePrefix.onDelete(invoiceDeleteHandler);

export const onExpenseDeleted = firestorePrefix.document('{company}/expenses/expenses/{expense}').onDelete(expenseDeleteHandler);