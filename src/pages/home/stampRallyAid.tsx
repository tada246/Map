import { Button } from '@nextui-org/react';
import { Event } from '../../types/firebase';
import { Link } from 'react-router-dom';

type Props = {
    data: Event;
};

export default function StampRallyAid(props: Props) {
    if (!props.data.isStampRallyEnabled) return;

    return (
        <div className='mt-4 shadow-medium rounded-large p-4 flex items-center gap-3 justify-between'>
            <p className='text-sm'>
                スタンプラリーが開催されてます。参加しましょう！
            </p>
            <Button
                as={Link}
                to={`/events/${props.data.id}/stampRally`}
                color='primary'
                size='sm'
            >
                参加する
            </Button>
        </div>
    );
}
