export function dateToISOString(date: Date | null | undefined): string {
    if (date) {
        return date.toISOString().slice(0,16);
    }
    return "";
}

export function stringToDate(string: string): Date | null {
    if (string) {
        return new Date(Date.parse(string));
    }
    return null;
}