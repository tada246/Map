import Head from '../../components/ui/Head';
import MessageCard from './card';
import useMessages from '../../hooks/useMessages';
import { NotificationPermissionAid } from '../../components/message/notification';

export default function Page() {
    const { message } = useMessages();

    if (!message) {
        return <div>ロード中</div>;
    }

    return (
        <div>
            <Head
                title='アナウンス'
                subtitle='リアルタイムでお知らせいたします。'
            />
            <NotificationPermissionAid />
            <div className='mt-10 flex flex-col gap-7'>
                {message?.map((msg) => (
                    <MessageCard key={msg.id} message={msg} />
                ))}
                {message.length === 0 && (
                    <div className='text-center text-default-500'>
                        今日のアナウンスはありません
                    </div>
                )}
            </div>
        </div>
    );
}
