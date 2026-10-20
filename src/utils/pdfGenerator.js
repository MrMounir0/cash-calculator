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
  // 1. تنسيق التاريخ المختار إلى نص عربي
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

  // 2. تجهيز محتوى الـ HTML المخصص للطباعة
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>تقرير حاسبة الصندوق اليومية</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Cairo', sans-serif;
          direction: rtl;
          padding: 20px;
          color: #1e293b;
          background: #fff;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 15px;
          margin-bottom: 20px;
        }
        .header h1 {
          margin: 0;
          font-size: 22px;
          color: #0f172a;
        }
        .header p {
          margin: 5px 0 0;
          font-size: 13px;
          color: #475569;
          font-weight: 600;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          font-size: 12px;
        }
        th, td {
          border: 1px solid #cbd5e1;
          padding: 8px 10px;
          text-align: center;
        }
        th {
          background-color: #f1f5f9;
          font-weight: 700;
        }
        .section-title {
          font-size: 14px;
          font-weight: 800;
          margin: 15px 0 8px;
          color: #0f172a;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 11px;
          color: #64748b;
          border-top: 1px solid #e2e8f0;
          padding-top: 10px;
        }
        @media print {
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>تقرير حاسبة الصندوق اليومية (ليرة / دولار)</h1>
        <p>التاريخ: ${formattedDate}</p>
      </div>

      <!-- ملخص الصندوقين -->
      <table>
        <thead>
          <tr>
            <th>العملة</th>
            <th>فتح الصندوق</th>
            <th>إجمالي المبيعات</th>
            <th>إجمالي المصاريف</th>
            <th>الرصيد المتوقع</th>
            <th>الرصيد الفعلي بالدرج</th>
            <th>النتيجة / الفارق</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ليرة سورية (SYP)</td>
            <td>${openSYPVal.toLocaleString()} ل.س</td>
            <td>${totalSalesSYP.toLocaleString()} ل.س</td>
            <td>${totalExpensesSYP.toLocaleString()} ل.س</td>
            <td>${expectedSYP.toLocaleString()} ل.س</td>
            <td>${actSYPVal.toLocaleString()} ل.س</td>
            <td>${diffSYP >= 0 ? '+' : ''}${diffSYP.toLocaleString()} ل.س</td>
          </tr>
          <tr>
            <td>دولار أمريكي (USD)</td>
            <td>$${openUSDVal.toLocaleString()}</td>
            <td>$${totalSalesUSD.toLocaleString()}</td>
            <td>$${totalExpensesUSD.toLocaleString()}</td>
            <td>$${expectedUSD.toLocaleString()}</td>
            <td>$${actUSDVal.toLocaleString()}</td>
            <td>${diffUSD >= 0 ? '+' : ''}$${diffUSD.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>

      <!-- تفاصيل الليرة السورية -->
      <div class="section-title">1. تفاصيل حركة الليرة السورية (SYP)</div>
      <table>
        <thead>
          <tr>
            <th>مبلغ المبيع (ل.س)</th>
            <th>بيان المبيع</th>
            <th>مبلغ المصروف (ل.س)</th>
            <th>بيان المصروف</th>
          </tr>
        </thead>
        <tbody>
          ${Array.from({ length: Math.max(salesSYP.length, expensesSYP.length) }).map((_, i) => `
            <tr>
              <td>${salesSYP[i]?.amount ? parseFloat(salesSYP[i].amount).toLocaleString() : '-'}</td>
              <td>${salesSYP[i]?.note || '-'}</td>
              <td>${expensesSYP[i]?.amount ? parseFloat(expensesSYP[i].amount).toLocaleString() : '-'}</td>
              <td>${expensesSYP[i]?.note || '-'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- تفاصيل الدولار -->
      <div class="section-title">2. تفاصيل حركة الدولار الأمريكي (USD)</div>
      <table>
        <thead>
          <tr>
            <th>مبلغ المبيع ($)</th>
            <th>بيان المبيع</th>
            <th>مبلغ المصروف ($)</th>
            <th>بيان المصروف</th>
          </tr>
        </thead>
        <tbody>
          ${Array.from({ length: Math.max(salesUSD.length, expensesUSD.length) }).map((_, i) => `
            <tr>
              <td>${salesUSD[i]?.amount ? '$' + parseFloat(salesUSD[i].amount).toLocaleString() : '-'}</td>
              <td>${salesUSD[i]?.note || '-'}</td>
              <td>${expensesUSD[i]?.amount ? '$' + parseFloat(expensesUSD[i].amount).toLocaleString() : '-'}</td>
              <td>${expensesUSD[i]?.note || '-'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="footer">
        تم تطويره من قبل منير الحمصي 2026
      </div>
    </body>
    </html>
  `;

  // 3. إنشاء إطار خفي (Iframe) لمنع حظر النافذة المنبثقة على المواقع المرفوعة
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(htmlContent);
  doc.close();

  // 4. الانتظار حتى اكتمال تحميل الخطوط والمكونات ثم استدعاء نافذة الطباعة
  iframe.contentWindow.focus();
  setTimeout(() => {
    iframe.contentWindow.print();
    // إزالة الإطار الخفي بعد إغلاق نافذة الطباعة
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  }, 500);
};