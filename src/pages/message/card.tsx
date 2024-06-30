import { Chip } from '@nextui-org/react';
import { Notice } from '../../types/firebase';
import { message_type } from '../../store/notice';
import useRelativeTime from '../../hooks/useRelativeTime';

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
        <div className=''>
            <div className='flex gap-2 w-full'>
                {message.writer.map((v, i) => (
                    <Chip color='default' variant='flat' key={i}>
                        {v}
                    </Chip>
                ))}
            </div>
            <div className='shadow-medium bg-white rounded-t-large rounded-br-large mt-2'>
                <div
                    className={`flex py-2 px-4 gap-2 items-center bg-${type?.color}/20 text-${type?.color} rounded-t-large`}
                >
                    <div>{type?.icon}</div>
                    <div>{type?.name}</div>
                </div>
                <div className='p-4'>
                    <h2 className='text-lg font-bold'>{message.title}</h2>
                    <div className='mt-1 flex flex-col gap-1'>
                        {message.content.split('\n').map((v, i) => (
                            <p key={i}>{v}</p>
                        ))}
                    </div>
                </div>
            </div>
            <div className='p-2'>
                <p className='text-default-600 text-sm'>{relativeTime}</p>
            </div>
        </div>
    );
}
