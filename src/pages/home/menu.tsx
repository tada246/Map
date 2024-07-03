import { ReactNode } from 'react';
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
import { Event } from '../../types/firebase';
import { Link } from 'react-router-dom';

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
        path: '/detail#form',
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

type Props = {
    data: Event;
};

export default function HomeMenu(props: Props) {
    const eventId = props.data.id;

    return (
        <div className='shadow-small p-4 mt-4 grid grid-cols-4 md:grid-cols-8 gap-4 rounded-large bg-white'>
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
    );
}
