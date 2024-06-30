import { memo } from 'react';
import { Form } from '../../../types/firebase';
import {
    Button,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@nextui-org/react';
import { shortLink } from '../../../features/shortLink';

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
                        <ModalHeader className='flex flex-col gap-1 p-6 pb-3'>
                            <h1 className='text-2xl font-bold'>
                                {selectedForm?.name}
                            </h1>
                            <p className='mt-1 text-default-600 font-normal text-sm'>
                                <span className='font-bold'>
                                    {shortLink(selectedForm?.url || '')}{' '}
                                </span>
                                にリダイレクトします
                            </p>
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
