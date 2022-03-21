module.exports = (str) => {
    let d = 0;
    let time = parseInt(str);
    let letter;
    if (!isNaN(time)) {
        if (str.endsWith('s') && time <= 28 * 86400) {
            d = 1000 * time;
            letter = 's';
        }
        if (str.endsWith('m') && time <= 28 * 1440) {
            d = 60000 * time;
            letter = 'm';
        }
        else if (str.endsWith('h') && time <= 28 * 24) {
            d = 3600000 * time;
            letter = 'h';
        }
        else if (str.endsWith('d') && time <= 28) {
            d = 86400000 * time;
            letter = 'd';
        }
        else if (str.endsWith('w') && time <= 4) {
            d = 604800000 * time;
            letter = 'w';
        }
    }
    if (str == `${time.toString()}${letter}`)
        return d;
};