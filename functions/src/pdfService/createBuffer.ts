import htmlpdf from "html-pdf";

const PDF_GENERATION_TIMEOUT = 45000;

export const createBuffer = async (html: string) => {
  const pdf: Promise<Buffer> = new Promise((resolve, reject) => {
    htmlpdf
      .create(html, { timeout: PDF_GENERATION_TIMEOUT })
      .toBuffer((err: Error, buffor: Buffer) => {
        if (err !== null) {
          reject(err);
        }

        resolve(buffor);
      });
  });

  try {
    return await pdf;
  } catch (err) {
    throw new Error(`Error while creating PDF ${err}`);
  }
};
