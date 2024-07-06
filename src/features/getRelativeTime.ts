export default function getRelativeTime(date: string | Date): string {
    const now = new Date();
    const targetDate = new Date(date);
    const diffInSeconds = Math.floor(
        (now.getTime() - targetDate.getTime()) / 1000
    );

    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;
    const secondsInMonth = secondsInDay * 30;
    const secondsInYear = secondsInDay * 365;

    if (diffInSeconds < secondsInMinute) {
        return `${diffInSeconds}秒前`;
    } else if (diffInSeconds < secondsInHour) {
        const minutes = Math.floor(diffInSeconds / secondsInMinute);
        return `${minutes}分前`;
    } else if (diffInSeconds < secondsInDay) {
        const hours = Math.floor(diffInSeconds / secondsInHour);
        return `${hours}時間前`;
    } else if (diffInSeconds < secondsInMonth) {
        const days = Math.floor(diffInSeconds / secondsInDay);
        return `${days}日前`;
    } else if (diffInSeconds < secondsInYear) {
        const months = Math.floor(diffInSeconds / secondsInMonth);
        return `${months}ヶ月前`;
    } else {
        const years = Math.floor(diffInSeconds / secondsInYear);
        return `${years}年前`;
    }
}
