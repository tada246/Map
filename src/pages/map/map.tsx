import { Button } from '@nextui-org/react';
import { Place } from '../../types/firebase';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { IoAdd, IoQrCode, IoRemove } from 'react-icons/io5';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

type Props = {
    imageURL: string;
    places: Place[];
    setSelectedPlace: (place: Place | null) => void;
    eventId: string;
};

export default function MainMap(props: Props) {
    return (
        <div className='flex-1 w-full h-[100svh] flex items-center overflow-hidden'>
            <TransformWrapper initialScale={1.5} centerOnInit>
                {(utils) => (
                    <Fragment>
                        <Controls {...utils} eventId={props.eventId} />
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
                                            <button
                                                key={index}
                                                className={`md:w-3 md:h-3 w-2 h-2 absolute bg-primary/50 rounded-full -translate-x-1/2 -translate-y-1/2`}
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
                                                <p className='md:text-[0.75rem] text-[0.5rem] whitespace-nowrap -translate-x-1/2 md:translate-y-4 translate-y-2 absolute left-1/2'>
                                                    {place.name}
                                                </p>
                                                <div className='absolute left-1/2 -translate-x-1/2 -translate-y-16 w-16 h-16 block'>
                                                    <img
                                                        src={place.imageURL}
                                                        alt=''
                                                        width='auto'
                                                        height='auto'
                                                        className='w-16 h-16 rounded-full border-2 border-primary/50 object-cover'
                                                    />
                                                </div>
                                            </button>
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
    eventId,
}: {
    zoomIn: () => void;
    zoomOut: () => void;
    eventId: string;
}) {
    return (
        <div className='fixed p-2 rounded-medium shadow-medium right-4 md:bottom-4 bottom-[5.5rem] flex gap-2 bg-white/80 backdrop-blur-lg z-40'>
            <Button isIconOnly size='sm' onClick={() => zoomIn()}>
                <IoAdd />
            </Button>
            <Button isIconOnly size='sm' onClick={() => zoomOut()}>
                <IoRemove />
            </Button>
            <Button
                isIconOnly
                size='sm'
                as={Link}
                to={`/events/${eventId}/qrcode`}
            >
                <IoQrCode />
            </Button>
        </div>
    );
}
