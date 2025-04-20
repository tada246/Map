import { useParams } from 'react-router-dom';
import Head from '../../components/ui/Head';
import useEvent from '../../hooks/useEvent';
import { ErrorPage } from '..';
import useStampRally from '../../hooks/useStampRally';
import { useEffect, useState } from 'react';
import { Button, Image } from '@nextui-org/react';
import StampRallyScan from './scan';
import StampRallyResult from './resultQR';
import { IoBalloon } from 'react-icons/io5';

export default function Page() {
    const { eventId } = useParams<{ eventId: string }>();
    const { data, isLoading, error } = useEvent(eventId!.toString());
    const {
        data: stampRallyData,
        isLoading: stampRallyIsLoading,
        error: stampRallyError,
    } = useStampRally(eventId?.toString());
    const [localStampRally, setLocalStampRally] = useState<
        string[] | undefined
    >();

    function getLocal() {
        if (!eventId) return;

        const preStampData = localStorage.getItem(`stamp-${eventId}`);
        if (!preStampData) {
            setLocalStampRally([]);
            localStorage.setItem(`stamp-${eventId}`, JSON.stringify([]));
        }

        setLocalStampRally(JSON.parse(preStampData || '[]'));
    }

    function setLocal(stampData: string[]) {
        if (!eventId) return;

        setLocalStampRally(stampData);
        localStorage.setItem(`stamp-${eventId}`, JSON.stringify(stampData));
    }

    useEffect(() => {
        getLocal();
    }, []);

    function getLocalStampRallyNumber(): number {
        if (!localStampRally) {
            return 0;
        }

        try {
            return localStampRally.length;
        } catch {
            return 0;
        }
    }

    function addLocalStampRally(stampId: string) {
        if (!localStampRally || !eventId) {
            return;
        }

        try {
            const newStampData = [...localStampRally, stampId];
            setLocal(newStampData);
        } catch {}
    }

    function resetStampRally() {
        try {
            setLocal([]);
        } catch {}
    }

    function getStampRallyAllData(): string {
        if (!localStampRally) {
            return '';
        }

        try {
            return localStampRally.join('-');
        } catch {
            return '';
        }
    }

    if (error || stampRallyError) {
        return <ErrorPage />;
    }

    if (isLoading || !data || stampRallyIsLoading || !stampRallyData) {
        return <p className='text-center mt-12'>ロード中...</p>;
    }

    if (!data.isStampRallyEnabled) {
        return (
            <>
                <Head
                    title='スタンプラリー'
                    subtitle='スタンプラリーQRコードを読み取って参加しましょう！'
                />
                <div className='mt-10'>
                    <IoBalloon size={64} className='mx-auto' />
                    <p className='text-3xl font-bold text-center mt-5'>残念</p>
                    <p className='text-center mt-1'>
                        今回のイベントではスタンプラリーは、やってないみたいです
                    </p>
                </div>
            </>
        );
    }

    return (
        <div>
            <Head
                title='スタンプラリー'
                subtitle='スタンプラリーQRコードを読み取って参加しましょう！'
            />
            <div className='mt-10 grid grid-cols-2 md:gap-12 gap-6'>
                <div className='flex-1 aspect-square rounded-large shadow-small relative overflow-hidden'>
                    <div className='absolute top-0 left-0 bg-gradient-to-tr from-cyan-500 to-blue-500 blur w-full h-full' />
                    <div className='absolute top-0 left-0 w-full h-full p-6 flex flex-col-reverse gap-1'>
                        <p className='md:text-2xl text-xl font-bold text-white'>
                            全てで{stampRallyData.length}個
                        </p>
                        <p className='text-sm text-white'>
                            スタンプをスキャンしてクリアしよう！
                        </p>
                    </div>
                </div>
                <div className='flex-1 aspect-square rounded-large shadow-small relative overflow-hidden'>
                    <div className='absolute top-0 left-0 bg-gradient-to-br from-purple-500 to-pink-500 blur w-full h-full' />
                    <div className='absolute top-0 left-0 w-full h-full p-6 flex flex-col-reverse gap-1'>
                        <p className='md:text-2xl text-xl font-bold text-white'>
                            現在 {getLocalStampRallyNumber()}個
                        </p>
                        <p className='text-sm text-white'>
                            {getLocalStampRallyNumber() ===
                            stampRallyData.length
                                ? '全てのスタンプをクリアしました！'
                                : `残り ${
                                      stampRallyData.length -
                                      getLocalStampRallyNumber()
                                  }個。 がんばろう！`}
                        </p>
                    </div>
                </div>
            </div>
            <div className='mt-6'>
                {getLocalStampRallyNumber() === stampRallyData.length && (
                    <StampRallyResult data={getStampRallyAllData()} />
                )}
                {getLocalStampRallyNumber() != stampRallyData.length && (
                    <StampRallyScan addStamp={addLocalStampRally} />
                )}
            </div>
            <div className='mt-6'>
                <h2 className='font-bold text-xl'>ヒント</h2>
                <div className='flex flex-col gap-2 mt-2'>
                    {stampRallyData.map((stamp, index) => (
                        <div
                            key={index}
                            className='flex gap-4 items-center p-3'
                        >
                            <Image
                                src={stamp.imageURL}
                                alt={stamp.name}
                                width={64}
                                height={64}
                                className='w-16 h-16'
                                classNames={{
                                    wrapper: 'w-16 h-16',
                                    img: 'w-16 h-16',
                                }}
                                radius='full'
                            />
                            <div>
                                <p className='font-bold text-lg'>
                                    {stamp.name}
                                </p>
                                <p>ヒント：{stamp.hint}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-6'>
                <h2 className='font-bold text-xl'>リセット</h2>
                <div className='mt-2'>
                    <Button
                        color='danger'
                        variant='flat'
                        onPress={resetStampRally}
                        fullWidth
                    >
                        スタンプラリーリセット
                    </Button>
                    <p className='mt-1 text-sm text-danger text-center'>
                        エラーが発生した場合以外はリセットしないでください
                    </p>
                </div>
            </div>
        </div>
    );
}
