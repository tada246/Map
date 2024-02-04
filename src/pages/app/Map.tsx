import { useAtom } from 'jotai';
import { eventInfo } from '../../features/atoms';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { FaExpand, FaMinus, FaPlus } from 'react-icons/fa6';

export default function Page() {
    const [eventData] = useAtom(eventInfo);

    if (!eventData.data || !eventData) {
        return <div />;
    }

    return (
        <div>
            <TransformWrapper
                initialScale={1}
                initialPositionX={0}
                initialPositionY={0}
            >
                {({ zoomIn, zoomOut, resetTransform }) => (
                    <div>
                        <div className='fixed bottom-20 z-10 join right-4 min-[512px]:right-[calc((100vw-512px)/2+16px)]'>
                            <button
                                className='btn btn-sm join-item'
                                onClick={() => zoomIn()}
                            >
                                <FaPlus />
                            </button>
                            <button
                                className='btn btn-sm join-item'
                                onClick={() => zoomOut()}
                            >
                                <FaMinus />
                            </button>
                            <button
                                className='btn btn-sm join-item'
                                onClick={() => resetTransform()}
                            >
                                <FaExpand />
                            </button>
                        </div>
                        <TransformComponent>
                            <div className='w-screen h-[calc(100svh-64px)] relative'>
                                <img
                                    src={eventData.data?.mapImageURL}
                                    alt=''
                                    className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                                />
                            </div>
                        </TransformComponent>
                    </div>
                )}
            </TransformWrapper>
        </div>
    );
}
