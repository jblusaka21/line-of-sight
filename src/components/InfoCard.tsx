import { HelpCircle, BookOpen } from 'lucide-react';

export function InfoCard() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg p-6 sm:p-8 border-2 border-blue-200 animate-slideUp">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <BookOpen size={24} className="text-blue-600 mt-1" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 mb-3">How SightFlow Works</h3>

          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">1. Enter Your Data</p>
              <p className="text-sm text-slate-600">Input your Sell Out, Sell In, and Desired LOS target to get started.</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">2. View Your Current LOS</p>
              <p className="text-sm text-slate-600">Instantly see your current line-of-sight percentage and whether you're meeting targets.</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">3. Analyze Scenarios</p>
              <p className="text-sm text-slate-600">Add pending orders or stock to simulate outcomes. See impact on your LOS instantly.</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">4. Export & Share</p>
              <p className="text-sm text-slate-600">Download reports as PDF for sharing or CSV for detailed analysis in spreadsheets.</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="text-xs text-slate-600">
              <span className="font-semibold">Tip:</span> LOS (Line of Sight) = (Sell Out / Sell In) × 100. Optimal range: 93-103%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
