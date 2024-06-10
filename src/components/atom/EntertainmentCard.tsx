import { Button, Chip, Image } from '@nextui-org/react';
import dayjs from 'dayjs';
import { IoMap, IoTime } from 'react-icons/io5';
import { useState } from 'react';
import getEventStatus from '../../features/getEventStatus';
import { Entertainment, Floor, Place } from '../../types/firebase';

interface D extends Entertainment {
    building?: Place;
    floor?: Floor;
}

type Props = {
    d: D;
    navigate?: (id: string) => void;
    isList: boolean;
};

export default function EntertainmentCard(props: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { d } = props;

    return (
        <div className='bg-default-50 shadow-medium rounded-large p-4 items-center'>
            <div className='flex gap-3 items-center'>
                <div className='w-20 h-20 aspect-square'>
                    <Image
                        src={d.imageURL}
                        width={300}
                        height={300}
                        className='object-cover aspect-square'
                        isBlurred
                    />
                </div>
                <div className='flex-1'>
                    <h1 className='text-lg font-bold'>{d.name}</h1>
                    <p className='text-sm'>{d.overview}</p>
                    <div className='flex gap-2 mt-1'>
                        <Chip
                            size='sm'
                            color={
                                getEventStatus({
                                    start: new Date(
                                        d.date.start.seconds * 1000
                                    ),
                                    end: new Date(d.date.end.seconds * 1000),
                                }) === '開催中'
                                    ? 'primary'
                                    : getEventStatus({
                                          start: new Date(
                                              d.date.start.seconds * 1000
                                          ),
                                          end: new Date(
                                              d.date.end.seconds * 1000
                                          ),
                                      }) === '開催前'
                                    ? 'secondary'
                                    : 'default'
                            }
                        >
                            {getEventStatus({
                                start: new Date(d.date.start.seconds * 1000),
                                end: new Date(d.date.end.seconds * 1000),
                            })}
                        </Chip>
                        <Chip size='sm'>
                            {dayjs(d.date.end.seconds * 1000).diff(
                                dayjs(d.date.start.seconds * 1000),
                                'minute'
                            )}
                            分間
                        </Chip>
                    </div>
                </div>
            </div>
            <div className='flex flex-col text-sm mt-2'>
                <div className='flex gap-2 items-center'>
                    <IoTime size={16} />
                    <p>
                        {dayjs(d.date.start.seconds * 1000).format('HH:mm')}〜
                        {dayjs(d.date.end.seconds * 1000).format('HH:mm')}
                    </p>
                </div>
                <div className='flex gap-2 items-center'>
                    <IoMap size={16} />
                    <p>
                        {d?.building?.name} {d?.floor?.name} {d.place ?? '不明'}
                    </p>
                </div>
            </div>
            <div className='mt-2 flex gap-2'>
                <Button
                    fullWidth
                    variant='flat'
                    color='default'
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? '説明を閉じる' : '説明を表示'}
                </Button>
                {props.isList && (
                    <Button
                        fullWidth
                        variant='flat'
                        color='primary'
                        onClick={() =>
                            props.navigate
                                ? props.navigate(d?.building?.id ?? '')
                                : null
                        }
                    >
                        マップを見る
                    </Button>
                )}
            </div>
            {isOpen && (
                <div className='mt-2 p-3 bg-default-200 rounded-large'>
                    <p className='font-bold mb-1'>イベントの説明</p>
                    {d.explanation.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                </div>
            )}
        </div>
    );
}
