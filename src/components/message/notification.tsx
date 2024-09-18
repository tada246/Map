import { Link, useParams } from 'react-router-dom';
import useNotificationPermission from '../../hooks/useNotificationPermission';
import { Button } from '@nextui-org/react';

export function NotificationPermissionAid() {
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
