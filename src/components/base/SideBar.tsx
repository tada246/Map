import { Button, Divider, Image } from '@nextui-org/react';
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import {
    IoArrowBackOutline,
    IoArrowForwardOutline,
    IoHelp,
    IoHome,
    IoInformation,
    IoList,
    IoMap,
    IoMegaphone,
    IoQrCode,
    IoRocket,
    IoServer,
    IoSettings,
    IoShuffle,
} from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useEvent from '../../hooks/useEvent';

type Menu = {
    name: string;
    shortName: string;
    icon: ReactNode;
    largeIcon: ReactNode;
    path: string;
    onlyDesktop: boolean;
};

const menu: Menu[] = [
    {
        name: 'ホーム',
        shortName: 'ホーム',
        icon: <IoHome />,
        largeIcon: <IoHome size={20} />,
        path: '/',
        onlyDesktop: false,
    },
    {
        name: 'マップ',
        shortName: 'マップ',
        icon: <IoMap />,
        largeIcon: <IoMap size={20} />,
        path: '/map',
        onlyDesktop: false,
    },
    {
        name: 'ココドコ（QRコード）',
        shortName: 'ココドコ',
        icon: <IoQrCode />,
        largeIcon: <IoQrCode size={20} />,
        path: '/qrcode',
        onlyDesktop: true,
    },
    {
        name: 'リアルタイムアナウンス',
        shortName: 'アナウンス',
        icon: <IoMegaphone />,
        largeIcon: <IoMegaphone size={20} />,
        path: '/messages',
        onlyDesktop: false,
    },
    {
        name: '催し物リスト',
        shortName: '催し物',
        icon: <IoList />,
        largeIcon: <IoList size={20} />,
        path: '/list',
        onlyDesktop: false,
    },
    {
        name: '開催中',
        shortName: '開催中',
        icon: <IoShuffle />,
        largeIcon: <IoShuffle size={20} />,
        path: '/list/open',
        onlyDesktop: true,
    },
    {
        name: '開催予定',
        shortName: '開催予定',
        icon: <IoRocket />,
        largeIcon: <IoRocket size={20} />,
        path: '/list/coming',
        onlyDesktop: true,
    },
    {
        name: '概要',
        shortName: '概要',
        icon: <IoInformation />,
        largeIcon: <IoInformation size={20} />,
        path: '/detail',
        onlyDesktop: false,
    },
    {
        name: 'アンケート',
        shortName: '概要',
        icon: <IoServer />,
        largeIcon: <IoServer size={20} />,
        path: '/detail#form',
        onlyDesktop: true,
    },
    {
        name: '設定',
        shortName: '設定',
        icon: <IoSettings />,
        largeIcon: <IoSettings size={20} />,
        path: '/settings',
        onlyDesktop: true,
    },
];

export default function SideBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const eventId = location.pathname.split('/')[2];
    const { data } = useEvent(eventId);

    function isActivePath(path: string) {
        if (path === '/')
            return (
                location.pathname === `/events/${eventId}` ||
                location.pathname === `/events/${eventId}/`
            );
        return location.pathname.startsWith(`/events/${eventId}${path}`);
    }

    return (
        <div>
            <div className='w-60 md:block hidden'>
                <div className='w-60 border-r border-default h-screen fixed top-0 left-0 flex flex-col items-center py-4'>
                    <div className='w-52 flex-1'>
                        <div className='py-2 flex justify-center'>
                            <Image src='/tane-map-name.png' className=' w-40' />
                        </div>
                        <div className='border-t border-default mt-2'></div>
                        <ul className='w-full flex flex-col gap-1 mt-2'>
                            {menu.map((content, index) => (
                                <li key={index}>
                                    <Button
                                        color='default'
                                        variant={
                                            isActivePath(content.path)
                                                ? 'flat'
                                                : 'light'
                                        }
                                        fullWidth
                                        startContent={content.icon}
                                        as={Link}
                                        to={`/events/${eventId}${content.path}`}
                                        className='justify-start'
                                    >
                                        {content.name}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='w-52 flex flex-col gap-3'>
                        {data && (
                            <div className='w-full rounded-large shadow-medium p-4'>
                                <p className='text-center text-tiny'>
                                    {dayjs(
                                        data.date.start.seconds * 1000
                                    ).format('YYYY年MM月DD日')}
                                </p>
                                <div className='flex h-12 items-center space-x-4 text-small mt-2'>
                                    <div className='w-full'>
                                        <h3 className='text-center'>
                                            開始時刻
                                        </h3>
                                        <p className='text-lg font-bold text-center'>
                                            {dayjs(
                                                data.date.start.seconds * 1000
                                            ).format('HH:mm')}
                                        </p>
                                    </div>
                                    <Divider orientation='vertical' />
                                    <div className='w-full'>
                                        <h3 className='text-center'>
                                            終了時刻
                                        </h3>
                                        <p className='text-lg font-bold text-center'>
                                            {dayjs(
                                                data.date.end.seconds * 1000
                                            ).format('HH:mm')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className='w-full bg-default-900 rounded-medium flex justify-evenly items-center p-1 shadow-medium'>
                            <Button
                                variant='light'
                                isIconOnly
                                className='text-white'
                                size='sm'
                                onClick={() => navigate(-1)}
                            >
                                <IoArrowBackOutline />
                            </Button>
                            <Button
                                variant='light'
                                isIconOnly
                                className='text-white'
                                size='sm'
                                onClick={() => navigate(1)}
                            >
                                <IoArrowForwardOutline />
                            </Button>
                            <Divider
                                orientation='vertical'
                                className='bg-default-600 h-5'
                            />
                            <Button
                                variant='light'
                                isIconOnly
                                className='text-white'
                                size='sm'
                                as={Link}
                                to='/about'
                            >
                                <IoHelp />
                            </Button>
                            <Button
                                variant='light'
                                isIconOnly
                                className='text-white'
                                size='sm'
                                as={Link}
                                to='/'
                            >
                                <IoHome />
                            </Button>
                            <Divider
                                orientation='vertical'
                                className='bg-default-600 h-5'
                            />
                            <div className='text-white text-tiny px-2'>
                                {dayjs().format('HH:mm')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='md:hidden'>
                <div className='fixed bottom-0 w-full left-0 flex shadow-medium items-center px-2 bg-white/60 backdrop-blur z-50 h-[4.5rem]'>
                    {menu.map(
                        (content, index) =>
                            !content.onlyDesktop && (
                                <Link
                                    key={index}
                                    to={`/events/${eventId}${content.path}`}
                                    className={`flex-1 flex flex-col items-center justify-center ${
                                        isActivePath(content.path)
                                            ? 'text-primary font-bold'
                                            : 'text-default-500'
                                    }`}
                                >
                                    {content.largeIcon}
                                    <p className='text-tiny'>
                                        {content.shortName}
                                    </p>
                                </Link>
                            )
                    )}
                </div>
            </div>
        </div>
    );
}
