import { useEffect, useRef } from 'react';
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
import { message_type } from '../../store/notice';
import Push from 'push.js';

export default function Page() {
    const [message, setMessage] = useAtom(message_atom);
    const isInitialFetch = useRef(true);

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

            if (isInitialFetch.current) {
                isInitialFetch.current = false;
                return;
            }

            const addedDocs = snapshot
                .docChanges()
                .filter((change) => change.type === 'added')
                .map((change) => change.doc.data() as Notice);

            if (addedDocs.length > 0) {
                // 新規ドキュメントの通知
                console.log('新しいドキュメントが追加されました:', addedDocs);
                console.log(Notification.permission);
                addedDocs.forEach((doc) => {
                    if (Notification.permission === 'granted') {
                        const type = message_type.find(
                            (v) => v.id === doc.type
                        )?.name;
                        Push.create(`【${type}】${doc.title}`, {
                            body: `新規メッセージ ${doc.writer.join(
                                'と'
                            )}からのメッセージ`,
                            icon: 'https://firebasestorage.googleapis.com/v0/b/tane-project.appspot.com/o/public%2Ftane-map-logo.webp?alt=media&token=036fac44-c21e-4e99-8f12-c87a3aab65f1',
                            timeout: 6000,
                            onClick: function () {
                                window.focus();
                                (this as any)?.close();
                            },
                        });
                    }
                });
            }
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
