import { QRCodeCanvas } from 'qrcode.react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from '@nextui-org/react';
import { IoBalloon } from 'react-icons/io5';
type Props = {
    data: string;
};

export default function StampRallyResult(props: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button
                fullWidth
                color='secondary'
                variant='flat'
                className='flex flex-col h-52'
                onPress={onOpen}
            >
                <IoBalloon size={42} />
                <p>結果のQRコードを表示</p>
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>
                                スランプラリーQRスキャン
                            </ModalHeader>
                            <ModalBody>
                                <div className='w-full aspect-square flex justify-center items-center'>
                                    <QRCodeCanvas
                                        value={props.data}
                                        size={256}
                                        level={'L'}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color='primary' onPress={onClose}>
                                    確認
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
