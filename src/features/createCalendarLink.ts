import dayjs from 'dayjs';

export default function createCalendarLink(
    title: string,
    description: string,
    start: Date,
    end: Date
) {
    const startTime = dayjs(start).format('YYYY/MM/DD HH:MM:SS');
    const endTime = dayjs(end).format('YYYY/MM/DD HH:MM:SS');
    const text = `桐光学園｜${title}`;

    const link = `https://www.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${startTime}/${endTime}&details=${description}&location=JF3C+3W 川崎市、神奈川県`;

    return encodeURI(link);
}
