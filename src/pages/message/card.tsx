import { Notice } from '../../types/firebase';
import { message_type } from '../../store/notice';
import useRelativeTime from '../../hooks/useRelativeTime';
import Markdown from '../../components/atom/Markdown';
import dayjs from 'dayjs';

type Props = {
    message: Notice;
};

export default function MessageCard(props: Props) {
    const { message } = props;
    const type = message_type.find((v) => v.id === message.type);
    const relativeTime = useRelativeTime(
        new Date(message.timestamp.seconds * 1000)
    );

    return (
        <div>
            <div className='shadow-medium bg-white rounded-t-large rounded-br-large mt-2'>
                <div
                    className={`flex py-2 px-4 gap-2 items-center bg-${type?.color}/20 text-${type?.color} rounded-t-large`}
                >
                    <div>{type?.icon}</div>
                    <div>
                        {type?.name}アナウンス（{message.writer.join('、')}）
                    </div>
                </div>
                <div className='p-4'>
                    <h2 className='text-xl font-bold'>{message.title}</h2>
                    <p className='text-sm mt-0'>{relativeTime}</p>
                    <div className='mt-1'>
                        <Markdown content={message.content} />
                    </div>
                </div>
            </div>
            <div className='p-2'>
                <p className='text-default-600 text-sm'>
                    {dayjs(message.timestamp.seconds * 1000).format(
                        'YYYY/MM/DD HH:mm:ss'
                    )}
                </p>
            </div>
        </div>
    );
}
