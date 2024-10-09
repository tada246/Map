import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../features/firebase';
import { StampRally } from '../types/firebase';
import useSWRImmutable from 'swr/immutable';

async function getStampRallies(eventId: string) {
    const q = query(
        collection(db, 'events', eventId, 'stampRally'),
        orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);

    const result: StampRally[] = [];
    querySnapshot.forEach((doc: { data: Function }) => {
        result.push(doc.data() as StampRally);
    });

    return result;
}

export default function useStampRally(eventId?: string) {
    if (!eventId)
        return { data: undefined, isLoading: false, error: 'not event id' };

    const { data, isLoading, error } = useSWRImmutable(
        ['/api/forms', eventId],
        ([_, key]) => getStampRallies(key),
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
