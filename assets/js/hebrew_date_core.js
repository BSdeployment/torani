(function (root) {
  'use strict';

  function numberToHebrewLetters(num) {
    if (num <= 0) return '';
    let hundreds = Math.floor(num / 100) * 100;
    let remainder = num % 100;
    let result = '';

    let h = hundreds;
    while (h >= 400) { result += 'ת'; h -= 400; }
    if (h === 300) { result += 'ש'; }
    else if (h === 200) { result += 'ר'; }
    else if (h === 100) { result += 'ק'; }

    if (remainder === 15) {
      result += 'טו';
    } else if (remainder === 16) {
      result += 'טז';
    } else {
      const tensMap = {90:'צ',80:'פ',70:'ע',60:'ס',50:'נ',40:'מ',30:'ל',20:'כ',10:'י'};
      const onesMap = {9:'ט',8:'ח',7:'ז',6:'ו',5:'ה',4:'ד',3:'ג',2:'ב',1:'א'};
      const tens = Math.floor(remainder / 10) * 10;
      const ones = remainder % 10;
      if (tens) result += tensMap[tens];
      if (ones) result += onesMap[ones];
    }
    return result;
  }

  function addGershayim(letters) {
    if (!letters) return letters;
    if (letters.length === 1) return letters + "'";
    return letters.slice(0, -1) + '"' + letters.slice(-1);
  }

  function parseInputDate(str) {
    // תומך בשני פורמטים: DD.MM.YYYY וגם YYYY-MM-DD
    let d, m, y;

    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
      [y, m, d] = str.split('-').map(Number);
    } else if (/^\d{2}\.\d{2}\.\d{4}$/.test(str)) {
      [d, m, y] = str.split('.').map(Number);
    } else {
      throw new Error('פורמט תאריך לא תקין, נדרש DD.MM.YYYY או YYYY-MM-DD');
    }

    if ([d, m, y].some(isNaN) || m < 1 || m > 12 || d < 1 || d > 31) {
      throw new Error('ערכי תאריך לא תקינים');
    }

    return new Date(y, m - 1, d);
  }

  function toHebrewDateString(gregorianDateStr) {
    const date = parseInputDate(gregorianDateStr);

    const formatter = new Intl.DateTimeFormat('he-u-ca-hebrew', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const parts = formatter.formatToParts(date);
    const dayNum = Number(parts.find(p => p.type === 'day').value);
    const monthName = parts.find(p => p.type === 'month').value;
    const yearNum = Number(parts.find(p => p.type === 'year').value);

    const dayHebrew = addGershayim(numberToHebrewLetters(dayNum));
    const yearHebrew = addGershayim(numberToHebrewLetters(yearNum % 1000));

    return `${dayHebrew} ${monthName} ${yearHebrew}`;
  }

  const api = { toHebrewDateString, numberToHebrewLetters, addGershayim };

  // תמיכה גם ב-Node.js (require) וגם בדפדפן (window)
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    root.HebrewDate = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);