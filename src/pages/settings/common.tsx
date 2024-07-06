type Props = {
    title?: string;
    subtitle?: string;
    children?: React.ReactNode;
    className?: string;
    show?: boolean;
};

export default function CommonSettingItem(props: Props) {
    const isShow = props.show ?? true;

    if (!isShow) return;

    return (
        <div className={`${props.className}`}>
            <h2 className='text-lg font-bold'>{props.title}</h2>
            <p className='text-default-600'>{props.subtitle}</p>
            <div className='mt-3'>{props.children}</div>
        </div>
    );
}
