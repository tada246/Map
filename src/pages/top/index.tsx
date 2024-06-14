import {
    Accordion,
    AccordionItem,
    Button,
    Image,
    Link as NextUILink,
} from '@nextui-org/react';
import { ReactElement } from 'react';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const accordionContent: {
    title: string;
    subtitle: string;
    content: string | ReactElement;
}[] = [
    {
        title: 'TANE Mapとは？',
        subtitle: 'このアプリの簡単な概要',
        content:
            'TANE Mapとは、桐光学園中学校高等学校の電子工学部のTANE Projectが運営している校内マップアプリケーションです。文化祭（輝緑祭）やオープンスクールなどの体験イベントの校内マップと催し物の一覧を表示できます。また、当日に行われる体験イベントのみならず過去10個分まで遡ることができます。',
    },
    {
        title: 'TANE とは？',
        subtitle: 'このアプリを運営するチームについて',
        content:
            '本チームは、桐光学園 電子工学部の活動の1つとなっています。 「TANE」の由来は、「Towards A New Era」の頭文字を取り、直訳で「新たな時代へ」という意味です。また、TANE Projectとは、TANEが行っているプロジェクトです。',
    },
    {
        title: '困ったときは？',
        subtitle: 'アプリの使い方や不明な点がある場合',
        content:
            '当日に開催される体験イベントに関する不明な点や使い方は、そのイベントの案内担当者にお尋ねください。',
    },
    {
        title: 'TANE Mapとは？',
        subtitle: 'このアプリの簡単な概要',
        content:
            'TANE Mapは、桐光学園のオープンスクールや文化祭といった体験行事の情報を提供します。体験行事当日に使われる場合は、生徒から案内があります。また、過去10個分の行事まで遡ることができ、その行事の催し物や詳細を閲覧することができます。',
    },
    {
        title: 'どのように運営されているのか',
        subtitle: '運営方法について',
        content:
            'TANE このサイト及びアプリケーションは、TANEのメンバーが作成しました（TANEについては該当するQ&Aを御覧ください）。本サイト及びアプリケーションに掲載されている情報は、生徒会や文化祭実行委員といった該当イベントの担当者によって入力されています。',
    },
    {
        title: 'このアプリが生まれた背景',
        subtitle: 'なぜこのアプリが生まれたのかについて',
        content:
            'TANE このアプリは2023年に輝緑祭が第40回を迎えたことを機に、TANEのメンバーが桐光学園におけるデジタル化を推進するべきだと考え、作成されました。',
    },
    {
        title: 'このアプリの利点',
        subtitle: '利点について',
        content:
            'TANE 本アプリは、桐光学園の体験イベントの情報を正確かつ環境に配慮しながら伝えることができます。',
    },
    {
        title: 'アクセスした情報は利用されますか？',
        subtitle: '個人情報について',
        content: (
            <p>
                <NextUILink
                    as={Link}
                    color='primary'
                    underline='hover'
                    to='/privacy'
                >
                    プライバシーポリシー
                </NextUILink>
                をご覧ください。
            </p>
        ),
    },
];

export default function Page() {
    return (
        <div>
            <div className='flex gap-6 items-center md:h-[calc(100svh-10rem)] flex-col md:flex-row justify-between'>
                <Image
                    src='https://firebasestorage.googleapis.com/v0/b/tane-project.appspot.com/o/uploads%2Fc49bd811-fee7-4f21-ae0b-4c221029d597?alt=media&token=f2c434cf-d258-47c9-9d6f-d1335e2c5530'
                    width={400}
                    height={400}
                    alt='image'
                    className='md:w-80 md:h-80 aspect-square w-full object-cover object-center rounded-lg'
                />
                <div className=''>
                    <div className='max-w-lg'>
                        <h1 className='md:text-6xl text-4xl font-bold whitespace-nowrap break-keep'>
                            桐光学園の
                            <wbr />
                            体験イベントを
                            <wbr />
                            スマートフォンで
                        </h1>
                        <p className='mt-2 text-default-500'>
                            TANE
                            Mapは、桐光学園のオープンスクールや文化祭といった体験行事の情報を提供します
                        </p>
                    </div>
                    <Button
                        as={Link}
                        to='/events'
                        color='primary'
                        variant='shadow'
                        className='mt-6'
                        endContent={<IoArrowForwardOutline />}
                    >
                        イベント一覧へ
                    </Button>
                </div>
            </div>
            <div className='mt-8'>
                <h2 className='border-l-4 border-primary-700 pl-3 text-3xl font-bold'>
                    環境に配慮し情報を伝える
                </h2>
                <div className='mt-10'>
                    <p>
                        TANE
                        Mapは、紙のパンフレットと同じ内容を取り入れることにより、ペーパーレス化を実現しています。紙の消費量・廃棄物を減らして資源を守ることは、SDGsの12「つくる責任
                        つかう責任」・13「気候変動に具体的な対策を」・15「陸の豊かさを守ろう」の3つの項目に貢献しています。
                    </p>
                    <Image
                        width='full'
                        className='w-full mt-6 rounded-none aspect-[1024/512]'
                        radius='none'
                        src='https://firebasestorage.googleapis.com/v0/b/tane-project.appspot.com/o/uploads%2F3d0c1273-8e1c-473f-99cf-616cf4004410?alt=media&token=94489a4f-a13b-459e-bb10-8fc0e78078b3'
                    ></Image>
                </div>
            </div>
            <div className='mt-24'>
                <h2 className='border-l-4 border-primary-700 pl-3 text-3xl font-bold'>
                    Q&A
                </h2>
                <div className='mt-10'>
                    <Accordion>
                        {accordionContent.map((content, index) => (
                            <AccordionItem
                                key={index}
                                title={content.title}
                                subtitle={content.subtitle}
                            >
                                {typeof content.content === 'string' ? (
                                    <p>{content.content}</p>
                                ) : (
                                    content.content
                                )}
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
