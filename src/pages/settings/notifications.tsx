import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react';
import useNotificationPermission from '../../hooks/useNotificationPermission';
import CommonSettingItem from './common';

function NotificationAuthorityRequestByHandExplanation() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const content: { title: string; way: string[] }[] = [
        {
            title: 'Safari - iPhone',
            way: [
                'Safariを開く: Safariブラウザを起動します。',
                '通知を受け取りたいサイトにアクセス: 通知を許可したいウェブサイトにアクセスします。',
                '通知リクエストを許可: サイトが通知をリクエストしてきたら、「許可」をタップします。',
                '設定アプリで確認: 必要に応じて、設定アプリの「通知」セクションでSafariの通知設定を確認・変更します。',
            ],
        },
        {
            title: 'Safari - Mac',
            way: [
                'Safariを開く: Safariブラウザを起動します。',
                'Safariの設定を開く: メニューから「Safari」>「設定」を選択します。',
                'Webサイトタブを選択: 「Webサイト」タブをクリックし、「通知」を選択します。',
                '通知を許可: 通知を許可したいウェブサイトを選び、「許可」をクリックします。',
            ],
        },
        {
            title: 'Chrome - Android',
            way: [
                'Chromeを開く: Chromeブラウザを起動します。',
                '設定を開く: 右上の三点メニューをタップし、「設定」を選択します。',
                'サイトの設定: 「サイトの設定」をタップし、「通知」を選択します。',
                '通知を許可: 通知を許可したいサイトを選び、「許可」をタップします。',
            ],
        },
        {
            title: 'Chrome - PC',
            way: [
                'Chromeを開く: Chromeブラウザを起動します。',
                'サイトにアクセス: 通知を許可したいウェブサイトにアクセスします。',
                'サイト情報を表示: アドレスバーの左側にある鍵アイコンをクリックし、「サイトの設定」を選択します。',
                '通知を許可: 「通知」のドロップダウンメニューから「許可」を選択します。',
            ],
        },
        {
            title: 'Brave - Android',
            way: [
                'Braveを開く: Braveブラウザを起動します。',
                '設定を開く: 右下の三点メニューをタップし、「設定」を選択します。',
                'サイトの設定: 「サイトの設定」を選択し、「通知」をタップします。',
                '通知を許可: 通知を許可したいサイトを選び、「許可」をタップします。',
            ],
        },
        {
            title: 'Microsoft Edge - Android',
            way: [
                'Edgeを開く: Microsoft Edgeブラウザを起動します。',
                '設定を開く: 右上の三点メニューをタップし、「設定」を選択します。',
                'Cookieとサイトのアクセス許可: 「Cookieとサイトのアクセス許可」を選択し、「通知」をタップします。',
                '通知を許可: 通知を許可したいサイトを選び、「許可」をタップします。',
            ],
        },
        {
            title: 'Vivaldi - Android',
            way: [
                'Vivaldiを開く: Vivaldiブラウザを起動します。',
                '設定を開く: Vivaldiメニューから「設定」を選択します。',
                'ウェブページ設定: 「ウェブページ」>「サイトの設定」を選択します。',
                '通知を許可: 通知を許可したいサイトを選び、「許可」をタップします。',
            ],
        },
    ];

    return (
        <>
            <Button onPress={onOpen}>手動で行う場合</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size='lg'
                scrollBehavior='inside'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>
                                通知権限を手動で設定する手順
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    通知の権限を許可する手順は、使用しているデバイスやブラウザにより異なります。以下に主要なブラウザ別の手順を記載します。
                                </p>
                                <ul className='flex flex-col gap-6 mt-4'>
                                    {content.map((item, index) => (
                                        <li key={index}>
                                            <p className='font-bold'>
                                                {item.title}
                                            </p>
                                            <ol className='list-decimal list-inside mt-1 gap-2'>
                                                {item.way.map((way, index) => (
                                                    <li key={index}>{way}</li>
                                                ))}
                                            </ol>
                                        </li>
                                    ))}
                                </ul>
                            </ModalBody>
                            <ModalFooter>
                                <Button color='primary' onPress={onClose}>
                                    閉じる
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default function NotificationSettingButton() {
    const { permission, requestPermission } = useNotificationPermission();

    if (permission === 'granted') return;

    return (
        <CommonSettingItem
            title='通知設定'
            subtitle='リアルタイムの通知を受け取ることができます。'
        >
            <div className='flex gap-2'>
                <Button onClick={requestPermission}>通知を許可する</Button>
                <NotificationAuthorityRequestByHandExplanation />
            </div>
        </CommonSettingItem>
    );
}
