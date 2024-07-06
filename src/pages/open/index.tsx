import { useNavigate, useParams } from 'react-router-dom';
import usePlaces from '../../hooks/usePlaces';
import { ErrorPage, NotFound } from '..';
import { Spinner } from '@nextui-org/react';
import Head from '../../components/ui/Head';
import { Place } from '../../types/firebase';
import useEntertainment from '../../hooks/useEntertainment';
import EntertainmentCard from '../../components/atom/EntertainmentCard';
import dayjs from 'dayjs';

export default function Page() {
    const { eventId } = useParams<{ eventId: string }>();
    const { data, isLoading, error } = usePlaces(eventId!.toString());

    if (error) return <ErrorPage />;

    if (isLoading)
        return (
            <div className='flex justify-center mt-10'>
                <Spinner size='lg' />
            </div>
        );

    if (!data || !eventId) return <NotFound />;

    return (
        <>
            <Head
                title='開催中 催し物'
                subtitle='開催されている催し物一覧です。'
            />
            <Content data={data} eventId={eventId} />
        </>
    );
}

type ContentProps = {
    eventId: string;
    data: Place[];
};

function Content(props: ContentProps) {
    const events = props.data.map((place) => ({
        hook: useEntertainment(props.eventId, place.id),
        place: place,
    }));
    const navigate = useNavigate();

    let data = [];
    for (const event of events) {
        if (event.hook.data) {
            for (const floor of event.hook.data) {
                for (const entertainment of floor.events) {
                    data.push({
                        building: event.place,
                        floor: floor,
                        ...entertainment,
                    });
                }
            }
        }
    }

    function isEventStarted(startTime: Date, endTime: Date) {
        const now = dayjs();
        const start = dayjs(startTime);
        const end = dayjs(endTime);
        return now.isAfter(start) && now.isBefore(end);
    }

    data = data
        .filter(
            (d) =>
                !!d &&
                isEventStarted(
                    new Date(d.date.start.seconds * 1000),
                    new Date(d.date.end.seconds * 1000)
                )
        )
        .sort((a, b) => a.date.start.seconds - b.date.start.seconds);
    const isLoading = events.some((event) => event.hook.isLoading);

    if (isLoading)
        return (
            <div className='flex justify-center mt-10'>
                <Spinner size='lg' />
            </div>
        );

    if (data.length === 0)
        return (
            <>
                <div className='flex justify-center mt-16'>
                    <p>開催中の催し物はありません。</p>
                </div>
            </>
        );

    return (
        <div className='grid gap-8 grid-cols-1 mt-16'>
            {data.map((d) => (
                <EntertainmentCard
                    d={d}
                    key={d.id}
                    isList
                    navigate={(u, f) =>
                        navigate(
                            `/events/${props.eventId}/map?place=${u}&floor=${f}`
                        )
                    }
                />
            ))}
        </div>
    );
}
