import { memo } from 'react';
import { Form } from '../../types/firebase';
import {
    Button,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@nextui-org/react';

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
    forms: Form[];
    selectedFormId: string | null;
};

const FormDetailModal = memo((props: Props) => {
    const selectedForm = props.forms.find(
        (form) => form.id === props.selectedFormId
    );

    return (
        <Modal isOpen={props.isOpen} onOpenChange={() => props.onOpenChange()}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className='flex flex-col gap-1'>
                            <h1 className='text-xl font-bold'>
                                {selectedForm?.name}
                            </h1>
                        </ModalHeader>
                        <ModalBody>
                            <div className='leading-normal'>
                                {selectedForm?.content
                                    .split('\n')
                                    .map((line) => (
                                        <p key={line} className='py-2'>
                                            {line}
                                        </p>
                                    ))}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color='danger'
                                variant='light'
                                onPress={onClose}
                            >
                                閉じる
                            </Button>
                            <Button
                                color='primary'
                                as={Link}
                                href={selectedForm?.url}
                                isExternal
                                showAnchorIcon
                            >
                                アンケートを行う
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
});

export default FormDetailModal;
