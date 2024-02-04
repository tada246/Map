import { useAtom } from 'jotai';
import { eventInfo } from '../../features/atoms';
import {
    FaClock,
    FaLeftRight,
    FaLink,
    FaUpRightFromSquare,
} from 'react-icons/fa6';
import dayjs from 'dayjs';
import { shortLink } from '../../features/shortLink';

export default function Page() {
    const [eventData] = useAtom(eventInfo);
    const { data } = eventData;

    if (!data) {
        return <div />;
    }

    return (
        <div className='pt-6'>
            <img
                src={data.imageURL}
                alt=''
                className='w-full h-64 object-cover rounded-xl shadow'
            />
            <div className='mt-3'>
                <h1 className='font-bold text-2xl'>{data.name}</h1>
                <p className='text-sm'>{data.overview}</p>
            </div>
            <div className='mt-6 flex flex-col gap-3 p-5 bg-base-200 rounded-xl'>
                <div className='flex justify-between items-center gap-4'>
                    <div className='flex gap-1 items-center'>
                        <FaClock size={14} />
                        <p>開始時刻</p>
                    </div>
                    <div>
                        <p>
                            {dayjs(
                                new Date(data.date.start.seconds * 1000)
                            ).format('YYYY/MM/DD HH:mm')}
                        </p>
                    </div>
                </div>
                <hr className='border-b-1 border-accent-content/20' />
                <div className='flex justify-between items-center gap-4'>
                    <div className='flex gap-1 items-center'>
                        <FaClock size={14} />
                        <p>終了時刻</p>
                    </div>
                    <div>
                        <p>
                            {dayjs(
                                new Date(data.date.end.seconds * 1000)
                            ).format('YYYY/MM/DD HH:mm')}
                        </p>
                    </div>
                </div>
                <hr className='border-b-1 border-accent-content/20' />
                <div className='flex justify-between items-center gap-4'>
                    <div className='flex gap-1 items-center'>
                        <FaLeftRight size={14} />
                        <p>期間</p>
                    </div>
                    <div>
                        <p>
                            {dayjs(new Date(data.date.end.seconds * 1000)).diff(
                                dayjs(new Date(data.date.start.seconds * 1000)),
                                'm',
                                true
                            )}
                            分
                        </p>
                    </div>
                </div>
                <hr className='border-b-1 border-accent-content/20' />
                <div className='flex justify-between items-center gap-4'>
                    <div className='flex gap-1 items-center'>
                        <FaLink size={14} />
                        <p>リンク</p>
                    </div>
                    <div className='max-w-1/3'>
                        <a
                            href={data.link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='line-clamp-1 link link-primary w-full flex items-center gap-1'
                        >
                            <span>{shortLink(data.link)}</span>
                            <FaUpRightFromSquare size={10} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
