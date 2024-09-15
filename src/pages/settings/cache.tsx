import { Button } from '@nextui-org/react';
import { useSWRConfig } from 'swr';
import CommonSettingItem from './common';

export default function ResetCacheButton() {
    const { mutate } = useSWRConfig();

    function resetCache() {
        localStorage.removeItem('app-cache');
        mutate((_) => true, undefined, { revalidate: false });
    }

    return (
        <CommonSettingItem
            title='アプリキャッシュ初期化'
            subtitle='エラーが発生した場合に使用します。'
        >
            <Button onClick={resetCache}>キャッシュをリセット</Button>
        </CommonSettingItem>
    );
}
