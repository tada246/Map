import Navbar from '../base/Navbar';

export default function AboutRoot({ children }: { children: React.ReactNode }) {
    return (
        <div className='px-6'>
            <Navbar />
            <div className='mt-8'>{children}</div>
        </div>
    );
}
