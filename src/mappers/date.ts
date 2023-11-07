export function dateToISOString(date: Date | null | undefined): string {
    if (date) {
        return date.toISOString().slice(0,16);
    }
    return "";
}

export function stringToDate(str: string | null): Date | null {
    if (str) {
        return new Date(Date.parse(str));
    }
    return null;
}