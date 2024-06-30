import { useEffect, useState } from 'react';
import getRelativeTime from '../features/getRelativeTime';

export default function useRelativeTime(date: string | Date): string {
    const [relativeTime, setRelativeTime] = useState<string>(
        getRelativeTime(date)
    );

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRelativeTime(getRelativeTime(date));
        }, 10000);

        return () => clearInterval(intervalId);
    }, [date]);

    return relativeTime;
}
