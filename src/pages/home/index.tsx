import { Button, Spinner } from '@nextui-org/react';
import {
    IoInformation,
    IoList,
    IoMap,
    IoQrCode,
    IoRocket,
    IoServer,
    IoSettings,
    IoShuffle,
} from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';
import useEvent from '../../hooks/useEvent';
import { ErrorPage, NotFound } from '..';
import { ReactNode } from 'react';

const menu: { path: string; name: string; icon: ReactNode }[] = [
    {
        name: 'マップ',
        path: '/map',
        icon: <IoMap size={20} />,
    },
    {
        name: '催し物',
        path: '/list',
        icon: <IoList size={20} />,
    },
    {
        name: 'イベント概要',
        path: '/detail',
        icon: <IoInformation size={20} />,
    },
    {
        name: 'アンケート',
        path: '/detail',
        icon: <IoServer size={20} />,
    },
    {
        name: 'ココドコ',
        path: '/qrcode',
        icon: <IoQrCode size={20} />,
    },
    {
        name: '開催中',
        path: '/list/open',
        icon: <IoShuffle size={20} />,
    },

    {
        name: '開催予定',
        path: '/list/coming',
        icon: <IoRocket size={20} />,
    },
    {
        name: '設定',
        path: '/settings',
        icon: <IoSettings size={20} />,
    },
];

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

    return (
        <div>
            <>
                <div
                    className='shadow-medium rounded-large relative h-64'
                    style={{
                        backgroundImage: `url(${data.imageURL}), linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 1))`,
                        backgroundBlendMode: 'color-burn',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className='p-4 absolute bottom-0'>
                        <p className='text-xl font-extrabold line-clamp-1'>
                            {data.name}
                        </p>
                        <p className='line-clamp-2 text-sm text-default-600'>
                            {data.overview}
                        </p>
                        <div className='flex justify-center gap-4 mt-2'>
                            <Button
                                className='w-full'
                                startContent={<IoList />}
                                variant='flat'
                                color='primary'
                                as={Link}
                                to={`/events/${eventId}/list`}
                            >
                                イベント一覧
                            </Button>
                            <Button
                                className='w-full'
                                startContent={<IoQrCode />}
                                variant='flat'
                                color='secondary'
                                as={Link}
                                to={`/events/${eventId}/qrcode`}
                            >
                                ココドコ
                            </Button>
                            <Button
                                isIconOnly
                                radius='full'
                                variant='flat'
                                as={Link}
                                to={`/events/${eventId}/detail`}
                            >
                                <IoInformation />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='shadow-small p-4 mt-6 grid grid-cols-4 md:grid-cols-8 gap-4 rounded-large'>
                    {menu.map((item, i) => (
                        <Link
                            to={`/events/${eventId}${item.path}`}
                            key={i}
                            className='w-full flex flex-col gap-1 items-center'
                        >
                            <div className='p-4 bg-default-100 rounded-full'>
                                {item.icon}
                            </div>
                            <p className='text-tiny text-center line-clamp-1'>
                                {item.name}
                            </p>
                        </Link>
                    ))}
                </div>
            </>
        </div>
    );
}
