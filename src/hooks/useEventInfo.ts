import { doc, getDoc } from 'firebase/firestore';
import { Running } from '../types/firebase';
import { db } from '../features/firebase';
import useSWR from 'swr';

async function getEventInfo(targetEventId: string) {
    const docRef = doc(db, 'events', targetEventId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as Running;
    } else {
        return;
    }
}

export default function useEventInfo(id: string) {
    const { data, isLoading, error } = useSWR(
        ['/api/event', id],
        ([_, param]) => getEventInfo(param),
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
