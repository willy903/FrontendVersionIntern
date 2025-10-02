import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FileText, Download } from 'lucide-react';
import {
  generateUseCaseDiagram,
  generateClassDiagram,
  generateSequenceDiagram,
  generateActivityDiagram,
  generateComponentDiagram
} from '../utils/umlDiagrams';

export default function UMLGenerator() {
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  React.useEffect(() => {
    if (canvasRefs.current[0]) {
      const ctx = canvasRefs.current[0].getContext('2d');
      if (ctx) generateUseCaseDiagram(ctx, 800, 650);
    }
    if (canvasRefs.current[1]) {
      const ctx = canvasRefs.current[1].getContext('2d');
      if (ctx) generateClassDiagram(ctx, 800, 500);
    }
    if (canvasRefs.current[2]) {
      const ctx = canvasRefs.current[2].getContext('2d');
      if (ctx) generateSequenceDiagram(ctx, 800, 600);
    }
    if (canvasRefs.current[3]) {
      const ctx = canvasRefs.current[3].getContext('2d');
      if (ctx) generateActivityDiagram(ctx, 800, 650);
    }
    if (canvasRefs.current[4]) {
      const ctx = canvasRefs.current[4].getContext('2d');
      if (ctx) generateComponentDiagram(ctx, 800, 600);
    }
  }, []);

  const generatePDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Diagrammes UML', pageWidth / 2, 20, { align: 'center' });

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Système de Gestion des Stagiaires', pageWidth / 2, 30, { align: 'center' });

    pdf.setFontSize(10);
    pdf.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')}`, pageWidth / 2, 40, { align: 'center' });

    pdf.setFontSize(12);
    pdf.text('Table des matières:', 20, 60);
    pdf.setFontSize(10);
    const toc = [
      '1. Diagramme de Cas d\'Utilisation',
      '2. Diagramme de Classes',
      '3. Diagramme de Séquence',
      '4. Diagramme d\'Activité',
      '5. Diagramme de Composants'
    ];
    toc.forEach((item, i) => {
      pdf.text(item, 25, 70 + i * 8);
    });

    for (let i = 0; i < canvasRefs.current.length; i++) {
      const canvas = canvasRefs.current[i];
      if (canvas) {
        pdf.addPage();

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pageWidth - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let yPos = 10;
        if (imgHeight > pageHeight - 20) {
          const scale = (pageHeight - 20) / imgHeight;
          const scaledWidth = imgWidth * scale;
          const scaledHeight = imgHeight * scale;
          pdf.addImage(imgData, 'PNG', (pageWidth - scaledWidth) / 2, yPos, scaledWidth, scaledHeight);
        } else {
          pdf.addImage(imgData, 'PNG', 10, yPos, imgWidth, imgHeight);
        }

        pdf.setFontSize(8);
        pdf.setTextColor(128, 128, 128);
        pdf.text(`Page ${i + 2} sur ${canvasRefs.current.length + 1}`, pageWidth / 2, pageHeight - 5, { align: 'center' });
        pdf.setTextColor(0, 0, 0);
      }
    }

    pdf.save('diagrammes-uml.pdf');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Diagrammes UML
            </h2>
          </div>
          <button
            onClick={generatePDF}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
          >
            <Download className="h-5 w-5" />
            <span>Télécharger PDF</span>
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Visualisez et téléchargez les 5 diagrammes UML de l'application de gestion des stagiaires.
        </p>

        <div className="space-y-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              1. Diagramme de Cas d'Utilisation
            </h3>
            <div className="overflow-x-auto">
              <canvas
                ref={(el) => (canvasRefs.current[0] = el)}
                width={800}
                height={650}
                className="border border-gray-300 dark:border-gray-600 rounded"
              />
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              2. Diagramme de Classes
            </h3>
            <div className="overflow-x-auto">
              <canvas
                ref={(el) => (canvasRefs.current[1] = el)}
                width={800}
                height={500}
                className="border border-gray-300 dark:border-gray-600 rounded"
              />
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              3. Diagramme de Séquence
            </h3>
            <div className="overflow-x-auto">
              <canvas
                ref={(el) => (canvasRefs.current[2] = el)}
                width={800}
                height={600}
                className="border border-gray-300 dark:border-gray-600 rounded"
              />
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              4. Diagramme d'Activité
            </h3>
            <div className="overflow-x-auto">
              <canvas
                ref={(el) => (canvasRefs.current[3] = el)}
                width={800}
                height={650}
                className="border border-gray-300 dark:border-gray-600 rounded"
              />
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              5. Diagramme de Composants
            </h3>
            <div className="overflow-x-auto">
              <canvas
                ref={(el) => (canvasRefs.current[4] = el)}
                width={800}
                height={600}
                className="border border-gray-300 dark:border-gray-600 rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
