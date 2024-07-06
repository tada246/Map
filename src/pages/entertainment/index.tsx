import { useNavigate, useParams } from 'react-router-dom';
import usePlaces from '../../hooks/usePlaces';
import { ErrorPage, NotFound } from '..';
import { Divider, Spinner } from '@nextui-org/react';
import Head from '../../components/ui/Head';
import { Place } from '../../types/firebase';
import useEntertainment from '../../hooks/useEntertainment';
import EntertainmentCard from '../../components/atom/EntertainmentCard';

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
                title='催し物の一覧'
                subtitle='催し物の一覧です。お楽しみください。'
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
    data = data
        .filter((d) => !!d)
        .sort((a, b) => a.date.start.seconds - b.date.start.seconds);
    const isLoading = events.some((event) => event.hook.isLoading);

    if (isLoading)
        return (
            <div className='flex justify-center mt-10'>
                <Spinner size='lg' />
            </div>
        );

    return (
        <div className='mt-10'>
            <div className='flex h-12'>
                <div className='flex w-full flex-1 flex-col justify-center items-center'>
                    <p className='text-sm text-default-600'>場所の数</p>
                    <p className='font-bold'>{props.data.length} 箇所</p>
                </div>
                <Divider orientation='vertical' />
                <div className='flex w-full flex-1 flex-col justify-center items-center'>
                    <p className='text-sm text-default-600'>催し物の数</p>
                    <p className='font-bold'>{data.length} 件</p>
                </div>
                <Divider orientation='vertical' />
                <div className='flex w-full flex-1 flex-col justify-center items-center'>
                    <p className='text-sm text-default-600'>並び順</p>
                    <p className='font-bold'>開始順</p>
                </div>
            </div>
            <div className='grid gap-8 grid-cols-1 mt-6'>
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
        </div>
    );
}
