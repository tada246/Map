import { Button, Image } from '@nextui-org/react';
import { Place } from '../../types/firebase';
import { IoBusiness } from 'react-icons/io5';

type Props = {
    places: Place[];
    setSelectedPlace: (place: Place | null) => void;
};

export default function MapSideBar(props: Props) {
    const places = props.places.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <>
            <div className='w-20 flex-col gap-4 h-[100svh] border-r border-default items-center py-4 overflow-y-auto hidden md:flex'>
                <Button
                    isIconOnly
                    size='lg'
                    color='primary'
                    variant='flat'
                    onClick={() => props.setSelectedPlace(null)}
                    className='aspect-square'
                >
                    <IoBusiness size={20} />
                </Button>
                <div className='border-b-1 border-default w-[50%]' />
                {places.map((place, index) => (
                    <button
                        key={index}
                        className='flex flex-col items-center gap-1 px-1 hover:font-bold duration-200'
                        onClick={() => props.setSelectedPlace(place)}
                    >
                        <Image
                            src={place.imageURL}
                            alt={place.name}
                            width={100}
                            height={100}
                            className='w-8 h-8 rounded-medium'
                            style={{
                                width: '2rem',
                                height: '2rem',
                            }}
                        />
                        <p className='text-[0.7rem] text-center line-clamp-1'>
                            {place.name}
                        </p>
                    </button>
                ))}
            </div>
        </>
    );
}
