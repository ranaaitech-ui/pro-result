import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Captures an HTML element and exports it as a high-fidelity PDF.
 * @param {HTMLElement} elementId The ID of the HTML element to capture
 * @param {Object} options Configuration like layout (portrait/landscape) & dimensions
 */
export const exportToPDF = async (elementId, options = { layout: 'portrait', format: 'A4' }) => {
    const element = document.getElementById(elementId);
    if (!element) throw new Error("Element not found");

    try {
        const canvas = await html2canvas(element, {
            scale: 2, // High resolution
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/png');

        // Determine orientation and format
        const orientation = options.layout === 'landscape' ? 'l' : 'p';
        const pdf = new jsPDF({
            orientation,
            unit: 'mm',
            format: options.format.toLowerCase(),
        });

        // Calculate dimensions
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(imgData);
        const imgRatio = imgProps.width / imgProps.height;

        let renderWidth = pdfWidth;
        let renderHeight = pdfWidth / imgRatio;

        if (renderHeight > pdfHeight) {
            renderHeight = pdfHeight;
            renderWidth = pdfHeight * imgRatio;
        }

        pdf.addImage(imgData, 'PNG', 0, 0, renderWidth, renderHeight);
        pdf.save('Result_Card.pdf');
        return true;
    } catch (error) {
        console.error("PDF Export Error:", error);
        throw error;
    }
};
