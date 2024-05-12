import { Button, Divider, Image } from '@nextui-org/react';
import useEntertainment from '../../hooks/useEntertainment';
import { Entertainment, Floor, Place } from '../../types/firebase';
import { IoCaretDownOutline, IoClose } from 'react-icons/io5';
import { Drawer } from 'vaul';
import useWindowSize from '../../hooks/useWindowSize';
import { useState } from 'react';
import EntertainmentCard from '../../components/atom/EntertainmentCard';

type Props = {
    eventId: string;
    selectedPlace: Place | null;
    setSelectedPlace: (place: Place | null) => void;
};

interface DataType extends Floor {
    events: Entertainment[];
}

export default function MapFloorDetail(props: Props) {
    const { data, error, isLoading } = useEntertainment(
        props.eventId,
        props.selectedPlace?.id
    );
    const [width] = useWindowSize();

    if (width >= 768) {
        return (
            <DetailDesktop
                isLoading={isLoading}
                data={data}
                error={error}
                {...props}
            />
        );
    }

    return (
        <DetailDrawer
            isLoading={isLoading}
            data={data}
            error={error}
            {...props}
        />
    );
}

type ContentProps = Props & {
    data: DataType[] | null | undefined;
    error: any;
    isLoading: boolean;
};

function DetailDesktop(props: ContentProps) {
    const { data } = props;
    const { selectedPlace: place } = props;

    if (!place || !data) return <div></div>;

    console.log(data);

    return (
        <div className='hidden md:block w-[28rem] h-[100svh] left-[20rem] top-0 bg-white/40 fixed backdrop-blur-lg p-6 shadow-lg overflow-y-auto'>
            <div>
                <Button
                    onClick={() => props.setSelectedPlace(null)}
                    radius='full'
                    startContent={<IoClose size={16} />}
                >
                    <p>閉じる</p>
                </Button>
            </div>
            <Image
                src={place?.imageURL}
                width={500}
                height={300}
                className='w-full aspect-video object-cover rounded-large mt-4'
                isBlurred
            />
            <h1 className='text-2xl font-bold mt-2'>{place?.name}</h1>
            <div className='flex flex-col mt-8 gap-6'>
                {data.map((floor, index) => (
                    <div key={index}>
                        <h2 className='text-lg font-bold'>{floor.name}</h2>
                        {floor.mapImageURL && (
                            <div className='mt-4 overflow-hidden relative outline outline-1 outline-black/10 rounded-medium'>
                                <img
                                    src={floor.mapImageURL}
                                    alt=''
                                    className='w-full aspect-[3/2] object-cover object-center'
                                />
                                <div className='w-full h-full absolute top-0 left-0'>
                                    {floor.events.map(
                                        (place) =>
                                            place.location && (
                                                <div key={place.id}>
                                                    <div
                                                        className='p-2 absolute bg-primary rounded-md -translate-x-1/2 -translate-y-1/2 max-w-1/3 line-clamp-1'
                                                        style={{
                                                            left: `${place.location.x}%`,
                                                            top: `${place.location.y}%`,
                                                        }}
                                                    >
                                                        <p className='text-sm text-white'>
                                                            {place.place}
                                                        </p>
                                                    </div>
                                                    <div
                                                        className='absolute -translate-x-1/2 -translate-y-10 bg-white text-tiny rounded-full p-1 shadow-medium'
                                                        style={{
                                                            left: `${place.location.x}%`,
                                                            top: `${place.location.y}%`,
                                                        }}
                                                    >
                                                        <p>{place.name}</p>
                                                    </div>
                                                </div>
                                            )
                                    )}
                                </div>
                            </div>
                        )}
                        <div className='flex flex-col gap-3 mt-2'>
                            {floor.events.map((event, index) => (
                                <EntertainmentCard
                                    key={index}
                                    d={event}
                                    isList={false}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function DetailDrawer(props: ContentProps) {
    const [snap, setSnap] = useState<number | string | null>(null);

    const { selectedPlace: place } = props;
    const { data } = props;

    return (
        <Drawer.Root
            snapPoints={['405px', 1]}
            activeSnapPoint={snap}
            setActiveSnapPoint={setSnap}
            open={props.selectedPlace !== null}
            onClose={() => props.setSelectedPlace(null)}
        >
            <Drawer.Portal>
                <Drawer.Overlay className='fixed inset-0 bg-black/40' />
                <Drawer.Content className='bg-gray-100 flex flex-col rounded-t-large shadow-large z-50 h-full max-h-[94%] fixed bottom-0 left-0 right-0'>
                    <div className='p-4 bg-default-100 rounded-t-large flex-1 z-50 h-full overflow-y-auto'>
                        <div className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300' />
                        <div className='flex items-center mt-4 h-8'>
                            <p className='text-xl font-bold flex-1'>
                                {place?.name}
                            </p>
                            <Button
                                radius='full'
                                variant='flat'
                                isIconOnly
                                size='sm'
                                onClick={() => props.setSelectedPlace(null)}
                            >
                                <IoClose />
                            </Button>
                        </div>
                        <Image
                            src={place?.imageURL}
                            width={500}
                            height={300}
                            className='w-full h-52 object-cover rounded-large mt-4'
                        />
                        {snap !== 1 && (
                            <Button
                                fullWidth
                                onClick={() => setSnap(1)}
                                className='mt-2 h-10'
                                startContent={<IoCaretDownOutline />}
                                color='primary'
                            >
                                詳細を見る
                            </Button>
                        )}
                        {snap === 1 && (
                            <div className='mt-6 flex items-center h-7'>
                                <div className='w-full'>
                                    <p className='text-sm text-center'>階層</p>
                                    <p className='text-xl text-center font-bold'>
                                        {data ? data.length.toString() : 0}
                                    </p>
                                </div>
                                <Divider orientation='vertical' />
                                <div className='w-full'>
                                    <p className='text-sm text-center'>
                                        イベント数
                                    </p>
                                    <p className='text-xl text-center font-bold'>
                                        {!!data && data.length > 0
                                            ? data
                                                  ?.map(
                                                      (floor) =>
                                                          floor.events.length
                                                  )
                                                  .reduce((a, b) => a + b)
                                            : 0}
                                    </p>
                                </div>
                            </div>
                        )}
                        {snap === 1 && !!data && (
                            <div className='mt-4 flex flex-col gap-6'>
                                {data?.map((floor, index) => (
                                    <div key={index}>
                                        <h2 className='text-lg font-bold'>
                                            {floor.name}
                                        </h2>

                                        {floor.mapImageURL && (
                                            <div className='mt-4 overflow-hidden relative outline outline-1 outline-black/10 rounded-medium'>
                                                <img
                                                    src={floor.mapImageURL}
                                                    alt=''
                                                    className='w-full aspect-[3/2] object-cover object-center'
                                                />
                                                <div className='w-full h-full absolute top-0 left-0'>
                                                    {floor.events.map(
                                                        (place) =>
                                                            place.location && (
                                                                <div
                                                                    key={
                                                                        place.id
                                                                    }
                                                                >
                                                                    <div
                                                                        className='p-2 absolute bg-primary rounded-md -translate-x-1/2 -translate-y-1/2 max-w-1/3 line-clamp-1'
                                                                        style={{
                                                                            left: `${place.location.x}%`,
                                                                            top: `${place.location.y}%`,
                                                                        }}
                                                                    >
                                                                        <p className='text-sm text-white'>
                                                                            {
                                                                                place.place
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    <div
                                                                        className='absolute -translate-x-1/2 -translate-y-10 bg-white text-tiny rounded-full p-1 shadow-medium'
                                                                        style={{
                                                                            left: `${place.location.x}%`,
                                                                            top: `${place.location.y}%`,
                                                                        }}
                                                                    >
                                                                        <p>
                                                                            {
                                                                                place.name
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        <div className='mt-2 flex gap-2 flex-col'>
                                            {floor.events.map(
                                                (event, index) => (
                                                    <EntertainmentCard
                                                        key={index}
                                                        d={event}
                                                        isList={false}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </Drawer.Content>
                <Drawer.Overlay />
            </Drawer.Portal>
        </Drawer.Root>
    );
}
