type Props = {
    title?: string;
    subtitle?: string;
    className?: string;
};

export default function Head(props: Props) {
    return (
        <div className={` ${props.className}`}>
            <h1 className='text-4xl font-bold'>{props.title}</h1>
            <p className='opacity-80 mt-2'>{props.subtitle}</p>
        </div>
    );
}
