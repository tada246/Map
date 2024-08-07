import { useEffect } from 'react';
import { Notice } from '../../types/firebase';
import { useAtom } from 'jotai';
import { message_atom } from '../../store/jotai';
import {
    collection,
    limit,
    onSnapshot,
    orderBy,
    query,
} from 'firebase/firestore';
import Head from '../../components/ui/Head';
import MessageCard from './card';
import { db } from '../../features/firebase';

export default function Page() {
    const [message, setMessage] = useAtom(message_atom);

    function getMessages() {
        const q = query(
            collection(db, 'notices'),
            limit(4),
            orderBy('timestamp', 'desc')
        );

        onSnapshot(q, (snapshot) => {
            const messages_data: Notice[] = [];
            snapshot.forEach((doc) => {
                messages_data.push(doc.data() as Notice);
            });

            setMessage(messages_data);
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
