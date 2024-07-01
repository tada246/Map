import { useParams } from 'react-router-dom';
import Head from '../../components/ui/Head';
import OpenEntertainmentContent from './content';

export default function Page() {
    const { eventId } = useParams<{ eventId: string }>();

    if (!eventId) return;

    return (
        <div>
            <Head
                title='開催中 催し物'
                subtitle='開催されている催し物一覧です。'
            />
            <OpenEntertainmentContent eventId={eventId} className='mt-10' />
        </div>
    );
}
