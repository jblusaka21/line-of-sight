import { Download, FileText } from 'lucide-react';
import { exportPDF, exportCSV } from '../utils/export';
import { LOSResult } from '../utils/calculations';

interface ExportButtonsProps {
  sellOutHl: number;
  sellInHl: number;
  desiredLos: number;
  result: LOSResult;
}

export function ExportButtons({
  sellOutHl,
  sellInHl,
  desiredLos,
  result,
}: ExportButtonsProps) {
  const handleExportPDF = async () => {
    try {
      await exportPDF({
        sellOutHl,
        sellInHl,
        desiredLos,
        result,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF');
    }
  };

  const handleExportCSV = () => {
    try {
      exportCSV({
        sellOutHl,
        sellInHl,
        desiredLos,
        result,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Failed to export CSV');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200 animate-slideUp">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Export Report</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <button
          onClick={handleExportPDF}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95 transform hover:-translate-y-0.5"
        >
          <FileText size={18} />
          <span className="text-sm sm:text-base">Export PDF</span>
        </button>
        <button
          onClick={handleExportCSV}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95 transform hover:-translate-y-0.5"
        >
          <Download size={18} />
          <span className="text-sm sm:text-base">Export CSV</span>
        </button>
      </div>
      <p className="text-xs text-slate-500 mt-4">
        Download your LOS report and predictions for offline use or sharing
      </p>
    </div>
  );
}
