import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { InputCard } from './components/InputCard';
import { LOSProgressBar } from './components/LOSProgressBar';
import { SmartSuggestions } from './components/SmartSuggestions';
import { ResultsPanel } from './components/ResultsPanel';
import { ScenarioButtons } from './components/ScenarioButtons';
import { ExportButtons } from './components/ExportButtons';
import { Footer } from './components/Footer';
import { calculateLOS } from './utils/calculations';

export default function App() {
  const [sellOutHl, setSellOutHl] = useState<string>('');
  const [sellInHl, setSellInHl] = useState<string>('');
  const [desiredLos, setDesiredLos] = useState<string>('');
  const [pendingOrders, setPendingOrders] = useState<string>('');
  const [receivedStock, setReceivedStock] = useState<string>('');

  const result = useMemo(() => {
    return calculateLOS({
      sellOutHl: parseFloat(sellOutHl) || 0,
      sellInHl: parseFloat(sellInHl) || 0,
      desiredLos: parseFloat(desiredLos) || 0,
      pendingOrders: parseFloat(pendingOrders) || 0,
      receivedStock: parseFloat(receivedStock) || 0,
    });
  }, [sellOutHl, sellInHl, desiredLos, pendingOrders, receivedStock]);

  const hasValidInputs = sellOutHl && sellInHl && desiredLos;

  const handleAddCases = (cases: number) => {
    const current = parseFloat(pendingOrders) || 0;
    setPendingOrders((current + cases).toString());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <InputCard
              sellOutHl={sellOutHl}
              setSellOutHl={setSellOutHl}
              sellInHl={sellInHl}
              setSellInHl={setSellInHl}
              desiredLos={desiredLos}
              setDesiredLos={setDesiredLos}
              pendingOrders={pendingOrders}
              setPendingOrders={setPendingOrders}
              receivedStock={receivedStock}
              setReceivedStock={setReceivedStock}
            />

            {hasValidInputs && (
              <>
                <LOSProgressBar
                  currentLos={result.currentLos}
                  desiredLos={result.desiredLos}
                  status={result.losStatus}
                />

                <ResultsPanel result={result} />

                <ScenarioButtons onAddCases={handleAddCases} />

                <ExportButtons
                  sellOutHl={parseFloat(sellOutHl)}
                  sellInHl={parseFloat(sellInHl)}
                  desiredLos={parseFloat(desiredLos)}
                  result={result}
                />
              </>
            )}

            {!hasValidInputs && (
              <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-dashed border-slate-300 text-center animate-slideUp">
                <p className="text-slate-500 text-lg font-medium">
                  Enter Sell Out, Sell In, and Desired LOS to see predictions
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Suggestions */}
          {hasValidInputs && (
            <div className="lg:col-span-1 space-y-6 sm:space-y-8">
              <SmartSuggestions
                status={result.losStatus}
                currentLos={result.currentLos}
                desiredLos={result.desiredLos}
              />

              <div className="bg-slate-900 text-slate-100 rounded-xl shadow-lg p-6 space-y-4 animate-slideUp">
                <h3 className="text-lg font-bold">Key Metrics</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-400">Current LOS</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {result.currentLos.toFixed(2)}%
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-700">
                    <p className="text-sm text-slate-400">Predicted LOS</p>
                    <p className="text-2xl font-bold text-green-400">
                      {result.predictedLos.toFixed(2)}%
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-700">
                    <p className="text-sm text-slate-400">Cases to Target</p>
                    <p className="text-2xl font-bold text-orange-400">
                      {result.casesNeeded.toFixed(0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
