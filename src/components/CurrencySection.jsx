import React from 'react';
import { Wallet, ArrowUpCircle, ArrowDownCircle, Plus, Trash2 } from 'lucide-react';

export default function CurrencySection({
  title,
  badgeText,
  currencySymbol,
  themeColor,
  openingBalance,
  setOpeningBalance,
  actualBalance,
  setActualBalance,
  sales,
  expenses,
  totalSales,
  totalExpenses,
  expectedBalance,
  actualVal,
  diff,
  onAddRow,
  onRemoveRow,
  onUpdateRow
}) {
  const isEmerald = themeColor === 'emerald';
  const borderClass = isEmerald ? 'border-emerald-200' : 'border-blue-200';
  const badgeClass = isEmerald ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800';
  const headerTextClass = isEmerald ? 'text-emerald-800' : 'text-blue-900';
  const btnSalesClass = isEmerald ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700';

  return (
    <section className={`bg-white p-6 rounded-3xl shadow-sm border ${borderClass}`}>
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
        <h2 className={`text-2xl font-black ${headerTextClass}`}>
          {title}
        </h2>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${badgeClass}`}>{badgeText}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <label className="text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
            <Wallet className="w-4 h-4 text-blue-600" />
            فتح صندوق ({currencySymbol}):
          </label>
          <input
            type="number"
            placeholder={`رصيد بداية اليوم بـ ${currencySymbol}...`}
            value={openingBalance}
            onChange={(e) => setOpeningBalance(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl font-bold text-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <label className="text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
            <Wallet className="w-4 h-4 text-purple-600" />
            الرصيد الحالي الموجود بالدرج ({currencySymbol}):
          </label>
          <input
            type="number"
            placeholder={`المبلغ الموجود بـ ${currencySymbol}...`}
            value={actualBalance}
            onChange={(e) => setActualBalance(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl font-bold text-lg outline-none focus:ring-2 focus:ring-purple-500 bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* المبيعات */}
        <div className="border border-slate-200 p-4 rounded-2xl bg-slate-50/50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-emerald-700 flex items-center gap-1.5">
              <ArrowUpCircle className="w-5 h-5 text-emerald-600" /> المبيعات ({currencySymbol})
            </h3>
            <button
              onClick={() => onAddRow('sales')}
              className={`${btnSalesClass} text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition`}
            >
              <Plus className="w-4 h-4" /> إضافة صف
            </button>
          </div>
          {sales.map((row) => (
            <div key={row.id} className="flex gap-2 mb-2">
              <input
                type="number"
                placeholder="المبلغ"
                value={row.amount}
                onChange={(e) => onUpdateRow('sales', row.id, 'amount', e.target.value)}
                className="w-1/3 p-2 border border-slate-300 rounded-lg font-semibold text-sm outline-none bg-white"
              />
              <input
                type="text"
                placeholder="القيد / البيان"
                value={row.note}
                onChange={(e) => onUpdateRow('sales', row.id, 'note', e.target.value)}
                className="w-2/3 p-2 border border-slate-300 rounded-lg text-sm outline-none bg-white"
              />
              <button onClick={() => onRemoveRow('sales', row.id)} className="text-rose-500 p-2 hover:bg-rose-50 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <div className="mt-3 text-left font-extrabold text-emerald-700 text-sm">
            إجمالي المبيعات: {totalSales.toLocaleString()} {currencySymbol}
          </div>
        </div>

        {/* المصاريف */}
        <div className="border border-slate-200 p-4 rounded-2xl bg-slate-50/50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-rose-700 flex items-center gap-1.5">
              <ArrowDownCircle className="w-5 h-5 text-rose-600" /> المصاريف والمسحوبات ({currencySymbol})
            </h3>
            <button
              onClick={() => onAddRow('expenses')}
              className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
            >
              <Plus className="w-4 h-4" /> إضافة صف
            </button>
          </div>
          {expenses.map((row) => (
            <div key={row.id} className="flex gap-2 mb-2">
              <input
                type="number"
                placeholder="المبلغ"
                value={row.amount}
                onChange={(e) => onUpdateRow('expenses', row.id, 'amount', e.target.value)}
                className="w-1/3 p-2 border border-slate-300 rounded-lg font-semibold text-sm outline-none bg-white"
              />
              <input
                type="text"
                placeholder="القيد / البيان"
                value={row.note}
                onChange={(e) => onUpdateRow('expenses', row.id, 'note', e.target.value)}
                className="w-2/3 p-2 border border-slate-300 rounded-lg text-sm outline-none bg-white"
              />
              <button onClick={() => onRemoveRow('expenses', row.id)} className="text-rose-500 p-2 hover:bg-rose-50 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <div className="mt-3 text-left font-extrabold text-rose-700 text-sm">
            إجمالي المصاريف: {totalExpenses.toLocaleString()} {currencySymbol}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-100 text-center">
        <div className="p-3 bg-slate-50 rounded-xl">
          <span className="text-xs text-slate-500 font-bold block">الرصيد المتوقع ({currencySymbol})</span>
          <span className="text-xl font-black text-slate-800">{expectedBalance.toLocaleString()} {currencySymbol}</span>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl">
          <span className="text-xs text-slate-500 font-bold block">الرصيد الفعلي بالدرج</span>
          <span className="text-xl font-black text-purple-700">{actualVal.toLocaleString()} {currencySymbol}</span>
        </div>
        <div className={`p-3 rounded-xl font-bold ${diff === 0 ? 'bg-emerald-100 text-emerald-800' : diff > 0 ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
          <span className="text-xs font-bold block">نتيجة المطابقة</span>
          <span className="text-xl font-black">{Math.abs(diff).toLocaleString()} {currencySymbol}</span>
          <span className="text-[11px] block mt-0.5">
            {diff === 0 ? 'الصندوق متطابق تماماً ✅' : diff > 0 ? 'يوجد فائض بالدرج ➕' : 'يوجد عجز بالدرج ➖'}
          </span>
        </div>
      </div>
    </section>
  );
}