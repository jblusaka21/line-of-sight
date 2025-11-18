import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { getSuggestion, getStatusBgColor, getStatusTextColor } from '../utils/calculations';

interface SmartSuggestionsProps {
  status: string;
  currentLos: number;
  desiredLos: number;
}

export function SmartSuggestions({ status, currentLos, desiredLos }: SmartSuggestionsProps) {
  const suggestion = getSuggestion(status, currentLos, desiredLos);
  const bgColor = getStatusBgColor(status);
  const textColor = getStatusTextColor(status);

  const getIcon = () => {
    switch (status) {
      case 'critical':
        return <AlertCircle size={24} className="text-red-600" />;
      case 'optimal':
        return <CheckCircle size={24} className="text-green-600" />;
      case 'caution':
        return <AlertTriangle size={24} className="text-orange-600" />;
      case 'high':
        return <Info size={24} className="text-cyan-600" />;
      default:
        return <Info size={24} className="text-slate-600" />;
    }
  };

  return (
    <div className={`rounded-xl shadow-xl p-6 sm:p-8 border-2 ${bgColor} animate-slideUp backdrop-blur-sm`}>
      <div className="flex gap-4">
        <div className="flex-shrink-0 pt-1">
          {getIcon()}
        </div>
        <div>
          <h3 className={`text-lg font-bold ${textColor} mb-2`}>
            {status === 'critical'
              ? 'Action Required'
              : status === 'optimal'
              ? 'Healthy LOS'
              : status === 'caution'
              ? 'Monitor Performance'
              : 'Attention Needed'}
          </h3>
          <p className={`text-sm ${textColor} opacity-90`}>{suggestion}</p>
        </div>
      </div>
    </div>
  );
}
