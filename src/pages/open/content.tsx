import { Spinner } from '@nextui-org/react';
import { ErrorPage, NotFound } from '..';
import useAllEntertainments from '../../hooks/useAllEntertainments';
import dayjs from 'dayjs';
import EntertainmentCard from '../../components/atom/EntertainmentCard';

type Props = {
    eventId: string;
    className?: string;
};

export default function OpenEntertainmentContent(props: Props) {
    const { data, isLoading, error } = useAllEntertainments(props.eventId);

    if (error) return <ErrorPage />;

    if (isLoading) {
        return (
            <div className='flex justify-center mt-10'>
                <Spinner size='lg' />
            </div>
        );
    }

    if (!data) return <NotFound />;

    const filteredData = data.filter(
        (entertainment) =>
            dayjs(new Date(entertainment.date.start.seconds * 1000)).isBefore(
                dayjs()
            ) &&
            dayjs(new Date(entertainment.date.end.seconds * 1000)).isAfter(
                dayjs()
            )
    );

    if (filteredData.length === 0)
        return (
            <div className={props.className}>
                <p className='text-center'>
                    現在開催中の催し物の一覧はありません。
                </p>
            </div>
        );

    return (
        <div className={`grid gap-8 grid-cols-1 mt-6 ${props.className}`}>
            {filteredData.map((d) => (
                <EntertainmentCard d={d} key={d.id} isList />
            ))}
        </div>
    );
}
