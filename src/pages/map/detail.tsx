import { Button, Chip, Divider, Image } from '@nextui-org/react';
import useEntertainment from '../../hooks/useEntertainment';
import { Entertainment, Floor, Place } from '../../types/firebase';
import {
    IoAdd,
    IoCaretDownOutline,
    IoClose,
    IoInformationCircleOutline,
    IoRemove,
} from 'react-icons/io5';
import { Drawer } from 'vaul';
import useWindowSize from '../../hooks/useWindowSize';
import { Fragment, useMemo, useState } from 'react';
import EntertainmentCard from '../../components/atom/EntertainmentCard';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

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
        <div className='hidden md:block w-[28rem] h-[100svh] left-[20rem] top-0 bg-white/60 fixed backdrop-blur-lg p-6 shadow-lg overflow-y-auto'>
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
            <div className='flex flex-col mt-8 gap-16'>
                {data.map((floor, index) => (
                    <div key={index}>
                        <h2 className='text-lg font-bold'>
                            {place?.name} {floor.name}
                        </h2>
                        {floor.mapImageURL && (
                            <>
                                <FloorMap floor={floor} />
                                <div className='mt-2 mb-6'>
                                    <div className='flex gap-1 items-center'>
                                        <IoInformationCircleOutline size={16} />
                                        <p className='text-sm'>
                                            ズームイン/ズームアウトで地図を操作できます。
                                        </p>
                                    </div>
                                </div>
                            </>
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
                            <div className='mt-12 flex flex-col gap-20'>
                                {data?.map((floor, index) => (
                                    <div key={index}>
                                        <div className='flex gap-2 items-center'>
                                            <h2 className='text-xl font-bold'>
                                                {place?.name} {floor.name}{' '}
                                            </h2>
                                            <Chip size='sm' className=''>
                                                {floor.events.length}件
                                            </Chip>
                                        </div>
                                        {floor.mapImageURL && (
                                            <>
                                                <FloorMap floor={floor} />
                                                <div className='mt-2 mb-6'>
                                                    <div className='flex gap-1 items-center'>
                                                        <IoInformationCircleOutline
                                                            size={16}
                                                        />
                                                        <p className='text-sm'>
                                                            ズームイン/ズームアウトで地図を操作できます。
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
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

function FloorMap({ floor }: { floor: DataType }) {
    // 同じ座標の場所をグループ化する
    const group: Map<string, Entertainment[]> = useMemo(() => {
        const map = new Map<string, Entertainment[]>();
        floor.events.forEach((event) => {
            if (!event.location) return;

            const key = `${event.location.x},${event.location.y}`;
            if (map.has(key)) {
                map.get(key)?.push(event);
            } else {
                map.set(key, [event]);
            }
        });
        return map;
    }, [floor.events]);

    return (
        <div className='mt-2 outline outline-1 outline-black/10 rounded-medium bg-white relative overflow-hidden'>
            <TransformWrapper initialScale={1.5} centerOnInit>
                {(utils) => (
                    <Fragment>
                        <Controls {...utils} />
                        <TransformComponent>
                            <div className='relative'>
                                <img
                                    src={floor.mapImageURL}
                                    alt=''
                                    className='w-full aspect-[3/2] object-cover object-center'
                                />
                                <div className='w-full h-full absolute top-0 left-0'>
                                    {/* groupを表示 */}
                                    {Array.from(group.values()).map(
                                        (places) =>
                                            places[0].location && (
                                                <div key={places[0].id}>
                                                    <div
                                                        className='p-1 absolute bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 w-3 h-3'
                                                        style={{
                                                            left: `${places[0].location.x}%`,
                                                            top: `${places[0].location.y}%`,
                                                        }}
                                                    />
                                                    <div
                                                        className='absolute -translate-x-1/2 -translate-y-10 w-10 h-10'
                                                        style={{
                                                            left: `${places[0].location.x}%`,
                                                            top: `${places[0].location.y}%`,
                                                        }}
                                                    >
                                                        <img
                                                            src={
                                                                places[0]
                                                                    .imageURL
                                                            }
                                                            width={16}
                                                            height={16}
                                                            className='w-10 h-10 border-2 border-primary rounded-full bg-white shadow-medium object-cover object-center'
                                                        />
                                                    </div>
                                                    <div
                                                        className='absolute -translate-x-1/2 translate-y-2 md:text-[0.5rem] text-[0.5rem] max-w-10 line-clamp-1'
                                                        style={{
                                                            left: `${places[0].location.x}%`,
                                                            top: `${places[0].location.y}%`,
                                                        }}
                                                    >
                                                        <p>{places[0].place}</p>
                                                    </div>
                                                    <div
                                                        className='absolute -translate-x-6 -translate-y-[3.5rem] flex gap-0.5 flex-col bg-white rounded-full p-0.5'
                                                        style={{
                                                            left: `${places[0].location.x}%`,
                                                            top: `${places[0].location.y}%`,
                                                        }}
                                                    >
                                                        {places.map((p) => (
                                                            <div className='text-[0.5rem] bg-secondary text-white w-3 h-3 flex justify-center items-center rounded-full'>
                                                                <p className='text-center'>
                                                                    {p.order}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                    )}
                                </div>
                            </div>
                        </TransformComponent>
                    </Fragment>
                )}
            </TransformWrapper>
        </div>
    );
}

function Controls({
    zoomIn,
    zoomOut,
}: {
    zoomIn: () => void;
    zoomOut: () => void;
    resetTransform: () => void;
}) {
    return (
        <div className=' absolute p-2 rounded-medium shadow-medium right-2 bottom-2 flex gap-2 bg-white/80 backdrop-blur-lg z-40'>
            <Button isIconOnly size='sm' onClick={() => zoomIn()}>
                <IoAdd />
            </Button>
            <Button isIconOnly size='sm' onClick={() => zoomOut()}>
                <IoRemove />
            </Button>
        </div>
    );
}
