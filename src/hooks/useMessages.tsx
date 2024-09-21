import { useAtom } from 'jotai';
import { message_atom } from '../store/jotai';
import { useEffect, useRef } from 'react';
import {
    collection,
    limit,
    onSnapshot,
    orderBy,
    query,
} from 'firebase/firestore';
import { db } from '../features/firebase';
import { Notice } from '../types/firebase';
import { message_type } from '../store/notice';
import Push from 'push.js';
import { toast } from 'react-hot-toast';

export default function useMessages() {
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
                const data = doc.data();

                if (!data) return;
                if (
                    !data.id ||
                    !data.timestamp ||
                    !data.title ||
                    !data.type ||
                    !data.writer ||
                    !data.content
                )
                    return;

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
                addedDocs.forEach((doc) => {
                    const type = message_type.find((v) => v.id === doc.type);
                    toast(
                        <div className='pt-3 min-w-52'>
                            <div className='flex items-center gap-3'>
                                <div className='absolute top-0 right-0 w-full text-xs text-center bg-default-700 text-white rounded-t-md'>
                                    新しいアナウンスがあります
                                </div>
                                <div
                                    className={`w-6 h-6 flex justify-center items-center bg-${type?.color}/20 text-${type?.color} rounded-small`}
                                >
                                    <div>{type?.icon}</div>
                                </div>
                                <p>
                                    【{type?.name}】{doc.title}
                                </p>
                            </div>
                            <div className='mt-1 text-center'>
                                <p className='text-sm'>
                                    {doc.writer.join(', ')}
                                </p>
                            </div>
                        </div>
                    );
                    if (Notification.permission === 'granted') {
                        Push.create(`【${type?.name}】${doc.title}`, {
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
        if (!message) {
            getMessages();
        }
    }, []);

    return {
        message,
    };
}
