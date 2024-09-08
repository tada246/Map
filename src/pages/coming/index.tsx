import { useNavigate, useParams } from 'react-router-dom';
import usePlaces from '../../hooks/usePlaces';
import { ErrorPage, NotFound } from '..';
import { Spinner } from '@nextui-org/react';
import Head from '../../components/ui/Head';
import { Place } from '../../types/firebase';
import useEntertainment from '../../hooks/useEntertainment';
import EntertainmentCard from '../../components/atom/EntertainmentCard';
import dayjs from 'dayjs';
import useEvent from '../../hooks/useEvent';

export default function Page() {
    const { eventId } = useParams<{ eventId: string }>();
    const { data, isLoading, error } = usePlaces(eventId!.toString());
    const {
        data: eventData,
        isLoading: eventIsLoading,
        error: eventError,
    } = useEvent(eventId!.toString());

    if (error || eventError) return <ErrorPage />;

    if (isLoading || eventIsLoading)
        return (
            <div className='flex justify-center mt-10'>
                <Spinner size='lg' />
            </div>
        );

    if (!data || !eventId || !eventData) return <NotFound />;
    const date = dayjs(eventData?.date.start.seconds * 1000).format(
        'YYYY/MM/DD'
    );

    return (
        <>
            <Head
                title='開催予定 催し物'
                subtitle='まだ開催されていない催し物一覧です。お楽しみください。'
            />
            <Content data={data} eventId={eventId} eventTime={date} />
        </>
    );
}

type ContentProps = {
    eventId: string;
    data: Place[];
    eventTime: string;
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

    // 開催予定の催し物のみを抽出
    function isEventComing(startTime: number) {
        const now = dayjs();
        const start = dayjs(
            props.eventTime + dayjs(startTime).format('HH:mm:ss')
        );
        return start.isAfter(now);
    }

    data = data
        .filter((d) => !!d && isEventComing(d.date.start.seconds * 1000))
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
                    <p>開催予定の催し物はありません。</p>
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
