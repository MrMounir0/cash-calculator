import React from 'react';
import { Calculator, RefreshCw, FileText } from 'lucide-react';

export default function Header({ exchangeRate, setExchangeRate, onExportPDF }) {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600/30 p-3 rounded-2xl border border-indigo-400/20">
            <Calculator className="w-8 h-8 text-indigo-300" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black">حاسبة صندوق (ليرة / دولار)</h1>
            <p className="text-indigo-200 text-xs mt-1">حساب رصيد المتوقع والمطابقة الفورية بالليرة والدولار</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 px-3 py-2 rounded-xl">
            <RefreshCw className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-300 font-semibold">1$ =</span>
            <input
              type="number"
              value={exchangeRate}
              onChange={(e) => setExchangeRate(e.target.value)}
              className="w-24 bg-slate-900 border border-slate-700 text-amber-400 text-center font-bold text-sm rounded-lg p-1 outline-none focus:border-amber-400"
              placeholder="سعر الصرف"
            />
            <span className="text-xs text-slate-300">ل.س</span>
          </div>

          <button
            onClick={onExportPDF}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-5 rounded-xl shadow-md transition active:scale-95 text-sm"
          >
            <FileText className="w-5 h-5" />
            تصدير تقرير PDF
          </button>
        </div>
      </div>
    </header>
  );
}