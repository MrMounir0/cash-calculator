import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import CurrencySection from './components/CurrencySection';
import Footer from './components/Footer';
import { exportToPDF } from './utils/pdfGenerator';
import { Trash2 } from 'lucide-react';

export default function App() {
  const todayStr = new Date().toISOString().split('T')[0];

  // 1. استرجاع البيانات المخزنة من localStorage أو استخدام القيم الافتراضية
  const [selectedDate, setSelectedDate] = useState(() => {
    return localStorage.getItem('cash_date') || todayStr;
  });

  // الليرة السورية
  const [openingSYP, setOpeningSYP] = useState(() => localStorage.getItem('cash_openingSYP') || '');
  const [actualSYP, setActualSYP] = useState(() => localStorage.getItem('cash_actualSYP') || '');
  const [salesSYP, setSalesSYP] = useState(() => {
    const saved = localStorage.getItem('cash_salesSYP');
    return saved ? JSON.parse(saved) : [{ id: 1, amount: '', note: '' }];
  });
  const [expensesSYP, setExpensesSYP] = useState(() => {
    const saved = localStorage.getItem('cash_expensesSYP');
    return saved ? JSON.parse(saved) : [{ id: 1, amount: '', note: '' }];
  });

  // الدولار الأمريكي
  const [openingUSD, setOpeningUSD] = useState(() => localStorage.getItem('cash_openingUSD') || '');
  const [actualUSD, setActualUSD] = useState(() => localStorage.getItem('cash_actualUSD') || '');
  const [salesUSD, setSalesUSD] = useState(() => {
    const saved = localStorage.getItem('cash_salesUSD');
    return saved ? JSON.parse(saved) : [{ id: 1, amount: '', note: '' }];
  });
  const [expensesUSD, setExpensesUSD] = useState(() => {
    const saved = localStorage.getItem('cash_expensesUSD');
    return saved ? JSON.parse(saved) : [{ id: 1, amount: '', note: '' }];
  });

  // 2. الحفظ التلقائي في localStorage عند حدوث أي تغيير
  useEffect(() => {
    localStorage.setItem('cash_date', selectedDate);
    localStorage.setItem('cash_openingSYP', openingSYP);
    localStorage.setItem('cash_actualSYP', actualSYP);
    localStorage.setItem('cash_salesSYP', JSON.stringify(salesSYP));
    localStorage.setItem('cash_expensesSYP', JSON.stringify(expensesSYP));

    localStorage.setItem('cash_openingUSD', openingUSD);
    localStorage.setItem('cash_actualUSD', actualUSD);
    localStorage.setItem('cash_salesUSD', JSON.stringify(salesUSD));
    localStorage.setItem('cash_expensesUSD', JSON.stringify(expensesUSD));
  }, [selectedDate, openingSYP, actualSYP, salesSYP, expensesSYP, openingUSD, actualUSD, salesUSD, expensesUSD]);

  // حسابات الليرة السورية
  const totalSalesSYP = useMemo(() => salesSYP.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0), [salesSYP]);
  const totalExpensesSYP = useMemo(() => expensesSYP.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0), [expensesSYP]);
  
  const openSYPVal = parseFloat(openingSYP) || 0;
  const actSYPVal = parseFloat(actualSYP) || 0;
  const expectedSYP = openSYPVal + totalSalesSYP - totalExpensesSYP;
  const diffSYP = actSYPVal - expectedSYP;

  // حسابات الدولار الأمريكي
  const totalSalesUSD = useMemo(() => salesUSD.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0), [salesUSD]);
  const totalExpensesUSD = useMemo(() => expensesUSD.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0), [expensesUSD]);
  
  const openUSDVal = parseFloat(openingUSD) || 0;
  const actUSDVal = parseFloat(actualUSD) || 0;
  const expectedUSD = openUSDVal + totalSalesUSD - totalExpensesUSD;
  const diffUSD = actUSDVal - expectedUSD;

  const handleAddRow = (type, currency) => {
    const newItem = { id: Date.now(), amount: '', note: '' };
    if (currency === 'SYP') {
      if (type === 'sales') setSalesSYP([...salesSYP, newItem]);
      else setExpensesSYP([...expensesSYP, newItem]);
    } else {
      if (type === 'sales') setSalesUSD([...salesUSD, newItem]);
      else setExpensesUSD([...expensesUSD, newItem]);
    }
  };

  const handleRemoveRow = (type, currency, id) => {
    if (currency === 'SYP') {
      if (type === 'sales' && salesSYP.length > 1) setSalesSYP(salesSYP.filter(i => i.id !== id));
      if (type === 'expenses' && expensesSYP.length > 1) setExpensesSYP(expensesSYP.filter(i => i.id !== id));
    } else {
      if (type === 'sales' && salesUSD.length > 1) setSalesUSD(salesUSD.filter(i => i.id !== id));
      if (type === 'expenses' && expensesUSD.length > 1) setExpensesUSD(expensesUSD.filter(i => i.id !== id));
    }
  };

  const handleUpdateRow = (type, currency, id, field, value) => {
    const update = (list) => list.map(item => item.id === id ? { ...item, [field]: value } : item);
    if (currency === 'SYP') {
      if (type === 'sales') setSalesSYP(update(salesSYP));
      else setExpensesSYP(update(expensesSYP));
    } else {
      if (type === 'sales') setSalesUSD(update(salesUSD));
      else setExpensesUSD(update(expensesUSD));
    }
  };

  // دالة إفراغ المحتويات ومسح التخزين
  const handleClearAll = () => {
    if (window.confirm('هل أنت تأكد من رغبتك في إفراغ جميع المحتويات والبيانات المدخلة؟')) {
      localStorage.clear();
      setSelectedDate(todayStr);
      setOpeningSYP('');
      setActualSYP('');
      setSalesSYP([{ id: 1, amount: '', note: '' }]);
      setExpensesSYP([{ id: 1, amount: '', note: '' }]);

      setOpeningUSD('');
      setActualUSD('');
      setSalesUSD([{ id: 1, amount: '', note: '' }]);
      setExpensesUSD([{ id: 1, amount: '', note: '' }]);
    }
  };

  const handlePDFExport = () => {
    exportToPDF({
      selectedDate,
      openSYPVal, totalSalesSYP, totalExpensesSYP, expectedSYP, actSYPVal, diffSYP, salesSYP, expensesSYP,
      openUSDVal, totalSalesUSD, totalExpensesUSD, expectedUSD, actUSDVal, diffUSD, salesUSD, expensesUSD
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-100 text-slate-800">
      <Header 
        selectedDate={selectedDate} 
        setSelectedDate={setSelectedDate} 
        onExportPDF={handlePDFExport} 
      />

      <main className="max-w-7xl mx-auto px-4 w-full flex-grow py-8 space-y-8">
        {/* صندوق الليرة السورية */}
        <CurrencySection
          title="صندوق الليرة السورية (SYP)"
          badgeText="العملة المحلية"
          currencySymbol="ل.س"
          themeColor="emerald"
          openingBalance={openingSYP}
          setOpeningBalance={setOpeningSYP}
          actualBalance={actualSYP}
          setActualBalance={setActualSYP}
          sales={salesSYP}
          expenses={expensesSYP}
          totalSales={totalSalesSYP}
          totalExpenses={totalExpensesSYP}
          expectedBalance={expectedSYP}
          actualVal={actSYPVal}
          diff={diffSYP}
          onAddRow={(type) => handleAddRow(type, 'SYP')}
          onRemoveRow={(type, id) => handleRemoveRow(type, 'SYP', id)}
          onUpdateRow={(type, id, field, value) => handleUpdateRow(type, 'SYP', id, field, value)}
        />

        {/* صندوق الدولار الأمريكي */}
        <CurrencySection
          title="صندوق الدولار الأمريكي (USD)"
          badgeText="العملة الأجنبية"
          currencySymbol="$"
          themeColor="blue"
          openingBalance={openingUSD}
          setOpeningBalance={setOpeningUSD}
          actualBalance={actualUSD}
          setActualBalance={setActualUSD}
          sales={salesUSD}
          expenses={expensesUSD}
          totalSales={totalSalesUSD}
          totalExpenses={totalExpensesUSD}
          expectedBalance={expectedUSD}
          actualVal={actUSDVal}
          diff={diffUSD}
          onAddRow={(type) => handleAddRow(type, 'USD')}
          onRemoveRow={(type, id) => handleRemoveRow(type, 'USD', id)}
          onUpdateRow={(type, id, field, value) => handleUpdateRow(type, 'USD', id, field, value)}
        />

        {/* زر إفراغ المحتويات بالأحمر في أسفل الصفحة */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transition active:scale-95 text-sm md:text-base"
          >
            <Trash2 className="w-5 h-5" />
            إفراغ المحتويات
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}