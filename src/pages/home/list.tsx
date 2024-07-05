import { useNavigate, useParams } from 'react-router-dom';
import usePlaces from '../../hooks/usePlaces';
import { ErrorPage, NotFound } from '..';
import { Divider, Spinner } from '@nextui-org/react';
import Head from '../../components/ui/Head';
import { Event, Floor, Place } from '../../types/firebase';
import useEntertainment from '../../hooks/useEntertainment';
import EntertainmentCard from '../../components/atom/EntertainmentCard';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Timestamp } from 'firebase/firestore';

type Props = {
    eventId: string;
    data: Event;
};

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
    const { data, isLoading, error } = usePlaces(props.eventId);

    if (error) return <ErrorPage />;

    if (isLoading)
        return (
            <div className='flex justify-center mt-10'>
                <Spinner size='lg' />
            </div>
        );

    if (!data) return;

    return (
        <div className='mt-12'>
            <Content
                data={data}
                eventId={props.eventId}
                eventData={props.data}
            />
        </div>
    );
}

type ContentProps = {
    eventId: string;
    data: Place[];
    eventData: Event;
};

function Content(props: ContentProps) {
    const events = props.data.map((place) => ({
        hook: useEntertainment(props.eventId, place.id),
        place: place,
    }));
    const navigate = useNavigate();
    const [data, setDate] = useState<{
        [key: string]: AllEntertainmentsData[];
    } | null>(null);
    const [doneTimeBar, setDoneTimeBar] = useState<boolean>(false);

    const isLoading = events.some(
        (event) => event.hook.isLoading || !event.hook.data
    );
    const error = events.some((event) => event.hook.error);

    useEffect(() => {
        if (!events || data || isLoading) return;

        let _data = [];
        for (const event of events) {
            if (event.hook.data) {
                for (const floor of event.hook.data) {
                    for (const entertainment of floor.events) {
                        _data.push({
                            building: event.place,
                            floor: floor,
                            ...entertainment,
                        });
                    }
                }
            }
        }

        const groupedByHour: { [key: string]: AllEntertainmentsData[] } = {};

        _data.forEach((event) => {
            const startDate = dayjs(new Date(event.date.start.seconds * 1000));
            const key = startDate.format('HH:mm');

            if (!groupedByHour[key]) {
                groupedByHour[key] = [];
            }

            groupedByHour[key].push(event);
        });

        setDate(groupedByHour);
    }, [events]);

    useEffect(() => {
        if (!data || doneTimeBar) return;

        const now = dayjs();
        const keys = Object.keys(data);
        const eventDate = dayjs(
            new Date(props.eventData.date.start.seconds * 1000)
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

        setDoneTimeBar(true);
    }, [data]);

    if (isLoading) {
        return (
            <div className='flex justify-center'>
                <Spinner size='lg' />
            </div>
        );
    }

    if (error) {
        return <p className='mt-10 text-center'>エラーが発生しました。</p>;
    }

    if (!data) return;

    function formatTimeToNumber(time: string) {
        const [hour, minute] = time.split(':');
        if (!hour || !minute) return 0;
        return parseInt(hour) * 60 + parseInt(minute);
    }

    return (
        <div className='flex flex-col gap-12'>
            {Object.keys(data)
                .sort((a, b) => {
                    return formatTimeToNumber(a) - formatTimeToNumber(b);
                })
                .map((key) => (
                    <div key={key} className='flex gap-3' id={`hour-${key}`}>
                        <div className='p-2 bg-secondary w-10 h-10 md:w-12 md:h-12 flex justify-center items-center rounded-large'>
                            <p className='text-white text-tiny md:text-sm font-bold'>
                                {key}
                            </p>
                        </div>
                        <div className='flex-1 flex gap-3 flex-col'>
                            {data[key].map((event) => (
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
                                    navigate={(u, f) =>
                                        navigate(
                                            `/events/${props.eventId}/map?place=${u}&floor=${f}`
                                        )
                                    }
                                />
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    );
}
