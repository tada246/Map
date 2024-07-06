import { useParams } from 'react-router-dom';
import FormContent from './forms';
import InfoContent from './info';
import useEvent from '../../hooks/useEvent';
import useForms from '../../hooks/useForms';
import { ErrorPage, NotFound } from '..';
import { Spinner } from '@nextui-org/react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function Page() {
    const { eventId } = useParams<{ eventId: string }>();
    const {
        data: eventData,
        isLoading: eventIsLoading,
        error: eventError,
    } = useEvent(eventId!.toString());
    const {
        data: formData,
        isLoading: formIsLoading,
        error: formError,
    } = useForms(eventId!.toString());
    const location = useLocation();
    const hashValue = location.hash;

    useEffect(() => {
        if (hashValue) {
            const scrollTo = hashValue.replace('#', '');
            document.getElementById(scrollTo)?.scrollIntoView();
        }
    }, [hashValue]);

    if (eventError || formError) return <ErrorPage />;

    if (eventIsLoading || formIsLoading)
        return (
            <div className='flex justify-center mt-10'>
                <Spinner size='lg' />
            </div>
        );

    if (!eventData || !formData) return <NotFound />;

    return (
        <>
            <div></div>
            <InfoContent data={eventData} />
            <FormContent data={formData} />
        </>
    );
}
