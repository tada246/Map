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
            title: 'Safari (iOS)',
            way: [
                'ホーム画面から設定アプリをタップして開きます。',
                '設定アプリ内で下にスクロールし、「Safari」を見つけてタップします。',
                'Safariの設定画面で、下にスクロールして「カメラ」オプションを探します。このオプションは「一般」セクションの「プライバシーとセキュリティ」セクション内にある場合があります。',
                '「カメラ」をタップすると、以下の3つのオプションが表示されます：「許可しない」、「確認」、「許可」。この中で「許可」を選択します。',
                'もし、特定のウェブサイトに対してのみカメラの権限を与えたい場合は、設定内の「ウェブサイトごとの設定」セクションに移動し、当アプリのURLを見つけて「許可」に設定します。',
            ],
        },
        {
            title: 'Google Chrome',
            way: [
                'アドレスバーの左側にある鍵アイコンをクリックします。',
                '「サイトの設定」をクリックします。',
                '「カメラ」の項目を「許可」に変更します。',
            ],
        },
        {
            title: 'Mozilla Firefox',
            way: [
                'アドレスバーの左側にある情報アイコン（i）をクリックします。',
                '「カメラ」の項目を「許可」に変更します。',
            ],
        },
        {
            title: 'Microsoft Edge',
            way: [
                'アドレスバーの左側にある鍵アイコンをクリックします。',
                '「サイトのアクセス許可」をクリックします。',
                '「カメラ」の項目を「許可」に変更します。',
            ],
        },
        {
            title: 'Safari (macOS)',
            way: [
                'Safariのメニューバーから「Safari」をクリックし、「環境設定」を選択します。',
                '「Webサイト」タブを選択し、左側のメニューから「カメラ」を選びます。',
                '当アプリのURLを探し、ドロップダウンメニューから「許可」を選択します。',
            ],
        },
        {
            title: 'Vivaldi',
            way: [
                'ブラウザの右上にある3つのドットアイコンをクリックします。',
                'メニューから「設定」を選択します。',
                '左側のメニューから「プライバシー」を選びます。',
                '「サイトの設定」をクリックします。',
                '「カメラ」を選択し、使用するカメラを選び、「許可」に設定します。',
            ],
        },
        {
            title: 'Brave',
            way: [
                'ブラウザの右上にある3本線のアイコンをクリックします。',
                'メニューから「設定」を選択します。',
                '左側のメニューから「プライバシーとセキュリティ」を選びます。',
                '「サイトとシールド設定」をクリックします。',
                '「カメラ」の項目を「許可」に変更します。',
            ],
        },
        {
            title: 'Arc',
            way: [
                'Arcブラウザを開き、アドレスバーに「arc://settings」を入力して設定ページを開きます。',
                '左側のメニューから「プライバシーとセキュリティ」を選択します。',
                '「サイトの設定」をクリックします。',
                '「カメラ」を選択し、使用するカメラを選び、「許可」に設定します。',
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
                                権限を与える方法
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
