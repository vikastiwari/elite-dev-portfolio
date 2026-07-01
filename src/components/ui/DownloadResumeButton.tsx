import React, { useState, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';
import ResumePDF from '../pdf/ResumePDF';

export default function DownloadResumeButton() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const blob = await pdf(<ResumePDF />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Vikas_Tiwari_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate PDF', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isClient) return null;

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className="px-6 py-3 bg-[var(--color-primary)] text-[#000000] font-bold rounded-full font-mono text-sm transition-all shadow-[0_0_20px_var(--color-primary)] opacity-90 hover:opacity-100 hover:scale-105 pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed border border-[var(--color-primary)]"
      data-testid="download-resume-btn"
    >
      {isGenerating ? (
        <span className="flex items-center gap-2">
          <i className="fa-solid fa-circle-notch fa-spin"></i> Generating...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <i className="fa-solid fa-file-pdf"></i> Download PDF
        </span>
      )}
    </button>
  );
}
