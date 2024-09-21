import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import useSWRImmutable from 'swr/immutable';
import { db } from '../features/firebase';
import { Entertainment, Floor } from '../types/firebase';

export interface DataType extends Floor {
    events: Entertainment[];
}

async function getEntertainments(
    eventId: string,
    placeId: string,
    floorId: string
) {
    const q = query(
        collection(
            db,
            'events',
            eventId,
            'places',
            placeId,
            'floor',
            floorId,
            'events'
        ),
        orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const result: Entertainment[] = [];
    querySnapshot.forEach((doc: { data: Function }) => {
        result.push(doc.data() as Entertainment);
    });
    return result;
}

async function getFloors(eventId: string, placeId: string) {
    const q = query(
        collection(db, 'events', eventId, 'places', placeId, 'floor'),
        orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);

    const promises = querySnapshot.docs.map(async (doc) => {
        const data = getEntertainments(eventId, placeId, doc.id);
        const docData = doc.data();
        return {
            id: doc.id,
            name: docData.name,
            order: docData.order,
            events: await data,
            mapImageURL: docData.mapImageURL,
        };
    });

    const result: DataType[] = await Promise.all(promises);
    return result;
}

export default function useEntertainment(
    eventId: string | undefined | null,
    placeId: string | undefined | null
) {
    const { data, isLoading, error } = useSWRImmutable(
        ['/api/floors', eventId, placeId],
        ([_, key1, key2]) => {
            if (key1 && key2) {
                return getFloors(key1, key2);
            }
            return null;
        },
        {
            revalidateIfStale: false,
        }
    );

    return {
        data,
        isLoading,
        error,
    };
}
