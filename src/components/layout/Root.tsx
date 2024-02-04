export default function Root({ children }: { children: React.ReactNode }) {
    return (
        <div className='max-w-lg mx-auto min-h-[100svh] bg-base-100 min-[512px]:shadow-lg'>
            {children}
            <div className='fixed top-0 left-0 w-full h-[100svh] bg-neutral-content -z-50 hidden min-[512px]:block'></div>
        </div>
    );
}
