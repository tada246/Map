import { Spinner } from '@nextui-org/react';
import { ErrorPage } from '..';
import Head from '../../components/ui/Head';
import useEvents from '../../hooks/useEvents';
import { EventCard } from './card';

export default function Page() {
    const { data, isLoading, error } = useEvents();

    if (error || (!isLoading && data && data.length === 0)) {
        return <ErrorPage />;
    }

    return (
        <div>
            <Head
                title='イベント'
                subtitle='このアプリで利用できるイベント情報を掲載しています。'
            />
            {data && (
                <div className='grid md:grid-cols-2 grid-cols-1 gap-6 mt-10'>
                    {data.map((event) => (
                        <EventCard event={event} key={event.id} />
                    ))}
                </div>
            )}
            {isLoading && (
                <div className='flex justify-center mt-10'>
                    <Spinner size='lg' />
                </div>
            )}
        </div>
    );
}
