function convertToHebrewDate(dateString) {
    const parts = dateString.split('.');
    if (parts.length !== 3) {
        return "פורמט תאריך לא תקין";
    }

    const [day, month, year] = parts.map(Number);

    // יצירת תאריך בצורה בטוחה
    const jsDate = new Date(year, month - 1, day);

    const formatter = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return formatter.format(jsDate);
}

