export const exportToPDF = ({
  selectedDate,
  openSYPVal,
  totalSalesSYP,
  totalExpensesSYP,
  expectedSYP,
  actSYPVal,
  diffSYP,
  salesSYP,
  expensesSYP,
  openUSDVal,
  totalSalesUSD,
  totalExpensesUSD,
  expectedUSD,
  actUSDVal,
  diffUSD,
  salesUSD,
  expensesUSD
}) => {
  const formattedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : new Date().toLocaleDateString('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

  // إنشاء عنصر مؤقت لتنسيق التقرير
  const element = document.createElement('div');
  element.style.padding = '20px';
  element.style.fontFamily = "'Cairo', sans-serif";
  element.style.direction = 'rtl';
  element.style.color = '#1e293b';

  element.innerHTML = `
    <div style="text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 20px;">
      <h1 style="margin: 0; font-size: 22px; color: #0f172a; font-weight: 800;">تقرير حاسبة الصندوق اليومية (ليرة / دولار)</h1>
      <p style="margin: 5px 0 0; font-size: 13px; color: #475569; font-weight: 600;">التاريخ: ${formattedDate}</p>
    </div>

    <!-- ملخص الصندوقين -->
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; text-align: center;">
      <thead>
        <tr style="background-color: #f1f5f9;">
          <th style="border: 1px solid #cbd5e1; padding: 8px;">العملة</th>
          <th style="border: 1px solid #cbd5e1; padding: 8px;">فتح الصندوق</th>
          <th style="border: 1px solid #cbd5e1; padding: 8px;">إجمالي المبيعات</th>
          <th style="border: 1px solid #cbd5e1; padding: 8px;">إجمالي المصاريف</th>
          <th style="border: 1px solid #cbd5e1; padding: 8px;">الرصيد المتوقع</th>
          <th style="border: 1px solid #cbd5e1; padding: 8px;">الرصيد الفعلي بالدرج</th>
          <th style="border: 1px solid #cbd5e1; padding: 8px;">النتيجة / الفارق</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold;">ليرة سورية (SYP)</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">${openSYPVal.toLocaleString()} ل.س</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">${totalSalesSYP.toLocaleString()} ل.س</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">${totalExpensesSYP.toLocaleString()} ل.س</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">${expectedSYP.toLocaleString()} ل.س</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">${actSYPVal.toLocaleString()} ل.س</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold;">${diffSYP >= 0 ? '+' : ''}${diffSYP.toLocaleString()} ل.س</td>
        </tr>
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold;">دولار أمريكي (USD)</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">$${openUSDVal.toLocaleString()}</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">$${totalSalesUSD.toLocaleString()}</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">$${totalExpensesUSD.toLocaleString()}</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">$${expectedUSD.toLocaleString()}</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">$${actUSDVal.toLocaleString()}</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold;">${diffUSD >= 0 ? '+' : ''}$${diffUSD.toLocaleString()}</td>
        </tr>
      </tbody>
    </table>

    <!-- تفاصيل الليرة السورية -->
    <div style="font-size: 14px; font-weight: 800; margin: 15px 0 8px; color: #0f172a;">1. تفاصيل حركة الليرة السورية (SYP)</div>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; text-align: center;">
      <thead>
        <tr style="background-color: #f1f5f9;">
          <th style="border: 1px solid #cbd5e1; padding: 8px;">مبلغ المبيع (ل.س)</th>
          <th style="border: 1px solid #cbd5e1; padding: 8px;">بيان المبيع</th>
          <th style="border: 1px solid #cbd5e1; padding: 8px;">مبلغ المصروف (ل.س)</th>
          <th style="border: 1px solid #cbd5e1; padding: 8px;">بيان المصروف</th>
        </tr>
      </thead>
      <tbody>
        ${Array.from({ length: Math.max(salesSYP.length, expensesSYP.length) }).map((_, i) => `
          <tr>
            <td style="border: 1px solid #cbd5e1; padding: 8px;">${salesSYP[i]?.amount ? parseFloat(salesSYP[i].amount).toLocaleString() : '-'}</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;">${salesSYP[i]?.note || '-'}</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;">${expensesSYP[i]?.amount ? parseFloat(expensesSYP[i].amount).toLocaleString() : '-'}</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;">${expensesSYP[i]?.note || '-'}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- تفاصيل الدولار -->
    <div style="font-size: 14px; font-weight: 800; margin: 15px 0 8px; color: #0f172a;">2. تفاصيل حركة الدولار الأمريكي (USD)</div>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; text-align: center;">
      <thead>
        <tr style="background-color: #f1f5f9;">
          <th style="border: 1px solid #cbd5e1; padding: 8px;">مبلغ المبيع ($)</th>
          <th style="border: 1px solid #cbd5e1; padding: 8px;">بيان المبيع</th>
          <th style="border: 1px solid #cbd5e1; padding: 8px;">مبلغ المصروف ($)</th>
          <th style="border: 1px solid #cbd5e1; padding: 8px;">بيان المصروف</th>
        </tr>
      </thead>
      <tbody>
        ${Array.from({ length: Math.max(salesUSD.length, expensesUSD.length) }).map((_, i) => `
          <tr>
            <td style="border: 1px solid #cbd5e1; padding: 8px;">${salesUSD[i]?.amount ? '$' + parseFloat(salesUSD[i].amount).toLocaleString() : '-'}</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;">${salesUSD[i]?.note || '-'}</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;">${expensesUSD[i]?.amount ? '$' + parseFloat(expensesUSD[i].amount).toLocaleString() : '-'}</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;">${expensesUSD[i]?.note || '-'}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div style="margin-top: 30px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px;">
      تم تطويره من قبل منير الحمصي 2026
    </div>
  `;

  // إعدادات تصدير الـ PDF
  const opt = {
    margin:       10,
    filename:     `تقرير_الصندوق_${selectedDate || 'اليومي'}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  // استدعاء التحميل المباشر للملف
  if (window.html2pdf) {
    window.html2pdf().set(opt).from(element).save();
  } else {
    alert('جاري تحميل مكتبة التصدير، يرجى المحاولة بعد ثوانٍ قليلة...');
  }
};