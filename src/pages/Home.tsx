import { Link } from 'react-router-dom';
import useEventList from '../hooks/useAllEvents';
import { Running } from '../types/firebase';
import logo from '../assets/tane-map.svg';

export default function Page() {
    const { data, isLoading } = useEventList();

    console.log(data);

    return (
        <div>
            <div className='mt-12'>
                {/* ロゴ */}
                <img src={logo} alt='logo' className='w-24 mx-auto' />
                <h1 className='text-center font-bold text-4xl text-neutral mt-4'>
                    TOKO TANE Map
                </h1>
                <p className='text-center mt-1 px-2'>TOKO TANE Map</p>
            </div>
            <div className='flex gap-3 mt-12'>
                {/* ローディング */}
                {isLoading && (
                    <div className='text-center w-full'>ローディング中...</div>
                )}
                {/* イベント一覧 */}
                {data?.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
}

function EventCard(props: { event: Running }) {
    const { event } = props;

    return (
        <div className='card bg-base-100 shadow-xl w-full'>
            <figure>
                <img
                    src={event.imageURL}
                    alt='event-picture'
                    className='w-full h-72 object-cover'
                />
            </figure>
            <div className='card-body'>
                <h2 className='card-title'>{event.name}</h2>
                <p>{event.overview}</p>
                <div className='card-actions mt-1'>
                    <Link
                        to={`/app/${event.id}`}
                        className='btn btn-primary w-full'
                    >
                        開始
                    </Link>
                </div>
            </div>
        </div>
    );
}
