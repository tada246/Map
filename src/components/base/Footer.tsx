import { Image, Link as NextUILink } from '@nextui-org/react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className='w-full bg-default-100'>
            <div className='w-full max-w-[1024px] mx-auto px-6'>
                <div className='flex md:flex-row flex-col py-12 gap-6'>
                    <div className='w-full'>
                        <Image
                            src='/tane-map-name.png'
                            className='w-36 h-auto'
                            alt='ロゴ'
                        />
                    </div>
                    <div className='w-full'>
                        <h3 className='font-bold'>概要</h3>
                        <ul className='flex flex-col gap-1 mt-3'>
                            <li>
                                <NextUILink
                                    as={Link}
                                    to='/about'
                                    underline='hover'
                                    size='sm'
                                >
                                    TANE Mapについて
                                </NextUILink>
                            </li>
                            <li>
                                <NextUILink
                                    isExternal
                                    showAnchorIcon
                                    href='http://www.toko.ed.jp/'
                                    underline='hover'
                                    size='sm'
                                >
                                    桐光学園について
                                </NextUILink>
                            </li>
                            <li>
                                <NextUILink
                                    isExternal
                                    showAnchorIcon
                                    href='http://toko-tane.net/'
                                    underline='hover'
                                    size='sm'
                                >
                                    プロジェクトについて
                                </NextUILink>
                            </li>
                        </ul>
                    </div>
                    <div className='w-full'>
                        <h3 className='font-bold'>リンク</h3>
                        <ul className='flex flex-col gap-1 mt-3'>
                            <li>
                                <NextUILink
                                    isExternal
                                    showAnchorIcon
                                    href='http://www.toko.ed.jp/'
                                    underline='hover'
                                    size='sm'
                                >
                                    桐光学園公式ホームページ
                                </NextUILink>
                            </li>
                            <li>
                                <NextUILink
                                    isExternal
                                    showAnchorIcon
                                    href='https://www.instagram.com/tokogakuen_official/'
                                    underline='hover'
                                    size='sm'
                                >
                                    桐光学園 Instagram
                                </NextUILink>
                            </li>
                            <li>
                                <NextUILink
                                    isExternal
                                    showAnchorIcon
                                    href='https://www.facebook.com/tokogakuen.hs.jhs/?locale=ja_JP'
                                    underline='hover'
                                    size='sm'
                                >
                                    桐光学園 Facebook
                                </NextUILink>
                            </li>
                        </ul>
                    </div>
                    <div className='w-full'>
                        <h3 className='font-bold'>法的</h3>
                        <ul className='flex flex-col gap-1 mt-3'>
                            <li>
                                <NextUILink
                                    as={Link}
                                    to='/privacy'
                                    underline='hover'
                                    size='sm'
                                >
                                    プライバシーポリシー
                                </NextUILink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='w-[calc(100%-4rem)] mx-auto border-t-1 border-default-300' />
                <div className='py-4 flex justify-center'>
                    <div className='bg-[#1d50a2] p-3 rounded-small'>
                        <Image
                            src='https://firebasestorage.googleapis.com/v0/b/tane-project.appspot.com/o/public%2F7a089808-b039-4047-a6a8-a3b6bff327fd.webp?alt=media&token=6ce51dae-8f1e-4f73-aa95-cd96c13e91db'
                            alt='toko logo'
                            radius='none'
                            width={150}
                            height='auto'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
