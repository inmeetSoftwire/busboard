
export function formatArrivalTime(seconds: number) : string {
    const minutes = Math.round(seconds / 60);
    if (minutes === 0) {
        return "Due";
    }
    return `${minutes} min${minutes !== 1 ? 's' : ''}`;
}
