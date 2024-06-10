import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../features/firebase';
import { Form } from '../types/firebase';
import useSWRImmutable from 'swr/immutable';

async function getForms(eventId: string) {
    const q = query(
        collection(db, 'events', eventId, 'forms'),
        orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);

    const result: Form[] = [];
    querySnapshot.forEach((doc: { data: Function }) => {
        result.push(doc.data() as Form);
    });

    return result;
}

export default function useForms(eventId: string) {
    const { data, isLoading, error } = useSWRImmutable(
        ['/api/forms', eventId],
        ([_, key]) => getForms(key),
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
