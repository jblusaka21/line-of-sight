import { Plus } from 'lucide-react';

interface ScenarioButtonsProps {
  onAddCases: (cases: number) => void;
}

export function ScenarioButtons({ onAddCases }: ScenarioButtonsProps) {
  const scenarios = [500, 1000, 1500];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200 animate-slideUp">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Scenarios</h3>
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {scenarios.map((cases) => (
          <button
            key={cases}
            onClick={() => onAddCases(cases)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95 transform hover:-translate-y-0.5"
          >
            <Plus size={18} />
            <span className="text-sm sm:text-base">+{cases}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-4">
        Click to add cases to Pending Orders and see the impact on LOS
      </p>
    </div>
  );
}
