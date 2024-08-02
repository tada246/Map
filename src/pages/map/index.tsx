import { useParams, useSearchParams } from 'react-router-dom';
import useEvent from '../../hooks/useEvent';
import { ErrorPage, NotFound } from '..';
import { Spinner } from '@nextui-org/react';
import MapSideBar from './sidebar';
import usePlaces from '../../hooks/usePlaces';
import MainMap from './map';
import MapFloorDetail from './detail';
import { useEffect, useState } from 'react';
import { Place } from '../../types/firebase';
import MapIsland from './island';

export default function Page() {
    const { eventId } = useParams<{ eventId: string }>();
    const [searchParams, setSearchParams] = useSearchParams();
    const pathPlaceId = searchParams.get('place');
    const pathFloorId = searchParams.get('floor');

    const {
        data: eventData,
        isLoading: eventIsLoading,
        error: eventError,
    } = useEvent(eventId!.toString());
    const {
        data: placeData,
        isLoading: placesIsLoading,
        error: placesError,
    } = usePlaces(eventId!.toString());
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

    useEffect(() => {
        if (selectedPlace?.id === pathPlaceId) {
            return;
        }

        if (pathPlaceId && placeData) {
            const place = placeData.find((place) => place.id === pathPlaceId);
            setSelectedPlace(place || null);
        } else {
            setSelectedPlace(null);
        }

        if (pathFloorId) {
            setTimeout(() => {
                const targetElement = document.getElementById(
                    `f-${pathFloorId}`
                );
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1200);
        }
    }, [pathPlaceId, placeData]);

    if (eventError || placesError || !eventId) return <ErrorPage />;

    if (eventIsLoading || placesIsLoading)
        return (
            <div className='flex justify-center mt-10'>
                <Spinner size='lg' />
            </div>
        );

    if (!eventData || !placeData) return <NotFound />;

    function setPlaceId(tarPlace: Place | null) {
        if (!tarPlace) {
            setSearchParams({});
            return;
        }

        setSearchParams({ place: tarPlace.id });
        return;
    }

    return (
        <div className='flex h-[100svh]'>
            <MapSideBar places={placeData} setSelectedPlace={setPlaceId} />
            <MainMap
                imageURL={eventData.mapImageURL}
                places={placeData}
                setSelectedPlace={setPlaceId}
            />
            <MapFloorDetail
                eventId={eventId}
                selectedPlace={selectedPlace}
                setSelectedPlace={setPlaceId}
                isSelecting={!!pathFloorId}
            />
            <MapIsland event={eventData} />
        </div>
    );
}
