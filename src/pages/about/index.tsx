import { Image } from '@nextui-org/react';
import Head from '../../components/ui/Head';

export default function Page() {
    return (
        <div>
            <Image
                src='https://firebasestorage.googleapis.com/v0/b/tane-project.appspot.com/o/public%2F19f8965d-826b-4d84-9188-46350ff2b97d.webp?alt=media&token=9c913e59-34ee-41c8-a997-b5d7f5c847e1'
                width='full'
                alt='image'
                className='w-full h-64 object-cover object-center'
                radius='lg'
            />
            <div className='mt-10'>
                <Head
                    title='TANE Mapについて'
                    subtitle='TANE Mapについての説明'
                />
                <div className='mt-8 flex flex-col gap-6'>
                    <p className='indent-2'>
                        私たちTANEチームは、2023年に輝緑祭が第40回を迎えたことを機に、新たな変化が必要なのではないかと考えました。その際に、桐光学園におけるデジタル化の推進という企画にたどり着きました。
                    </p>
                    <p className='indent-2'>
                        TANE
                        Mapは、広大な桐光学園の敷地において、目的のイベントを探すのに適しています。
                    </p>
                    <p className='indent-2'>
                        桐光学園には敷地の広さ故に、各クラスの教室はもちろん、選択教室、物理室、化学室、生物室、音楽室、体育館、購買や食堂などといった様々な施設があります。ただ、その多さ故に非常に来校者の方々を混乱させてしまっていました。
                    </p>
                    <p className='indent-2'>
                        その際に、このアプリを使用することで、お持ちの端末にて桐光学園の数多くある施設を視覚化し、非常に明白にすることができます。
                    </p>
                </div>
            </div>
        </div>
    );
}
