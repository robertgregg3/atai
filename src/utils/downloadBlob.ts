export interface DownloadBlobProps {
    blob: string;
    fileName: string;
}

export const downloadBlob = ({ blob, fileName }: DownloadBlobProps) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style.display = "none";
    fakeLink.download = fileName;
    fakeLink.href = blob;
  
    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);
    fakeLink.remove();
};