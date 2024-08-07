import RequestCameraButton from '../../components/atom/RequestCameraButton';
import ResetCacheButton from '../../components/atom/ResetCacheButton';
import Head from '../../components/ui/Head';
import useCameraPermission from '../../hooks/useCameraPermission';
import { CameraAuthorityRequestByHandExplanation } from './camera';
import CommonSettingItem from './common';
import NotificationSettingButton from './notifications';

export default function Page() {
    const hasCameraPermission = useCameraPermission();

    return (
        <div>
            <Head title='設定' subtitle='アプリの設定を変更します。' />
            <div className='mt-10 flex flex-col gap-8'>
                <CommonSettingItem
                    title='カメラ権限'
                    subtitle='ココドコ機能でカメラを使用するために必要です。'
                    show={!hasCameraPermission}
                >
                    <div className='flex gap-2'>
                        <RequestCameraButton />
                        <CameraAuthorityRequestByHandExplanation />
                    </div>
                </CommonSettingItem>
                <CommonSettingItem
                    title='アプリキャッシュ初期化'
                    subtitle='エラーが発生した場合に使用します。'
                >
                    <ResetCacheButton />
                </CommonSettingItem>
                <NotificationSettingButton />
            </div>
        </div>
    );
}
