import { Button, Image, Tooltip } from '@nextui-org/react';
import { Place } from '../../types/firebase';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { IoAdd, IoRemove, IoScan, IoStorefront } from 'react-icons/io5';
import { Fragment } from 'react';

type Props = {
    imageURL: string;
    places: Place[];
    setSelectedPlace: (place: Place | null) => void;
};

export default function MainMap(props: Props) {
    return (
        <div className='flex-1 w-full h-[100svh] flex items-center overflow-hidden'>
            <TransformWrapper initialScale={1.5} centerOnInit>
                {(utils) => (
                    <Fragment>
                        <Controls {...utils} />
                        <TransformComponent>
                            <div className='w-full h-[100svh] flex items-center'>
                                <div className='relative w-[1024px] h-[1024px]'>
                                    <img
                                        src={props.imageURL}
                                        alt='map'
                                        width={1024}
                                        height={1024}
                                        className='w-[1024px] h-[1024px]'
                                    />
                                    <div className='w-full h-full absolute top-0 left-0'>
                                        {props.places.map((place, index) => (
                                            <Tooltip
                                                content={
                                                    <div className='w-60 p-3 rounded-large'>
                                                        <p className='text-lg font-bold'>
                                                            {place.name}
                                                        </p>
                                                        <Image
                                                            src={place.imageURL}
                                                            width={400}
                                                            height={200}
                                                            className='w-full aspect-video object-cover rounded-large mt-2'
                                                            isBlurred
                                                        />
                                                        <Button
                                                            fullWidth
                                                            className='mt-2'
                                                            startContent={
                                                                <IoStorefront />
                                                            }
                                                            onClick={() =>
                                                                props.setSelectedPlace(
                                                                    place
                                                                )
                                                            }
                                                        >
                                                            詳細を見る
                                                        </Button>
                                                    </div>
                                                }
                                                showArrow
                                                key={index}
                                            >
                                                <button
                                                    className={`md:w-3 md:h-3 w-2 h-2 absolute bg-primary rounded-full -translate-x-1/2 -translate-y-1/2`}
                                                    style={{
                                                        top: `${place.location.y}%`,
                                                        left: `${place.location.x}%`,
                                                    }}
                                                    onClick={() =>
                                                        props.setSelectedPlace(
                                                            place
                                                        )
                                                    }
                                                >
                                                    <p className='md:text-[0.75rem] text-[0.5rem] whitespace-nowrap -translate-x-1/2 md:-translate-y-6 -translate-y-4 absolute left-1/2'>
                                                        {place.name}
                                                    </p>
                                                </button>
                                            </Tooltip>
                                        ))}
                                    </div>
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
    resetTransform,
}: {
    zoomIn: () => void;
    zoomOut: () => void;
    resetTransform: () => void;
}) {
    return (
        <div className='fixed p-2 rounded-medium shadow-medium right-4 md:bottom-4 bottom-[5.5rem] flex gap-2 bg-white/80 backdrop-blur-lg z-40'>
            <Button isIconOnly size='sm' onClick={() => zoomIn()}>
                <IoAdd />
            </Button>
            <Button isIconOnly size='sm' onClick={() => zoomOut()}>
                <IoRemove />
            </Button>
            <Button isIconOnly size='sm' onClick={() => resetTransform()}>
                <IoScan />
            </Button>
        </div>
    );
}
