import * as pdfjsLib from 'pdfjs-dist';
// Explicitly import the worker url to use with Vite
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

/**
 * Converts the first page of a PDF file to a JPEG File object.
 * @param {File} file - The PDF File object
 * @returns {Promise<File>} - A Promise resolving to a JPEG File object
 */
export const convertPdfToImage = async (file) => {
  if (file.type !== 'application/pdf') {
    throw new Error('File is not a PDF');
  }

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const page = await pdf.getPage(1);
  
  // Use a scale of 2.0 for higher resolution thumbnail
  const viewport = page.getViewport({ scale: 2.0 });
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  
  // Render PDF page into canvas context
  const renderContext = {
    canvasContext: ctx,
    viewport: viewport,
  };
  
  await page.render(renderContext).promise;
  
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
        const jpgFile = new File([blob], newFileName, { type: 'image/jpeg' });
        resolve(jpgFile);
      } else {
        reject(new Error('Canvas to Blob conversion failed'));
      }
    }, 'image/jpeg', 0.9); // High quality JPEG
  });
};
