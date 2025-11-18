import { TrendingUp } from 'lucide-react';
import { LOSResult } from '../utils/calculations';

interface ResultsPanelProps {
  result: LOSResult;
}

export function ResultsPanel({ result }: ResultsPanelProps) {
  const stats = [
    {
      label: 'Sell Out (Cases)',
      value: result.sellOutCases.toFixed(2),
      unit: 'cases',
    },
    {
      label: 'Sell In (Cases)',
      value: result.sellInCases.toFixed(2),
      unit: 'cases',
    },
    {
      label: 'Cases Needed',
      value: result.casesNeeded.toFixed(0),
      unit: 'cases',
      highlight: true,
    },
    {
      label: 'New Sell Out (hl)',
      value: result.newSellOutHl.toFixed(2),
      unit: 'hl',
    },
    {
      label: 'New Sell Out (Cases)',
      value: result.newSellOutCases.toFixed(0),
      unit: 'cases',
    },
    {
      label: 'LOS After Selling',
      value: result.losAfterSelling.toFixed(2),
      unit: '%',
      highlight: true,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200 animate-slideUp">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <TrendingUp size={24} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Predictions</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border-2 transition-all ${
              stat.highlight
                ? 'bg-blue-50 border-blue-300 shadow-md'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <p className="text-sm text-slate-600 font-medium mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.highlight ? 'text-blue-700' : 'text-slate-900'}`}>
              {stat.value}
            </p>
            <p className="text-xs text-slate-500 mt-1">{stat.unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
