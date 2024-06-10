import { doc, getDoc } from 'firebase/firestore';
import { db } from '../features/firebase';
import { Event } from '../types/firebase';
import useSWRImmutable from 'swr/immutable';

async function getEvent(eventId: string) {
    const docRef = doc(db, 'events', eventId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return null;
    }

    return docSnap.data() as Event;
}

export default function useEvent(id: string) {
    const { data, isLoading, error } = useSWRImmutable(
        ['/api/events', id],
        ([_, key]) => getEvent(key),
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
