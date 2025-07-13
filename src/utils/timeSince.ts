export const timeSince = (date: Date | string) => {
    // Accepts Date or string, parses if needed
    let parsedDate: Date;
    if (typeof date === "string") {
        parsedDate = new Date(date);
        if (isNaN(parsedDate.valueOf())) return "Invalid date";
    } else if (date instanceof Date) {
        parsedDate = date;
    } else {
        return "Invalid date";
    }
    const seconds = Math.floor((new Date().valueOf() - parsedDate.valueOf()) / 1000);
    if (seconds < 0) return "0 seconds";

    let interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
};