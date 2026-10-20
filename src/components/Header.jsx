import React from 'react';
import { Calculator, FileText, Calendar } from 'lucide-react';

export default function Header({ selectedDate, setSelectedDate, onExportPDF }) {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600/30 p-3 rounded-2xl border border-indigo-400/20">
            <Calculator className="w-8 h-8 text-indigo-300" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black">حاسبة صندوق (ليرة / دولار)</h1>
            <p className="text-indigo-200 text-xs mt-1">حساب الرصيد المتوقع والمطابقة الفورية بالليرة والدولار</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* حقل اختيار وتعديل التاريخ */}
          <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 px-3 py-2 rounded-xl">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-slate-200 text-xs md:text-sm font-semibold outline-none cursor-pointer"
            />
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