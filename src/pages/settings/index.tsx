import Head from '../../components/ui/Head';
import ResetCacheButton from './cache';
import RequestCameraButton from './camera';
import NotificationSettingButton from './notifications';

export default function Page() {
    return (
        <div>
            <Head title='設定' subtitle='アプリの設定を変更します。' />
            <div className='mt-10 flex flex-col gap-8'>
                <RequestCameraButton />
                <NotificationSettingButton />
                <ResetCacheButton />
            </div>
        </div>
    );
}
