import { useState } from 'react';
import FormCard from './card';
import FormDetailModal from './modal';
import { Form } from '../../../types/firebase';

type Props = {
    data: Form[];
};

export default function FormContent(props: Props) {
    const { data } = props;
    const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

    return (
        <div className='mt-12 px-2'>
            <h2 className='text-2xl font-bold'>アンケートのお願い</h2>
            <div className='mt-3'>
                <p>アンケートのご協力をお願いします。</p>
                <div className='mt-3 flex flex-col gap-8'>
                    {data.map((form) => (
                        <FormCard
                            key={form.id}
                            form={form}
                            setSelectedFormId={setSelectedFormId}
                        />
                    ))}
                </div>
            </div>
            <FormDetailModal
                isOpen={!!selectedFormId}
                onOpenChange={() => setSelectedFormId(null)}
                forms={data}
                selectedFormId={selectedFormId!}
            />
        </div>
    );
}
