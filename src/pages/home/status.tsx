import { Button } from '@nextui-org/react';
import getEventStatus from '../../features/getEventStatus';
import { Event } from '../../types/firebase';
import { Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

type Props = {
    data: Event;
};

export default function StatusSection(props: Props) {
    const status = getEventStatus({
        start: new Date(props.data.date.start.seconds * 1000),
        end: new Date(props.data.date.end.seconds * 1000),
    });

    if (status === '開催中') return;

    return (
        <div className='mb-8 shadow-medium rounded-large p-4 bg-warning-200'>
            <p className='text-center text-sm text-warning-800'>
                【 重要なお知らせ 】
            </p>
            <h1 className='font-bold text-center text-large text-warning-800'>
                このイベントは、
                {status === '終了' ? '終了しています。' : '開催前です。'}
            </h1>
            <p className='text-sm text-center mt-2'>
                日付が異なっている場合がございますので、行事一覧からもう一度ご確認ください。
            </p>
            <div className='flex justify-center mt-1'>
                <Button
                    as={Link}
                    to='/events'
                    color='warning'
                    startContent={<IoArrowBack />}
                >
                    行事一覧へ戻る
                </Button>
            </div>
        </div>
    );
}
