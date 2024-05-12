import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import useSWR from 'swr';
import { db } from '../features/firebase';
import { Event } from '../types/firebase';

async function getEvents() {
    const q = query(
        collection(db, 'events'),
        limit(10),
        orderBy('date.start', 'desc'),
        where('isPublic', '==', true)
    );
    const querySnapshot = await getDocs(q);

    console.log('Go to the server to fetch events');

    const result: Event[] = [];
    querySnapshot.forEach((doc: { data: Function }) => {
        result.push(doc.data());
    });

    return result;
}

export default function useEvents() {
    const { data, isLoading, error } = useSWR('/api/events', getEvents, {
        revalidateIfStale: false,
    });

    return {
        data,
        isLoading,
        error,
    };
}
