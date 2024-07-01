import { useParams } from 'react-router-dom';
import Head from '../../components/ui/Head';
import ComingEntertainmentContent from './content';

export default function Page() {
    const { eventId } = useParams<{ eventId: string }>();

    if (!eventId) return;

    return (
        <div>
            <Head
                title='開催予定 催し物'
                subtitle='まだ開催されていない催し物一覧です。'
            />
            <ComingEntertainmentContent eventId={eventId} className='mt-10' />
        </div>
    );
}
