import { useParams } from 'react-router-dom';
import useForms from '../../hooks/useForms';
import { ErrorPage, NotFound } from '..';
import { Spinner } from '@nextui-org/react';
import Head from '../../components/ui/Head';
import { useState } from 'react';
import FormCard from './card';
import FormDetailModal from './modal';

export default function Page() {
    const { eventId } = useParams<{ eventId: string }>();
    const { data, isLoading, error } = useForms(eventId!.toString());
    const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

    if (error) return <ErrorPage />;

    if (isLoading)
        return (
            <div className='flex justify-center mt-10'>
                <Spinner size='lg' />
            </div>
        );

    if (!data) return <NotFound />;

    return (
        <div>
            <Head
                title='アンケートのお願い'
                subtitle='アンケートにご協力いただけますと幸いです'
            />
            <div className='mt-10 flex flex-col gap-8'>
                {data.map((form) => (
                    <FormCard
                        key={form.id}
                        form={form}
                        setSelectedFormId={setSelectedFormId}
                    />
                ))}
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
