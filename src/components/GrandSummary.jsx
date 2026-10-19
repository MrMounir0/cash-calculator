import React from 'react';

export default function GrandSummary({ grandTotalSYP, expectedSYP, expectedUSD, rateVal }) {
  return (
    <section className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 rounded-3xl shadow-lg text-center">
      <span className="text-xs font-extrabold text-indigo-300 tracking-wider block mb-1">التقييم الكلي الشامل (المعادل بالليرة السورية)</span>
      <div className="text-3xl md:text-4xl font-black text-amber-400 my-2">
        {grandTotalSYP.toLocaleString()} <span className="text-lg text-white">ل.س</span>
      </div>
      <p className="text-xs text-slate-400 max-w-xl mx-auto">
        يشمل الرصيد المتوقع بالليرة السورية ({expectedSYP.toLocaleString()} ل.س) بالإضافة لقيمة رصيد الدولار (${expectedUSD.toLocaleString()}) بسعر صرف {rateVal.toLocaleString()} ل.س
      </p>
    </section>
  );
}