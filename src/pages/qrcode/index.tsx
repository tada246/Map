import { useEffect, useState } from 'react';
import Head from '../../components/ui/Head';
import useWindowSize from '../../hooks/useWindowSize';
import { useZxing } from 'react-zxing';
import { APP_URL } from '../../store/app';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack, IoQrCode } from 'react-icons/io5';
import { Button } from '@nextui-org/react';
import useCameraPermission from '../../hooks/useCameraPermission';

export default function Page() {
    const [width] = useWindowSize();

    if (width >= 768) {
        return <DesktopContent />;
    }

    return <MobileContent />;
}

function redirectURL(url: string, navigate: any, setMessage: any) {
    const isAppURL = url.startsWith(`${APP_URL}/`) || url === APP_URL;

    if (isAppURL) {
        let navigateURL: string = '';

        if (navigateURL === APP_URL) {
            navigateURL = '/';
        } else {
            navigateURL = url.replace(APP_URL, '');
        }

        navigate(navigateURL);
    } else if (url == '') {
        setMessage('QRコードを読み取ってください。');
    } else {
        setMessage('このQRコードは対応していません。');
    }
}

function DesktopContent() {
    const [result, setResult] = useState<string>('');
    const { ref } = useZxing({
        onDecodeResult(result) {
            setResult(result.getText());
        },
    });
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();
    const hasCameraPermission = useCameraPermission();

    useEffect(() => {
        redirectURL(result, navigate, setMessage);
    }, [result]);

    return (
        <div>
            <Head
                title='ココドコ（QRコード機能）'
                subtitle='QRコードを読み取って、どこにいるのかを確認しよう！'
            />
            <div className='mt-10'>
                <div className='relative'>
                    <video ref={ref} className='w-full block rounded-large' />
                    <div className='absolute top-0 w-full left-0 h-full'>
                        <div className='flex justify-center items-center h-full'>
                            <div className='relative w-56 h-56'>
                                <div className='absolute top-0 left-0 w-10 h-1 bg-white rounded-full'></div>
                                <div className='absolute top-0 left-0 w-1 h-10 bg-white rounded-full'></div>
                                <div className='absolute top-0 right-0 w-10 h-1 bg-white rounded-full'></div>
                                <div className='absolute top-0 right-0 w-1 h-10 bg-white rounded-full'></div>
                                <div className='absolute bottom-0 left-0 w-10 h-1 bg-white rounded-full'></div>
                                <div className='absolute bottom-0 left-0 w-1 h-10 bg-white rounded-full'></div>
                                <div className='absolute bottom-0 right-0 w-10 h-1 bg-white rounded-full'></div>
                                <div className='absolute bottom-0 right-0 w-1 h-10 bg-white rounded-full'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className='mt-3 text-center font-bold'>{message}</p>
                {!hasCameraPermission && (
                    <div className='mt-3'>
                        <p className='text-center'>
                            カメラの使用を許可してください。
                            <br />
                            QRコードを読み取るためには、カメラの使用を許可する必要があります。
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

function MobileContent() {
    const [result, setResult] = useState<string>('');
    const { ref } = useZxing({
        onDecodeResult(result) {
            setResult(result.getText());
        },
    });
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();
    const hasCameraPermission = useCameraPermission();
    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        redirectURL(result, navigate, setMessage);
    }, [result]);

    return (
        <div>
            <div className='fixed top-0 left-0 w-full h-[100svh] z-40'>
                <video
                    ref={ref}
                    className='absolute top-0 w-full left-0 h-[100svh] block object-cover bg-black'
                />
                <div className='absolute top-0 w-full left-0 h-full z-50'>
                    <div className='absolute top-5 left-1/2 -translate-x-1/2 w-[calc(100%-4rem)]'>
                        <div className='flex items-center gap-3'>
                            <Button
                                radius='full'
                                className='backdrop-blur-lg bg-white/40'
                                startContent={<IoChevronBack size={16} />}
                                onClick={goBack}
                            >
                                戻る
                            </Button>
                            <div className='flex-1 backdrop-blur-lg bg-white/40 p-3 rounded-full border-1 border-danger-500'>
                                <p className='text-tiny w-full text-center font-bold'>
                                    {message}
                                </p>
                            </div>
                        </div>
                        <div className='p-5 bg-white mt-2 rounded-medium shadow-medium w-full flex gap-4 items-center'>
                            <div>
                                <IoQrCode size={32} />
                            </div>
                            <div className='flex-1'>
                                <p className='font-bold'>
                                    ココドコ（QRコード機能）
                                </p>
                                <p className='text-tiny text-default-600'>
                                    QRコードからどこにいるのかを確認しよう！
                                </p>
                            </div>
                        </div>
                    </div>
                    {!hasCameraPermission && (
                        <div className='absolute bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-4rem)] bg-white p-4 rounded-large'>
                            <p className='font-bold'>
                                カメラの使用を許可してください。
                            </p>
                            <p>
                                QRコードを読み取るためには、カメラの使用を許可する必要があります。
                            </p>
                        </div>
                    )}
                    <div className='flex justify-center items-center h-full'>
                        <div className='relative w-52 h-52'>
                            <div className='absolute top-0 left-0 w-10 h-1 bg-white rounded-full'></div>
                            <div className='absolute top-0 left-0 w-1 h-10 bg-white rounded-full'></div>
                            <div className='absolute top-0 right-0 w-10 h-1 bg-white rounded-full'></div>
                            <div className='absolute top-0 right-0 w-1 h-10 bg-white rounded-full'></div>
                            <div className='absolute bottom-0 left-0 w-10 h-1 bg-white rounded-full'></div>
                            <div className='absolute bottom-0 left-0 w-1 h-10 bg-white rounded-full'></div>
                            <div className='absolute bottom-0 right-0 w-10 h-1 bg-white rounded-full'></div>
                            <div className='absolute bottom-0 right-0 w-1 h-10 bg-white rounded-full'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
