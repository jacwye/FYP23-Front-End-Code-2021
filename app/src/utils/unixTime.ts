/**
 * Returns a formatted string containing the time from a given timestamp
 * @param unix_timestamp The timestamp in ISO-8601 format
 */
export const getTime = (unix_timestamp: number) => {
    if (!unix_timestamp) return "unknown";
    const datetime = new Date(unix_timestamp * 1000);
    const hours = datetime.getHours();
    const minutes = "0" + datetime.getMinutes();
    const seconds = "0" + datetime.getSeconds();
    return hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
};

/**
 * Returns a formatted string containing the date from a given timestamp
 * @param unix_timestamp The timestamp in ISO-8601 format
 */
export const getDate = (unix_timestamp: number) => {
    if (!unix_timestamp) return "unknown";
    const datetime = new Date(unix_timestamp * 1000);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const year = datetime.getFullYear();
    const month = months[datetime.getMonth()];
    const date = datetime.getDate();
    return date + " " + month + " " + year;
};
