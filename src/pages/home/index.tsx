import { Spinner } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import useEvent from '../../hooks/useEvent';
import { ErrorPage, NotFound } from '..';
import HomeTopContent from './top';
import HomeMenu from './menu';
import TopListEntertainments from './list';
import HomeChip from './chip';
import NoticeSection from './notice';
import StatusSection from './status';
import StampRallyAid from './stampRallyAid';

export default function Page() {
    const { eventId } = useParams<{ eventId: string }>();
    const { data, isLoading, error } = useEvent(eventId!.toString());

    if (error || !eventId) return <ErrorPage />;

    if (isLoading)
        return (
            <div className='flex justify-center mt-10'>
                <Spinner size='lg' />
            </div>
        );

    if (!data) return <NotFound />;

    return (
        <div>
            <StatusSection data={data} />
            <HomeTopContent data={data} />
            <HomeMenu data={data} />
            <NoticeSection />
            <StampRallyAid data={data} />
            <TopListEntertainments eventId={eventId} data={data} />
            <HomeChip />
        </div>
    );
}
