export function formatNumberWithSpaces(number) {
    try {
        let numStr = number.toString();
    
        // Use regular expressions to add spaces for every three digits from the right
        numStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    
        return numStr;
    } catch (_) {
        return number
    }
}

// order = [0, 1, 2] means year first, then month and day
export function parseDate(dateString, separator = "-", order = [0, 1, 2]) {
    if (!dateString)
        return null;

    const parts = dateString.split(separator);
    const year = parseInt(parts[order[0]], 10);
    const month = parseInt(parts[order[1]], 10) - 1;
    const day = parseInt(parts[order[2]], 10);

    return new Date(year, month, day);
}

export function formatDate(date) {
    if (!date) return null;
    const inputDate = new Date(date);
    const formattedDate = inputDate.toLocaleDateString('en-GB');
    return formattedDate;
}

export function formatAddress(address = [], selected = [1, 2, 3]) {
    const filteredArr =
        selected
            .map((index) => address[index - 1])
            .filter((item) => item !== undefined && item !== '');

    const result = filteredArr.join(' - ');

    return result;
}