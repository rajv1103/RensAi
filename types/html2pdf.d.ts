declare module "html2pdf.js/dist/html2pdf.min.js" {
  const html2pdf: {
    from: (element: HTMLElement) => {
      set: (options: {
        margin?: number | number[];
        filename?: string;
        image?: { type?: string; quality?: number };
        html2canvas?: object;
        jsPDF?: object;
      }) => {
        save: () => void;
      };
    };
  };
  export default html2pdf;
}
