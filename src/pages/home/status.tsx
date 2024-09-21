import { Button } from '@nextui-org/react';
import { Event } from '../../types/firebase';
import { Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import dayjs from 'dayjs';

type Props = {
    data: Event;
};

export default function StatusSection(props: Props) {
    let status: '開催中' | '終了' | '開催前';

    if (
        dayjs().format('YYYY-MM-DD') ===
        dayjs(props.data.date.start.seconds * 1000).format('YYYY-MM-DD')
    ) {
        status = '開催中';
    } else if (dayjs().isAfter(dayjs(props.data.date.start.seconds * 1000))) {
        status = '終了';
    } else {
        status = '開催前';
    }

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
