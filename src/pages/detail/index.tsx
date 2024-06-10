import { Link, useParams } from 'react-router-dom';
import useEvent from '../../hooks/useEvent';
import { ErrorPage, NotFound } from '..';
import {
    Chip,
    Image,
    Spinner,
    Link as NextUILink,
    Button,
} from '@nextui-org/react';
import Head from '../../components/ui/Head';
import createCalendarLink from '../../features/createCalendarLink';
import getEventStatus from '../../features/getEventStatus';
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { IoLink, IoTime } from 'react-icons/io5';
import { shortLink } from '../../features/shortLink';

export default function Page() {
    const { eventId } = useParams<{ eventId: string }>();
    const { data, isLoading, error } = useEvent(eventId!.toString());

    if (error) return <ErrorPage />;

    if (isLoading)
        return (
            <div className='flex justify-center mt-10'>
                <Spinner size='lg' />
            </div>
        );

    if (!data) return <NotFound />;

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
        <div>
            <Head
                title='イベントについて'
                subtitle='イベントについての情報を掲載しています。'
            />
            <div className='mt-10'>
                <div className='shadow-small bg-default-50 rounded-large'>
                    <Image
                        src={data.imageURL}
                        alt={data.name}
                        width={1024}
                        height={512}
                        className='rounded-t-large aspect-video object-cover w-full'
                        radius='none'
                    />
                    <div className='p-6'>
                        <h1 className='text-2xl font-bold'>{data.name}</h1>
                        <div className='flex gap-3 mt-1'>
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
                                <div
                                    key={index}
                                    className='flex gap-2 items-center'
                                >
                                    <div className='flex gap-1 items-center w-32'>
                                        {item.icon}
                                        <p>{item.name}</p>
                                    </div>
                                    <div className='flex-1'>{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-6 p-6 shadow-small bg-default-50/50 rounded-large'>
                <h2 className='text-xl font-bold'>概要</h2>
                <div className='mt-2'>
                    {data.overview.split('\n').map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
            </div>
            <div className='mt-6 p-6 shadow-small bg-default-50/50 rounded-large'>
                <h2 className='text-xl font-bold'>このアプリについて</h2>
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
                    >
                        詳細はこちらから
                    </Button>
                </div>
            </div>
        </div>
    );
}
