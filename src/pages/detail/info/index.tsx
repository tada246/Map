import { Link } from 'react-router-dom';
import { Link as NextUILink, Image, Chip, Button } from '@nextui-org/react';
import {
    createCalendarLink,
    createGoogleMapLink,
    createOpenStreetMapLink,
    createYahooMapLink,
} from '../../../features/createLink';
import getEventStatus from '../../../features/getEventStatus';
import { ReactNode } from 'react';
import { IoLink, IoLocate, IoLocation, IoTime } from 'react-icons/io5';
import dayjs from 'dayjs';
import { shortLink } from '../../../features/shortLink';
import { Event } from '../../../types/firebase';
import Markdown from '../../../components/atom/Markdown';

type Props = {
    data: Event;
};

export default function InfoContent(props: Props) {
    const { data } = props;

    const googleCalendarLink = createCalendarLink(
        data.name,
        data.overview,
        new Date(data.date.start.seconds * 1000),
        new Date(data.date.end.seconds * 1000),
        data.place?.name || undefined
    );
    const googleMapLink = createGoogleMapLink(
        data.place?.lat || 0,
        data.place?.lng || 0
    );
    const yahooMapLink = createYahooMapLink(
        data.place?.lat || 0,
        data.place?.lng || 0
    );
    const openStreetMapLink = createOpenStreetMapLink(
        data.place?.lat || 0,
        data.place?.lng || 0
    );

    const eventStatus = getEventStatus({
        start: new Date(data.date.start.seconds * 1000),
        end: new Date(data.date.end.seconds * 1000),
    });

    const detailsValue: {
        icon: ReactNode;
        name: string;
        value: ReactNode;
        show?: boolean;
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
        {
            icon: <IoLocation />,
            name: '場所',
            value: <p>{data.place?.name}</p>,
            show: !!data.place,
        },
        {
            icon: <IoLocate />,
            name: '外部マップ',
            value: (
                <div className='flex gap-2'>
                    <NextUILink
                        size='sm'
                        href={googleMapLink}
                        isExternal
                        showAnchorIcon
                    >
                        Google Map
                    </NextUILink>
                    <NextUILink
                        size='sm'
                        href={yahooMapLink}
                        isExternal
                        showAnchorIcon
                    >
                        Yahoo Map
                    </NextUILink>
                    <NextUILink
                        size='sm'
                        href={openStreetMapLink}
                        isExternal
                        showAnchorIcon
                    >
                        OpenStreetMap
                    </NextUILink>
                </div>
            ),
            show: !!data.place,
        },
    ];

    return (
        <div>
            <div
                className='shadow-medium rounded-large w-full'
                id='about-event'
            >
                <Image
                    src={data.imageURL}
                    alt={data.name}
                    className='w-full rounded-t-large aspect-auto'
                    radius='none'
                    style={{ width: '100%', height: 'auto' }}
                    width='full'
                    height='auto'
                    classNames={{
                        wrapper: 'w-full',
                    }}
                />
                <div className='p-5'>
                    <h1 className='text-3xl font-bold'>{data.name}</h1>
                    <div className='flex gap-3 mt-2'>
                        <Chip color='primary'>{eventStatus}</Chip>
                        <Chip>
                            {dayjs(data.date.start.seconds * 1000).format(
                                'YYYY/MM/DD'
                            )}
                        </Chip>
                    </div>
                    <div className='flex items-center gap-3'>
                        <NextUILink
                            size='sm'
                            href={googleCalendarLink}
                            isExternal
                            showAnchorIcon
                            className='mt-3'
                        >
                            Googleカレンダーに追加
                        </NextUILink>
                    </div>
                    <div className='flex flex-col gap-2 mt-4'>
                        {detailsValue.map(
                            (item, index) =>
                                (item.show === undefined || item.show) && (
                                    <div
                                        key={index}
                                        className='flex gap-2 items-center'
                                    >
                                        <div className='flex gap-2 items-center w-32'>
                                            <div>{item.icon}</div>
                                            <p>{item.name}</p>
                                        </div>
                                        <div className='flex-1'>
                                            {item.value}
                                        </div>
                                    </div>
                                )
                        )}
                    </div>
                </div>
            </div>
            <div className='mt-12 px-2'>
                <Markdown content={data.overview} />
            </div>
            <div className='mt-12 px-2'>
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
