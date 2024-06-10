import dayjs from 'dayjs';
import useWindowSize from '../../hooks/useWindowSize';
import { IoMap } from 'react-icons/io5';
import { Event } from '../../types/firebase';

type Props = {
    event: Event;
};

export default function MapIsland(props: Props) {
    const [width] = useWindowSize();
    const { event } = props;

    if (width >= 768) {
        return;
    }

    return (
        <div className='bg-default-900 fixed w-[calc(100%-3rem)] -translate-x-1/2 top-4 h-16 left-1/2 rounded-full shadow-medium px-6 flex gap-4 items-center'>
            <div className='text-white'>
                <IoMap size={20} />
            </div>
            <div className='flex-1 flex-col justify-center gap-0'>
                <p className='text-white text-tiny'>
                    {dayjs(event.date.start.seconds * 1000).format(
                        'MM/DD HH:mm'
                    )}{' '}
                    ~ {dayjs(event.date.end.seconds * 1000).format('HH:mm')}
                </p>
                <p className='text-white font-bold line-clamp-1 w-full'>
                    {event.name}
                </p>
            </div>
        </div>
    );
}
