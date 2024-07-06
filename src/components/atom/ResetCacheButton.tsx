import { Button } from '@nextui-org/react';
import { useSWRConfig } from 'swr';

export default function ResetCacheButton() {
    const { mutate } = useSWRConfig();

    function resetCache() {
        localStorage.removeItem('app-cache');
        mutate((_) => true, undefined, { revalidate: false });
    }

    return <Button onClick={resetCache}>キャッシュをリセット</Button>;
}
