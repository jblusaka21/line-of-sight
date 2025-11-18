import { getStatusColor, getStatusTextColor } from '../utils/calculations';

interface LOSProgressBarProps {
  currentLos: number;
  desiredLos: number;
  status: string;
}

export function LOSProgressBar({ currentLos, desiredLos, status }: LOSProgressBarProps) {
  const percentage = Math.min((currentLos / (desiredLos + 15)) * 100, 100);
  const textColor = getStatusTextColor(status);
  const gradientClass = getStatusColor(status);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200 animate-slideUp">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-slate-900">LOS Progress</h3>
          <div className="text-right">
            <div className={`text-3xl font-bold ${textColor}`}>
              {currentLos.toFixed(2)}%
            </div>
            <div className="text-xs text-slate-500">Target: {desiredLos.toFixed(2)}%</div>
          </div>
        </div>
      </div>

      <div className="relative h-6 bg-slate-100 rounded-full overflow-hidden shadow-inner">
        <div
          className={`h-full bg-gradient-to-r ${gradientClass} transition-all duration-500 ease-out flex items-center justify-end pr-2`}
          style={{ width: `${Math.max(percentage, 5)}%` }}
        >
          {percentage > 10 && (
            <span className="text-xs font-bold text-white">{Math.round(percentage)}%</span>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-xs">
        <div className="text-center">
          <div className="text-red-600 font-semibold">Critical</div>
          <div className="text-slate-500">&lt;93%</div>
        </div>
        <div className="text-center">
          <div className="text-green-600 font-semibold">Optimal</div>
          <div className="text-slate-500">93–103%</div>
        </div>
        <div className="text-center">
          <div className="text-orange-600 font-semibold">Caution</div>
          <div className="text-slate-500">103–105%</div>
        </div>
        <div className="text-center">
          <div className="text-blue-600 font-semibold">High</div>
          <div className="text-slate-500">&gt;105%</div>
        </div>
      </div>
    </div>
  );
}
