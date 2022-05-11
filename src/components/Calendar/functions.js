function monthDays(month, year) {
    var date = new Date(year, month, 1);
    var days = {};

    while (date.getMonth() === month) {
        days[date.getDate()] = date.getDay();
        date.setDate(date.getDate() + 1);
    }

    return days;
}

export function daysFullMonth(month, year) {
    var weeks = [];
    var days = [];
    var mDays = monthDays(month, year);

    for (var day in mDays) {
        while (mDays[day] != days.length) {
            days.push("");
        }

        days.push(day);

        if (mDays[day] === 6 || parseInt(day) === Object.values(mDays).length) {
            weeks.push(days);
            days = [];
        }
    }

    if (weeks.length != 0) {
        while (weeks[weeks.length - 1].length !== 7) {
            weeks[weeks.length - 1].push("");
        }
        if (weeks.length < 6) {
            weeks[5] = [];
            while (weeks[5].length !== 7) {
                weeks[5].push("");
            }
        }
    }

    return weeks;
}
