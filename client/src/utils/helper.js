function convertTimeNumber(time) {
    return (time.toString().length >= 2 ? time.toString() : '0' + time);
}

export function formatUrlDateString(date) {
    let tempDate = new Date(date);

    let yearStr = convertTimeNumber(tempDate.getFullYear());
    let monthStr = convertTimeNumber(tempDate.getMonth() + 1);
    let dayStr = convertTimeNumber(tempDate.getDate());
    
    return yearStr + monthStr + dayStr;
}

export function formatUrlTimeString(time) {
    let tempTime = new Date(time);

    let hourStr = convertTimeNumber(tempTime.getHours());
    let minuteStr = convertTimeNumber(tempTime.getMinutes());
    let secondStr = convertTimeNumber(tempTime.getSeconds());

    return hourStr + minuteStr + secondStr;
}