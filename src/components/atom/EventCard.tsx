import dayjs from 'dayjs';
import { Entertainment } from '../../types/firebase';
import { Button } from '@nextui-org/react';
import { useState } from 'react';

type Props = {
    event: Entertainment;
};

export function SmallEventCard(props: Props) {
    const [isOpenDescription, setIsOpenDescription] = useState(false);
    const { event } = props;

    return (
        <div className='bg-white rounded-large p-4'>
            <div className='flex gap-3 items-center'>
                <div className='w-16 h-16'>
                    <img
                        src={event.imageURL}
                        alt='イベント画像'
                        className='rounded-large w-16 h-16'
                    />
                </div>
                <div className='flex-1'>
                    <h3 className='text-md font-bold'>{event.name}</h3>
                    <p className='text-sm'>
                        時間:{' '}
                        {dayjs(event.date.start.seconds * 1000).format('HH:mm')}{' '}
                        - {dayjs(event.date.end.seconds * 1000).format('HH:mm')}
                    </p>
                    <p className='text-sm line-clamp-2'>{event.overview}</p>
                </div>
            </div>
            {isOpenDescription && (
                <div className='mt-2'>
                    {event.explanation.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            )}
            <Button
                size='sm'
                fullWidth
                className='mt-2'
                onClick={() => setIsOpenDescription(!isOpenDescription)}
            >
                {isOpenDescription ? '閉じる' : '説明を読む'}
            </Button>
        </div>
    );
}

export function NormalEventCard(props: Props) {
    const [isOpenDescription, setIsOpenDescription] = useState(false);
    const { event } = props;

    return (
        <div className='bg-default-100 p-4 rounded-large'>
            <div className='flex gap-3 items-center'>
                <div className='w-16 h-16'>
                    <img
                        src={event.imageURL}
                        alt='イベント画像'
                        className='rounded-large w-16 h-16'
                    />
                </div>
                <div className='flex-1'>
                    <h3 className='font-bold'>{event.name}</h3>
                    <p className='text-sm'>
                        時間:{' '}
                        {dayjs(event.date.start.seconds * 1000).format('HH:mm')}{' '}
                        - {dayjs(event.date.end.seconds * 1000).format('HH:mm')}
                    </p>
                    <p className='text-sm line-clamp-2'>{event.overview}</p>
                </div>
            </div>
            {isOpenDescription && (
                <div className='mt-2 text-sm'>
                    {event.explanation.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            )}
            <Button
                size='sm'
                fullWidth
                className='mt-2'
                onClick={() => setIsOpenDescription(!isOpenDescription)}
            >
                {isOpenDescription ? '閉じる' : '説明を読む'}
            </Button>
        </div>
    );
}
