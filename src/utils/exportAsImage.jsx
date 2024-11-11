import html2canvas from "html2canvas";

const exportAsImage = async (element, imageFileName, type) => {
  const html = document.getElementsByTagName("html")[0];
  const body = document.getElementsByTagName("body")[0];
  let htmlWidth = html.clientWidth;
  let bodyWidth = body.clientWidth;

  const newWidth = element.scrollWidth - element.clientWidth;

  if (newWidth > element.clientWidth) {
    htmlWidth += newWidth;
    bodyWidth += newWidth;
  }

  html.style.width = htmlWidth + "px";
  body.style.width = bodyWidth + "px";

  const canvas = await html2canvas(element, {
    useCORS: true,
    willReadFrequently: true,
  });

  const mimeType = type === "png" ? "image/png" : "image/jpeg";
  const image = canvas.toDataURL(mimeType, 1.0);
  const fileNameWithExtension = `${imageFileName}.${type}`;

  downloadImage(image, fileNameWithExtension);
  html.style.width = null;
  body.style.width = null;
  canvas.remove();
};

const downloadImage = (blob, fileName) => {
  const fakeLink = window.document.createElement("a");
  fakeLink.style = "display:none;";
  fakeLink.download = fileName;
  fakeLink.href = blob;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);
  fakeLink.remove();
};

export default exportAsImage;
