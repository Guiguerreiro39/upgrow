import { daySufix } from "./constants.js";

export function dayFormat(date) {
    var day = new Date(date).toDateString().split(" ");

    if (parseInt(day[2]) < 4) {
        day[4] = daySufix[parseInt(day[2]) - 1];
    } else {
        day[4] = daySufix[3];
    }

    return day;
}
