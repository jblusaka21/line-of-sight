import { getStatusColor, getStatusTextColor } from '../utils/calculations';

interface LOSProgressBarProps {
  currentLos: number;
  desiredLos: number;
  status: string;
}

export function LOSProgressBar({ currentLos, desiredLos, status }: LOSProgressBarProps) {
  const percentage = desiredLos > 0 ? Math.min((currentLos / (desiredLos + 15)) * 100, 100) : Math.min((currentLos / 110) * 100, 100);
  const textColor = getStatusTextColor(status);
  const gradientClass = getStatusColor(status);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8 border border-cyan-100 animate-slideUp">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-slate-900">LOS Progress</h3>
          <div className="text-right">
            <div className={`text-3xl font-bold ${textColor}`}>
              {currentLos.toFixed(2)}%
            </div>
            {desiredLos > 0 && (
              <div className="text-xs text-slate-500">Target: {desiredLos.toFixed(2)}%</div>
            )}
          </div>
        </div>
      </div>

      <div className="relative h-7 bg-gradient-to-r from-slate-100 to-slate-50 rounded-full overflow-hidden shadow-inner border border-slate-200">
        <div
          className={`h-full bg-gradient-to-r ${gradientClass} transition-all duration-500 ease-out flex items-center justify-end pr-2`}
          style={{ width: `${Math.max(percentage, 5)}%` }}
        >
          {percentage > 10 && (
            <span className="text-xs font-bold text-white">{Math.round(percentage)}%</span>
          )}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-2 text-xs">
        <div className="text-center p-2 rounded-lg bg-red-50 border border-red-100">
          <div className="text-red-600 font-semibold">Critical</div>
          <div className="text-slate-500">&lt;93%</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-green-50 border border-green-100">
          <div className="text-green-600 font-semibold">Optimal</div>
          <div className="text-slate-500">93–103%</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-orange-50 border border-orange-100">
          <div className="text-orange-600 font-semibold">Caution</div>
          <div className="text-slate-500">103–105%</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-cyan-50 border border-cyan-100">
          <div className="text-cyan-600 font-semibold">High</div>
          <div className="text-slate-500">&gt;105%</div>
        </div>
      </div>
    </div>
  );
}
