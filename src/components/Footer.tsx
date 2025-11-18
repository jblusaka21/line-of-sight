export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 py-8 mt-16 border-t border-cyan-900/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-cyan-300 mb-3">SightFlow</h3>
            <p className="text-sm">
              Smart LOS forecasting for distributors and supply chain professionals.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-cyan-300 mb-3">Features</h3>
            <ul className="text-sm space-y-2">
              <li>Real-time LOS calculations</li>
              <li>Scenario simulations</li>
              <li>Offline support</li>
              <li>Export to PDF & CSV</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-cyan-300 mb-3">About</h3>
            <p className="text-sm">
              Designed to help distributors forecast line-of-sight performance efficiently and make data-driven decisions.
            </p>
          </div>
        </div>
        <div className="border-t border-cyan-900/30 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} SightFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
