import { useLocation } from 'react-router-dom';
import useForms from '../../hooks/useForms';
import { shortLink } from '../../features/shortLink';

export default function Page() {
    const { pathname } = useLocation();
    const { data, isLoading, error } = useForms(pathname.split('/')[2] ?? null);

    return (
        <div className='pt-8'>
            {isLoading && <p className='text-center'>Loading...</p>}
            {error && <p className='text-center'>エラー</p>}
            {data && (
                <div className='flex flex-col gap-6'>
                    {data.map((form) => (
                        <div
                            key={form.id}
                            className='card bg-base-100 shadow-lg w-full'
                        >
                            <div className='card-body'>
                                <h2 className='card-title font-bold'>
                                    {form.name}
                                </h2>
                                <div className='badge badge-outline'>
                                    {shortLink(form.url)}
                                </div>
                                <div className='text-sm'>
                                    {form.content.split('¥n').map((d, i) => (
                                        <p key={i}>{d}</p>
                                    ))}
                                </div>
                                <div className='card-actions justify-end'>
                                    <a
                                        href={form.url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='btn btn-primary btn-sm'
                                    >
                                        アンケートを行う
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
