import {
    FaCircleInfo,
    FaClipboardList,
    FaMapLocationDot,
} from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';
import useEventInfo from '../../hooks/useEventInfo';
import { useAtom } from 'jotai';
import { eventInfo as eventInfoAtom } from '../../features/atoms';
import { useEffect } from 'react';

export default function AppRoot({
    children,
    isWithoutPadding,
}: {
    children: React.ReactNode;
    isWithoutPadding?: boolean;
}) {
    const { pathname } = useLocation();
    const eventId = pathname.split('/')[2];
    const { data, isLoading, error } = useEventInfo(eventId);
    const [, setEventInfo] = useAtom(eventInfoAtom);

    useEffect(() => {
        if (data) {
            setEventInfo({ data: data, isLoading: isLoading, error: error });
        }
    }, [data, isLoading, error]);

    const BUTTON_ACTIVE_CLASS_NAME = 'active text-neutral/100';
    const BTM_NAV_LABEL_CLASS_NAME = 'btm-nav-label text-[0.8rem]';

    return (
        <div className={isWithoutPadding ? '' : 'px-6'}>
            <div className='btm-nav fixed max-w-lg w-full -translate-x-1/2 left-1/2 text-neutral/70'>
                <Link
                    to={`/app/${pathname.split('/')[2]}`}
                    className={
                        pathname.split('/')[3] === undefined
                            ? BUTTON_ACTIVE_CLASS_NAME
                            : ''
                    }
                >
                    <FaMapLocationDot size={20} />
                    <span className={BTM_NAV_LABEL_CLASS_NAME}>校内マップ</span>
                </Link>
                <Link
                    to={`/app/${pathname.split('/')[2]}/form`}
                    className={
                        pathname.split('/')[3] === 'form'
                            ? BUTTON_ACTIVE_CLASS_NAME
                            : ''
                    }
                >
                    <FaClipboardList size={20} />
                    <span className={BTM_NAV_LABEL_CLASS_NAME}>アンケート</span>
                </Link>
                <Link
                    to={`/app/${pathname.split('/')[2]}/info`}
                    className={
                        pathname.split('/')[3] === 'info'
                            ? BUTTON_ACTIVE_CLASS_NAME
                            : ''
                    }
                >
                    <FaCircleInfo size={20} />
                    <span className={BTM_NAV_LABEL_CLASS_NAME}>詳細</span>
                </Link>
            </div>
            {children}
        </div>
    );
}
