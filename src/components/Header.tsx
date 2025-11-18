import { TrendingUp } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg animate-fadeIn">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white bg-opacity-20 rounded-lg">
            <TrendingUp size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">SightFlow</h1>
            <p className="text-blue-100 text-sm sm:text-base">Line of Sight Predictor</p>
          </div>
        </div>
        <p className="text-blue-100 text-sm sm:text-base mt-3 max-w-2xl">
          Smart LOS forecasting for distributors — Predict, simulate, and optimize your line-of-sight performance
        </p>
      </div>
    </header>
  );
}
