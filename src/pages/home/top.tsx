import { Button } from '@nextui-org/react';
import { Event } from '../../types/firebase';
import { IoInformation, IoList, IoQrCode } from 'react-icons/io5';
import { Link } from 'react-router-dom';

type Props = {
    data: Event;
};

export default function HomeTopContent(props: Props) {
    const { data } = props;

    return (
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
                        to={`/events/${data.id}/list`}
                    >
                        イベント一覧
                    </Button>
                    <Button
                        className='w-full'
                        startContent={<IoQrCode />}
                        variant='flat'
                        color='secondary'
                        as={Link}
                        to={`/events/${data.id}/qrcode`}
                    >
                        ココドコ
                    </Button>
                    <Button
                        isIconOnly
                        radius='full'
                        variant='flat'
                        as={Link}
                        to={`/events/${data.id}/detail`}
                    >
                        <IoInformation />
                    </Button>
                </div>
            </div>
        </div>
    );
}
