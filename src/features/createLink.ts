import dayjs from 'dayjs';

export function createCalendarLink(
    title: string,
    description: string,
    start: Date,
    end: Date,
    place?: string
) {
    const startTime = dayjs(start).format('YYYY/MM/DD HH:MM:SS');
    const endTime = dayjs(end).format('YYYY/MM/DD HH:MM:SS');
    const text = `桐光学園｜${title}`;

    const link = `https://www.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${startTime}/${endTime}&details=${description}&location=${
        place || 'JF3C+3W 川崎市、神奈川県'
    }`;

    return encodeURI(link);
}

export function createYahooMapLink(lat: number, lng: number) {
    return `https://map.yahoo.co.jp/?lat=${lat}&lon=${lng}&zoom=18&maptype=basic`;
}

export function createGoogleMapLink(lat: number, lng: number) {
    return `https://google.com/maps?q=${lat},${lng}`;
}

export function createOpenStreetMapLink(lat: number, lng: number) {
    return `https://www.openstreetmap.org/#map={ズームレベル}/${lat}/${lng}`;
}
