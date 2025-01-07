import html2canvas from "html2canvas";

interface ExportAsImageProps {
  element: HTMLElement | null;
  imageFileName: string;
  type: string;
}

export const exportAsImage = async ({element, imageFileName, type}: ExportAsImageProps) => {
  const html = document.getElementsByTagName("html")[0];
  const body = document.getElementsByTagName("body")[0];
  let htmlWidth = html.clientWidth;
  let bodyWidth = body.clientWidth;

  const newWidth = element && element.scrollWidth - element.clientWidth;

  if (element && newWidth !== null && newWidth > element.clientWidth) {
    htmlWidth += newWidth;
    bodyWidth += newWidth;
  }

  html.style.width = htmlWidth + "px";
  body.style.width = bodyWidth + "px";

  if (!element) {
    throw new Error("Element is null");
  }
  const canvas = await html2canvas(element, {
    useCORS: true,
  });

  const mimeType = type === "png" ? "image/png" : "image/jpeg";
  const image = canvas.toDataURL(mimeType, 1.0);
  const fileNameWithExtension = `${imageFileName}.${type}`;

  downloadImage(image, fileNameWithExtension);
  html.style.width = "";
  body.style.width = "";
  canvas.remove();
};

const downloadImage = (blob: string, fileName: string) => {
  const fakeLink = window.document.createElement("a");
  fakeLink.style.display = "none";
  fakeLink.download = fileName;
  fakeLink.href = blob;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);
  fakeLink.remove();
};
