import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../features/firebase';
import { Place } from '../types/firebase';
import useSWRImmutable from 'swr/immutable';

async function getPlaces(eventId: string) {
    const q = query(collection(db, 'events', eventId, 'places'));
    const querySnapshot = await getDocs(q);

    const result: Place[] = [];
    querySnapshot.forEach((doc: { data: Function }) => {
        result.push(doc.data() as Place);
    });

    return result;
}

export default function usePlaces(eventId: string) {
    const { data, isLoading, error } = useSWRImmutable(
        ['/api/places', eventId],
        ([_, key]) => getPlaces(key),
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
