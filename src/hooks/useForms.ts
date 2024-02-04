import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Form } from '../types/firebase';
import { db } from '../features/firebase';
import useSWR from 'swr';

async function getEventList(id: string) {
    const q = query(
        collection(db, 'events', id, 'forms'),
        orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);

    const result: Form[] = [];
    querySnapshot.forEach((doc: { data: Function }) => {
        result.push(doc.data());
    });

    return result;
}

export default function useForms(eventId: string) {
    const { data, isLoading, error } = useSWR(
        ['/api/form', eventId],
        ([_, params]) => getEventList(params),
        {
            revalidateOnFocus: false,
            errorRetryInterval: 12000,
        }
    );

    return {
        data,
        isLoading,
        error,
    };
}
