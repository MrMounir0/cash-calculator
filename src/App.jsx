import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import CurrencySection from './components/CurrencySection';
import GrandSummary from './components/GrandSummary';
import Footer from './components/Footer';
import { exportToPDF } from './utils/pdfGenerator';

export default function App() {
  const [exchangeRate, setExchangeRate] = useState('15000');

  const [openingSYP, setOpeningSYP] = useState('');
  const [actualSYP, setActualSYP] = useState('');
  const [salesSYP, setSalesSYP] = useState([{ id: 1, amount: '', note: '' }]);
  const [expensesSYP, setExpensesSYP] = useState([{ id: 1, amount: '', note: '' }]);

  const [openingUSD, setOpeningUSD] = useState('');
  const [actualUSD, setActualUSD] = useState('');
  const [salesUSD, setSalesUSD] = useState([{ id: 1, amount: '', note: '' }]);
  const [expensesUSD, setExpensesUSD] = useState([{ id: 1, amount: '', note: '' }]);

  const totalSalesSYP = useMemo(() => salesSYP.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0), [salesSYP]);
  const totalExpensesSYP = useMemo(() => expensesSYP.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0), [expensesSYP]);
  
  const openSYPVal = parseFloat(openingSYP) || 0;
  const actSYPVal = parseFloat(actualSYP) || 0;
  const expectedSYP = openSYPVal + totalSalesSYP - totalExpensesSYP;
  const diffSYP = actSYPVal - expectedSYP;

  const totalSalesUSD = useMemo(() => salesUSD.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0), [salesUSD]);
  const totalExpensesUSD = useMemo(() => expensesUSD.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0), [expensesUSD]);
  
  const openUSDVal = parseFloat(openingUSD) || 0;
  const actUSDVal = parseFloat(actualUSD) || 0;
  const expectedUSD = openUSDVal + totalSalesUSD - totalExpensesUSD;
  const diffUSD = actUSDVal - expectedUSD;

  const rateVal = parseFloat(exchangeRate) || 1;
  const grandTotalSYP = expectedSYP + (expectedUSD * rateVal);

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

  const handlePDFExport = () => {
    exportToPDF({
      exchangeRate,
      openSYPVal, totalSalesSYP, totalExpensesSYP, expectedSYP, actSYPVal, diffSYP, salesSYP, expensesSYP,
      openUSDVal, totalSalesUSD, totalExpensesUSD, expectedUSD, actUSDVal, diffUSD, salesUSD, expensesUSD,
      grandTotalSYP
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-100 text-slate-800">
      <Header 
        exchangeRate={exchangeRate} 
        setExchangeRate={setExchangeRate} 
        onExportPDF={handlePDFExport} 
      />

      <main className="max-w-7xl mx-auto px-4 w-full flex-grow py-8 space-y-8">
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

        <GrandSummary 
          grandTotalSYP={grandTotalSYP}
          expectedSYP={expectedSYP}
          expectedUSD={expectedUSD}
          rateVal={rateVal}
        />
      </main>

      <Footer />
    </div>
  );
}