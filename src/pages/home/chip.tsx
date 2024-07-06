import { Button } from '@nextui-org/react';
import { IoArrowUp, IoToday } from 'react-icons/io5';

export default function HomeChip() {
    function scrollToNowBar() {
        const now = document.querySelector('#now-bar');
        if (now) {
            now.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            });
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    return (
        <div className='fixed md:bottom-6 bottom-20 md:right-6 right-4 flex gap-3 items-center z-50'>
            <Button
                isIconOnly
                radius='full'
                onClick={scrollToTop}
                className='bg-white shadow-small'
            >
                <IoArrowUp />
            </Button>
            <Button
                radius='full'
                startContent={<IoToday />}
                onClick={scrollToNowBar}
                className='bg-white shadow-small'
            >
                現在時刻まで移動
            </Button>
        </div>
    );
}
