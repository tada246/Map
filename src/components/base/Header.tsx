import { ReactNode, useState } from 'react';
import { IoCalendar, IoHome, IoInformation } from 'react-icons/io5';
import {
    Navbar,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link as NextUILink,
    Button,
    Image,
} from '@nextui-org/react';
import { Link, useLocation } from 'react-router-dom';

interface MenuContent {
    name: string;
    link: string;
    icon: ReactNode;
}

const menu: MenuContent[] = [
    { name: 'トップ', link: '/', icon: <IoHome /> },
    { name: '概要', link: '/about', icon: <IoInformation /> },
    { name: 'イベント一覧', link: '/events', icon: <IoCalendar /> },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    return (
        <Navbar
            onMenuOpenChange={setIsMenuOpen}
            height='6rem'
            isMenuOpen={isMenuOpen}
            classNames={{ wrapper: 'max-w-[1024px] mx-auto' }}
        >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={
                        isMenuOpen ? 'メニューを閉じる' : 'メニューを開ける'
                    }
                    className='md:hidden'
                />
                <div className='flex items-center gap-10'>
                    <div className='w-32'>
                        <Link to='/'>
                            <Image
                                src='/tane-map-name.png'
                                className='w-32'
                                alt='ロゴ'
                            />
                        </Link>
                    </div>
                    <div className='hidden md:flex gap-3 items-center'>
                        {menu.map((item, i) => (
                            <Button
                                color='default'
                                className='flex items-center gap-1'
                                as={Link}
                                to={item.link}
                                variant={
                                    location.pathname === item.link
                                        ? 'flat'
                                        : 'light'
                                }
                                radius='full'
                                key={i}
                            >
                                {item.icon}
                                {item.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </NavbarContent>
            <NavbarContent justify='end'>
                <NavbarItem>
                    <Button
                        as={NextUILink}
                        color='secondary'
                        href='http://toko-tane.net/'
                        variant='flat'
                        className='hidden sm:inline-flex md:hidden lg:inline-flex'
                    >
                        プロジェクトについて
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button
                        as={NextUILink}
                        color='primary'
                        href='http://www.toko.ed.jp/'
                        variant='flat'
                        className='min-[370px]:inline-flex hidden'
                    >
                        桐光学園について
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menu.map((item, i) => (
                    <NavbarMenuItem key={i}>
                        <NextUILink
                            color={
                                item.link === location.pathname
                                    ? 'primary'
                                    : 'foreground'
                            }
                            className={`'w-full flex items-center gap-4 ${
                                item.link === location.pathname
                                    ? 'font-bold'
                                    : ''
                            }`}
                            size='lg'
                            underline='hover'
                            as={Link}
                            to={item.link}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.icon}
                            {item.name}
                        </NextUILink>
                    </NavbarMenuItem>
                ))}
                <NavbarMenuItem className='mt-5 flex flex-col gap-2'>
                    <Button
                        as={NextUILink}
                        color='primary'
                        href='http://www.toko.ed.jp/'
                        variant='flat'
                        className='min-[370px]:hidden'
                        fullWidth
                    >
                        桐光学園について
                    </Button>
                    <Button
                        as={NextUILink}
                        color='secondary'
                        href='http://toko-tane.net/'
                        variant='flat'
                        fullWidth
                    >
                        TANEプロジェクトについて
                    </Button>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}
