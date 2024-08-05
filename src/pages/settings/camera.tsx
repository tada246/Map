import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from '@nextui-org/react';

export function CameraAuthorityRequestByHandExplanation() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const content: { title: string; way: string[] }[] = [
        {
            title: 'Safari - iPhone',
            way: [
                'Safariを開きます。',
                'アドレスバーの左側にある「aA」アイコンをタップします。',
                '「ウェブサイト設定」を選択します。',
                '「カメラ」を「許可」に設定します。',
            ],
        },
        {
            title: 'Safari - Mac',
            way: [
                'Safariを開きます。',
                'メニューバーから「Safari」＞「設定」を選択します。',
                '「Webサイト」タブをクリックし、「カメラ」を選択します。',
                '許可したいウェブサイトを選択し、「許可」に設定します。',
            ],
        },
        {
            title: 'Chrome - iPhone',
            way: [
                'Chromeを開きます。',
                'カメラを使用するサイトに移動します。',
                'メッセージが表示されたら「許可」をタップします。',
                'アドレスバーの左側にあるカメラアイコンをタップし、権限を「許可」に設定します。',
            ],
        },
        {
            title: 'Chrome - Android',
            way: [
                'Chromeを開きます。',
                'メニューボタン（3点アイコン）をタップし、「設定」を選択します。',
                '「サイトの設定」＞「カメラ」を選択します。',
                'カメラの権限を「許可」に設定します。',
            ],
        },
        {
            title: 'Chrome - Mac/Windows',
            way: [
                'Chromeを開きます。',
                'メニューボタン（3点アイコン）をクリックし、「設定」を選択します。',
                '「プライバシーとセキュリティ」＞「サイトの設定」＞「カメラ」を選択します。',
                'カメラの権限を「許可」に設定します。',
            ],
        },
        {
            title: 'Brave - iPhone/Android',
            way: [
                'Braveを開きます。',
                'メニューボタン（3点アイコン）をタップし、「設定」を選択します。',
                '「サイトの設定」＞「カメラ」を選択します。',
                'カメラの権限を「許可」に設定します。',
            ],
        },
        {
            title: 'Microsoft Edge - iPhone/Android',
            way: [
                'Edgeを開きます。',
                'アドレスバーの左側にある南京錠アイコンをタップします。',
                '「ウェブサイト設定」を選択します。',
                'カメラの権限を「許可」に設定します。',
            ],
        },
        {
            title: 'Vivaldi - iPhone/Android',
            way: [
                'Vivaldiを開きます。',
                'アドレスバーの左側にある南京錠アイコンをタップします。',
                '「サイトの設定」を選択します。',
                'カメラの権限を「許可」に設定します。',
            ],
        },
        {
            title: 'Arc - iPhone',
            way: [
                'Arcを開きます。',
                'カメラを使用するサイトに移動します。',
                'アドレスバーの左側にある「i」アイコンをタップします。',
                '「サイトの設定」を選択し、カメラの権限を「許可」に設定します。',
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
                                カメラの権限を許可する手順
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    カメラの権限を許可する手順は、使用しているデバイスやブラウザにより異なります。以下に主要なブラウザ別の手順を記載します。
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
