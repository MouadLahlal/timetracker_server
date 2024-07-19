function getDateString() {
    let today = new Date();
    let todayDate = today.getDate();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${todayDate < 10 ? `0${todayDate}` : todayDate}`;
}

export {
    getDateString
}