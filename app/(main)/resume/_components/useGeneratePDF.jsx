"use client";

import { useState } from "react";
import html2pdf from "html2pdf.js/dist/html2pdf.min.js";

export function useGeneratePDF() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("resume-pdf");
      console.log("Found resume-pdf element?", element);
      if (!element) throw new Error("#resume-pdf element NOT found");
      const opt = {
        margin: 10,
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
     await new Promise((r) => setTimeout(r, 500));
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return { generatePDF, isGenerating };
}
