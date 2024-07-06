import { Button } from '@nextui-org/react';
import { Link, useParams } from 'react-router-dom';

export default function Page() {
    const { eventId } = useParams<{ eventId?: string }>();

    return (
        <div>
            <p className='text-xl font-bold text-center mt-5'>
                エラーが発生しました
            </p>
            {eventId && (
                <div className='flex justify-center mt-4 flex-col'>
                    <Button as={Link} to={`/events/${eventId}/settings`}>
                        設定ページ
                    </Button>
                    <p className='text-center mt-1'>
                        何回も表示される場合は、以上からアプリキャッシュ初期化をお願い致します。
                    </p>
                </div>
            )}
        </div>
    );
}
