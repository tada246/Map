import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { IoInformationCircleOutline, IoQrCode } from 'react-icons/io5';
import { useZxing } from 'react-zxing';

type Props = {
    addStamp: (stampId: string) => void;
};

export default function StampRallyScan(props: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [result, setResult] = useState('');

    useEffect(() => {
        if (result) {
            props.addStamp(result);
            onOpenChange();
            setResult('');
        }
    }, [result]);

    return (
        <>
            <Button
                fullWidth
                color='primary'
                variant='flat'
                className='flex flex-col h-52'
                onPress={onOpen}
            >
                <IoQrCode size={42} />
                <p>スタンプラリーQRコードをスキャン</p>
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>
                                スランプラリーQRスキャン
                            </ModalHeader>
                            <ModalBody>
                                <Content setResult={setResult} />
                            </ModalBody>
                            <ModalFooter className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <IoInformationCircleOutline size={14} />
                                    <p className='text-xs'>
                                        QRコードを読み取ると自動で始まります
                                    </p>
                                </div>
                                <Button
                                    color='danger'
                                    variant='light'
                                    onPress={onClose}
                                >
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

function Content(props: { setResult: (result: string) => void }) {
    const { ref } = useZxing({
        onDecodeResult(result) {
            props.setResult(result.getText());
        },
    });

    return <video ref={ref} className='w-full aspect-[4/3] rounded-medium' />;
}
