import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { Running } from '../types/firebase';
import { db } from '../features/firebase';
import useSWR from 'swr';

async function getEventList() {
    const q = query(
        collection(db, 'events'),
        limit(8),
        orderBy('date.start', 'desc')
    );
    const querySnapshot = await getDocs(q);

    const result: Running[] = [];
    querySnapshot.forEach((doc: { data: Function }) => {
        result.push(doc.data());
    });

    return result;
}

export default function useEventList() {
    const { data, isLoading, error } = useSWR(
        '/api/events/list',
        getEventList,
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
