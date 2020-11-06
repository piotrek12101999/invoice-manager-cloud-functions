import htmlpdf, { FileInfo } from "html-pdf";

const PDF_GENERATION_TIMEOUT = 45000;

export const createFile = async (html: string) => {
  const pdf: Promise<FileInfo> = new Promise((resolve, reject) => {
    htmlpdf
      .create(html, { timeout: PDF_GENERATION_TIMEOUT })
      .toFile((err: Error, file: FileInfo) => {
        if (err !== null) {
          reject(err);
        }

        resolve(file);
      });
  });

  try {
    return await pdf;
  } catch (err) {
    throw new Error(`Error while creating PDF ${err}`);
  }
};
