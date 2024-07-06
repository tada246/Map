import { useEffect } from 'react';
import { Notice } from '../../types/firebase';
import { useAtom } from 'jotai';
import { message_atom } from '../../store/jotai';
import {
    collection,
    getFirestore,
    limit,
    onSnapshot,
    orderBy,
    query,
} from 'firebase/firestore';
import Head from '../../components/ui/Head';
import MessageCard from './card';

export default function Page() {
    const [message, setMessage] = useAtom(message_atom);

    function getMessages() {
        const db = getFirestore();
        const q = query(
            collection(db, 'notices'),
            orderBy('timestamp', 'desc'),
            limit(10)
        );

        onSnapshot(q, (snapshot) => {
            const messages: Notice[] = [];
            snapshot.docs.forEach((doc) => {
                messages.push(doc.data() as Notice);
            });
            setMessage(messages);
        });
    }

    useEffect(() => {
        if (message.length == 0) {
            getMessages();
        }
    }, []);

    return (
        <div>
            <Head
                title='アナウンス'
                subtitle='リアルタイムでお知らせいたします。'
            />
            <div className='mt-10 flex flex-col gap-7'>
                {message.map((msg) => (
                    <MessageCard key={msg.id} message={msg} />
                ))}
            </div>
        </div>
    );
}
