import { Link } from 'react-router-dom';
import { Link as NextUILink, Image, Chip, Button } from '@nextui-org/react';
import createCalendarLink from '../../../features/createCalendarLink';
import getEventStatus from '../../../features/getEventStatus';
import { ReactNode } from 'react';
import { IoLink, IoTime } from 'react-icons/io5';
import dayjs from 'dayjs';
import { shortLink } from '../../../features/shortLink';
import { Event } from '../../../types/firebase';

type Props = {
    data: Event;
};

export default function InfoContent(props: Props) {
    const { data } = props;

    const googleCalendarLink = createCalendarLink(
        data.name,
        data.overview,
        new Date(data.date.start.seconds * 1000),
        new Date(data.date.end.seconds * 1000)
    );

    const eventStatus = getEventStatus({
        start: new Date(data.date.start.seconds * 1000),
        end: new Date(data.date.end.seconds * 1000),
    });

    const detailsValue: {
        icon: ReactNode;
        name: string;
        value: ReactNode;
    }[] = [
        {
            icon: <IoTime />,
            name: '開始時間',
            value: (
                <p>
                    {dayjs(data.date.start.seconds * 1000).format(
                        'YYYY/MM/DD HH:mm'
                    )}
                </p>
            ),
        },
        {
            icon: <IoTime />,
            name: '終了時間',
            value: (
                <p>
                    {dayjs(data.date.end.seconds * 1000).format(
                        'YYYY/MM/DD HH:mm'
                    )}
                </p>
            ),
        },
        {
            icon: <IoLink />,
            name: '詳細リンク',
            value: (
                <NextUILink
                    href={data.link}
                    isExternal
                    showAnchorIcon
                    color='primary'
                >
                    {shortLink(data.link)}
                </NextUILink>
            ),
        },
    ];

    return (
        <div className='px-2'>
            <Image
                src={data.imageURL}
                alt={data.name}
                width={1024}
                height={512}
                className=' aspect-video object-cover w-full'
                radius='lg'
            />
            <div className='mt-4'>
                <h1 className='text-3xl font-bold'>{data.name}</h1>
                <div className='flex gap-3 mt-2'>
                    <Chip color='primary'>{eventStatus}</Chip>
                    <Chip>
                        {dayjs(data.date.start.seconds * 1000).format(
                            'YYYY/MM/DD'
                        )}
                    </Chip>
                </div>
                <NextUILink
                    size='sm'
                    href={googleCalendarLink}
                    isExternal
                    showAnchorIcon
                    className='mt-3'
                >
                    Googleカレンダーに追加
                </NextUILink>
                <div className='flex flex-col gap-2 mt-4'>
                    {detailsValue.map((item, index) => (
                        <div key={index} className='flex gap-2 items-center'>
                            <div className='flex gap-2 items-center w-32'>
                                <div>{item.icon}</div>
                                <p>{item.name}</p>
                            </div>
                            <div className='flex-1'>{item.value}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-12'>
                <h2 className='text-2xl font-bold' id='about-event'>
                    概要
                </h2>
                <div className='mt-2'>
                    {data.overview.split('\n').map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
            </div>
            <div className='mt-12'>
                <h2 className='text-2xl font-bold' id='about-app'>
                    このアプリについて
                </h2>
                <div className='mt-2'>
                    <p>
                        桐光学園電子工学部TANEチームが行うTANEプロジェクトが運営しています。
                    </p>
                    <Button
                        as={Link}
                        to='/'
                        fullWidth
                        className='mt-2'
                        color='primary'
                        variant='faded'
                    >
                        詳細はこちらから
                    </Button>
                </div>
            </div>
        </div>
    );
}
