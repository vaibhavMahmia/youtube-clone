export const parseVideoDuration = (duration: string): string => {
    if (typeof duration !== "string") {
        duration = String(duration ?? "");
    }
    if (!duration || !duration.startsWith("PT")) return "0:00";
    const durationParts: string[] = duration
        .replace("PT", "")
        .replace("H", ":")
        .replace("M", ":")
        .replace("S", "")
        .split(":");

    // Pad missing parts to always have [hh, mm, ss]
    while (durationParts.length < 3) {
        durationParts.unshift("0");
    }
    // Ensure all are numbers and pad with 0 if needed
    const [hh, mm, ss] = durationParts.map((part) => part.padStart(2, "0"));
    if (hh !== "00") {
        return `${parseInt(hh)}:${mm}:${ss}`;
    }
    return `${mm}:${ss}`;
};