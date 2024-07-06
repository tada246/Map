import { memo } from 'react';
import { Form } from '../../../types/firebase';
import { Button, Link } from '@nextui-org/react';
import { shortLink } from '../../../features/shortLink';

type Props = {
    form: Form;
    setSelectedFormId: (id: string) => void;
};

const FormCard = memo((props: Props) => {
    const { form } = props;

    return (
        <div className='p-5 shadow-small rounded-large bg-default-50'>
            <h2 className='text-2xl font-bold line-clamp-1' id='form'>
                {form.name}
            </h2>
            <p className='line-clamp-4 mt-1'>
                {form.content?.replace('¥n', ' ')}
            </p>
            <div className='flex gap-2 mt-4'>
                <Button
                    color='primary'
                    onClick={() => props.setSelectedFormId(form.id)}
                >
                    詳細を見る
                </Button>
                <Button as={Link} isExternal showAnchorIcon href={form.url}>
                    アンケートを行う
                </Button>
            </div>
            <div className='mt-2'>
                <p className='text-tiny text-default-600'>
                    <span className='font-bold'>
                        {shortLink(form.url || '')}
                    </span>{' '}
                    にリダイレクトします
                </p>
            </div>
        </div>
    );
});

export default FormCard;
