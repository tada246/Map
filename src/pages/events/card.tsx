import { Link } from 'react-router-dom';
import { Event } from '../../types/firebase';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Image,
    Link as NextUILink,
    Button,
    Chip,
} from '@nextui-org/react';
import { IoLink, IoMap } from 'react-icons/io5';
import getEventStatus from '../../features/getEventStatus';
import dayjs from 'dayjs';
import { createCalendarLink } from '../../features/createLink';

type Props = {
    event: Event;
};

export function EventCard(props: Props) {
    const { event } = props;

    const googleCalendarLink = createCalendarLink(
        event.name,
        event.overview,
        new Date(event.date.start.seconds * 1000),
        new Date(event.date.end.seconds * 1000),
        event.place?.name || undefined
    );

    const eventStatus = getEventStatus({
        start: new Date(event.date.start.seconds * 1000),
        end: new Date(event.date.end.seconds * 1000),
    });

    return (
        <Card shadow='sm' className='p-3 max-w-lg mx-auto'>
            <CardHeader>
                <div className='block'>
                    <Image
                        src={event.imageURL}
                        alt={event.name}
                        width='full'
                        height='auto'
                        className='w-full aspect-video object-cover'
                    />
                    <div className='mt-3'>
                        <h3 className='text-3xl font-bold'>{event.name}</h3>
                        <div className='flex gap-2 mt-1'>
                            <Chip size='sm' className='px-2'>
                                {eventStatus}
                            </Chip>
                            <Chip size='sm' className='px-2'>
                                {dayjs(event.date.start.seconds * 1000).format(
                                    'YYYY/MM/DD'
                                )}
                            </Chip>
                            {event.place && (
                                <Chip size='sm' className='px-2'>
                                    {event.place?.name}
                                </Chip>
                            )}
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardBody>
                <div className='line-clamp-4'>
                    {event.overview.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
                <NextUILink
                    size='sm'
                    href={googleCalendarLink}
                    isExternal
                    showAnchorIcon
                    className='mt-1'
                >
                    Googleカレンダーに追加
                </NextUILink>
            </CardBody>
            <CardFooter className='flex flex-col gap-1'>
                <Button
                    as={Link}
                    color='primary'
                    variant='flat'
                    fullWidth
                    startContent={<IoMap />}
                    to={`/events/${event.id}`}
                >
                    マップを閲覧
                </Button>
                <Button
                    as={NextUILink}
                    isExternal
                    variant='flat'
                    fullWidth
                    startContent={<IoLink />}
                    href={event.link}
                >
                    詳細を見る（外部リンク）
                </Button>
            </CardFooter>
        </Card>
    );
}
