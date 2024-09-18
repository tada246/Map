import { Notice } from '../../types/firebase';
import { message_type } from '../../store/notice';
import useRelativeTime from '../../hooks/useRelativeTime';
import { Button, Link as NextUILink } from '@nextui-org/react';
import { Link, useParams } from 'react-router-dom';
import { IoChevronForwardOutline } from 'react-icons/io5';
import useMessages from '../../hooks/useMessages';
import useNotificationPermission from '../../hooks/useNotificationPermission';

export default function NoticeSection() {
    // jotaiからデータを取得する
    const { eventId } = useParams<{ eventId: string }>();
    const { message } = useMessages();

    if (!message || !eventId) {
        return null;
    }

    return (
        <div className='mt-6 '>
            <div className='shadow-medium rounded-large'>
                <ul className='flex gap-4 flex-col p-4'>
                    {message.slice(0, 3).map((notice, index) => (
                        <NoticeSmallCard
                            key={index}
                            notice={notice}
                            eventId={eventId}
                        />
                    ))}
                </ul>
                <div className='px-4 py-2 border-t-1 flex justify-between'>
                    <p className='text-sm text-default-600'>
                        リアルタイムアナウンス
                    </p>
                    <NextUILink
                        as={Link}
                        color='primary'
                        className='flex gap-1'
                        to={`/events/${eventId}/messages`}
                    >
                        <p className='text-sm'>もっと見る</p>
                        <IoChevronForwardOutline size={14} />
                    </NextUILink>
                </div>
            </div>
            <NotificationPermissionAid />
        </div>
    );
}

function NotificationPermissionAid() {
    const { permission } = useNotificationPermission();
    const { eventId } = useParams<{ eventId: string }>();

    if (permission === 'granted' || !eventId) return;

    return (
        <div className='mt-4 shadow-medium rounded-large p-4 flex items-center gap-3 justify-between'>
            <p className='text-sm'>
                リアルタイムの通知を受け取ることができます。
            </p>
            <Button
                as={Link}
                to={`/events/${eventId}/settings`}
                color='primary'
                size='sm'
            >
                通知設定
            </Button>
        </div>
    );
}

function NoticeSmallCard({
    notice,
    eventId,
}: {
    notice: Notice;
    eventId: string;
}) {
    const type = message_type.find((v) => v.id === notice.type);
    const relativeTime = useRelativeTime(
        new Date(notice.timestamp.seconds * 1000)
    );

    return (
        <li className='flex items-center gap-3'>
            <div
                className={`w-6 h-6 flex items-center justify-center bg-${type?.color}/20 text-${type?.color} rounded-md`}
            >
                {type?.icon}
            </div>
            <div>
                <NextUILink
                    as={Link}
                    to={`/events/${eventId}/messages`}
                    color='foreground'
                >
                    {notice.title}
                </NextUILink>
                <p className='text-tiny text-default-600'>{relativeTime}</p>
            </div>
        </li>
    );
}
