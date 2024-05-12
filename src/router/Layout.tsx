import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/base/Header';
import SideBar from '../components/base/SideBar';
import Footer from '../components/base/Footer';

type Props = {
    children: ReactNode;
};

export default function Layout(props: Props) {
    const location = useLocation();

    const isNotHeader = location.pathname.startsWith('/events/');
    const isMap = /^\/events\/[a-z0-9|-]+\/?$/.test(location.pathname);

    if (isMap) {
        return (
            <div className='flex font-noto'>
                <SideBar />
                <div className='w-full'>{props.children}</div>
            </div>
        );
    }

    if (isNotHeader) {
        return (
            <div className='flex font-noto'>
                <SideBar />
                <div className='w-full max-w-2xl mx-auto md:py-12 px-4 pt-12 pb-24'>
                    {props.children}
                </div>
            </div>
        );
    }

    return (
        <div className='font-noto'>
            <Header />
            <div className='w-full max-w-[1024px] mx-auto px-6 py-8 min-h-[calc(100svh-7rem)]'>
                {props.children}
            </div>
            <Footer />
        </div>
    );
}
