import Head from '../../components/ui/Head';
import MessageCard from './card';
import useMessages from '../../hooks/useMessages';

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
            <div className='mt-10 flex flex-col gap-7'>
                {message.map((msg) => (
                    <MessageCard key={msg.id} message={msg} />
                ))}
            </div>
        </div>
    );
}
