import * as functions from "firebase-functions";
import admin from "firebase-admin";
import dayjs from "dayjs";
import { calculateVATRateInfo } from "./utils/calculateVATRateInfo";
import { calculateSummary } from "./utils/calculateSummary";
import { renderHTML } from "../ejsService/renderHTML";
import { createBuffer } from "../pdfService/createBuffer";
import { createFile } from "../pdfService/createFile";
import { transporter } from "../mailService/transporter";
import { invoiceMail } from "../mailService/types";
import { formatDate } from "../utils/formateDate";
import "dayjs/locale/pl";

export const handler = async (
  snapshot: functions.firestore.QueryDocumentSnapshot,
  context: functions.EventContext
) => {
  const data = snapshot.data();
  const company = context.params.company;

  try {
    const user = await admin.firestore().doc(`${company}/data`).get();
    const taxes = calculateVATRateInfo(data.products);
    const taxesSummary = calculateSummary(taxes);

    const html = await renderHTML("../ejsService/templates/invoice.ejs", {
      details: {},
      ...data,
      issueDate: dayjs(formatDate(data.issueDate)).format("D.M.YYYY"),
      saleDate: dayjs(formatDate(data.saleDate)).format("D.M.YYYY"),
      user: user.data(),
      taxes,
      taxesSummary,
    });
    const pdfBuffer = await createBuffer(html);
    const pdfFile = await createFile(html);

    const bucket = admin.storage().bucket();
    await bucket.upload(pdfFile.filename, {
      destination: `${company}/invoices/${snapshot.id}`,
    });

    const { subject, text } = invoiceMail(
      dayjs(formatDate(data.issueDate)).locale("pl").format("MMMM"),
      formatDate(data.issueDate).getFullYear(),
      user.data()?.companyName
    );
    await transporter.sendMail({
      from: functions.config().mail_service.user,
      to: data.customer.mailingList,
      subject,
      text,
      attachments: [
        { filename: `Faktura_VAT_${data.number}.pdf`, content: pdfBuffer },
      ],
    });

    return snapshot.ref.update({ isGeneratedPDF: true });
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteHandler = async (
  snapshot: functions.firestore.QueryDocumentSnapshot,
  context: functions.EventContext
) => {
  try {
    const bucket = admin.storage().bucket();
    return await bucket.file(`${context.params.company}/invoices/${snapshot.id}`).delete();
  } catch (err) {
    throw new Error(err);
  }
};
