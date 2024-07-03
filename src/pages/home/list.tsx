import { Timestamp } from 'firebase/firestore';
import { ErrorPage, NotFound } from '..';
import useAllEntertainments from '../../hooks/useAllEntertainments';
import { Event, Floor, Place } from '../../types/firebase';
import dayjs from 'dayjs';
import EntertainmentCard from '../../components/atom/EntertainmentCard';
import { useEffect, useMemo, useState } from 'react';

type Props = { data: Event };

interface AllEntertainmentsData {
    building: Place;
    floor: Floor;
    id: string;
    name: string;
    explanation: string;
    imageURL: string;
    order: number;
    overview: string;
    date: {
        start: Timestamp;
        end: Timestamp;
    };
    place?: string;
    location?: {
        x: number;
        y: number;
    };
}

export default function TopListEntertainments(props: Props) {
    const id = props.data.id;
    const { data, isLoading, error } = useAllEntertainments(id);

    const groupedByHour: { [key: string]: AllEntertainmentsData[] } = {};

    data.forEach((event) => {
        const startDate = dayjs(new Date(event.date.start.seconds * 1000));
        const key = startDate.format('HH:mm');

        if (!groupedByHour[key]) {
            groupedByHour[key] = [];
        }

        groupedByHour[key].push(event);
    });

    const memoizedGroupedByHour = useMemo(() => groupedByHour, [data]);

    useEffect(() => {
        const now = dayjs(`2024-06-15 16:00`);
        const keys = Object.keys(memoizedGroupedByHour);
        const eventDate = dayjs(
            new Date(data[0]?.date.start.seconds * 1000)
        ).format('YYYY-MM-DD');
        const nearestKey = keys.reduce((a, b) => {
            const aDiff = Math.abs(now.diff(dayjs(`${eventDate} ${a}`)));
            const bDiff = Math.abs(now.diff(dayjs(`${eventDate} ${b}`)));
            return aDiff < bDiff ? a : b;
        });

        const target = document.getElementById(`hour-${nearestKey}`);
        if (target) {
            const insertContent = document.createElement('div');
            insertContent.id = 'now-bar';
            insertContent.className = 'flex gap-3 items-center';
            insertContent.innerHTML = `
                <div class='w-12 h-8 bg-primary flex justify-center items-center rounded-full'>
                    <p class='text-white text-sm font-bold'>今</p>
                </div>
                <div class='flex-1 h-1 bg-primary rounded-full'>
                </div>
            `;

            // 一番最後の場合は、afterで追加
            if (dayjs(now).isAfter(eventDate + ' ' + nearestKey)) {
                target.after(insertContent);
            } else {
                target.before(insertContent);
            }
        }
    }, []);

    if (error) return <ErrorPage />;

    if (isLoading) return;

    if (!data) return <NotFound />;

    return (
        <div className='mt-12 flex flex-col gap-10'>
            {Object.keys(memoizedGroupedByHour).map((key) => (
                <div key={key} className='flex gap-3' id={`hour-${key}`}>
                    <div className='p-2 bg-secondary w-12 h-12 flex justify-center items-center rounded-large'>
                        <p className='text-white text-sm font-bold'>{key}</p>
                    </div>
                    <div className='flex-1 flex gap-3 flex-col'>
                        {memoizedGroupedByHour[key].map((event) => (
                            <EntertainmentCard
                                d={{
                                    building: event.building,
                                    floor: event.floor,
                                    id: event.id,
                                    name: event.name,
                                    explanation: event.explanation,
                                    imageURL: event.imageURL,
                                    order: event.order,
                                    overview: event.overview,
                                    date: event.date,
                                    place: event.place,
                                    location: event.location,
                                }}
                                key={event.id}
                                isList
                                showStatus
                                isCompact
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
