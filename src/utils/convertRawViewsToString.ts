export const convertRawViewstoString = (
    labelValue: string | number,
    isSub = false
): string => {
    const num = typeof labelValue === 'string' ? Number(labelValue) : labelValue;
    if (isNaN(num) || num < 0) return '0';
    return num >= 1.0e9
        ? (num / 1.0e9).toFixed(0) + "B"
        : num >= 1.0e6
            ? (num / 1.0e6).toFixed(0) + "M"
            : num >= 1.0e3
                ? (num / 1.0e3).toFixed(isSub ? 2 : 0) + "K"
                : num.toString();
};