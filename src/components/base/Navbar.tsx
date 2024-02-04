import { FaBars } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import logo from '../../assets/tane-map-name.svg';

export default function Navbar() {
    return (
        <div className='navbar bg-base-100 shadow sticky top-3 rounded-2xl p-3'>
            <div className='flex-1'>
                <Link to='/' className='btn btn-ghost'>
                    <img src={logo} alt='' className='w-28' />
                </Link>
            </div>
            <div className='flex-none'>
                <div className='drawer drawer-end'>
                    <input
                        id='my-drawer-4'
                        type='checkbox'
                        className='drawer-toggle'
                    />
                    <div className='drawer-content'>
                        {/* サイドバーボタン */}
                        <label
                            htmlFor='my-drawer-4'
                            className='drawer-button btn btn-square btn-ghost'
                        >
                            <FaBars size={20} />
                        </label>
                    </div>
                    <div className='drawer-side'>
                        <label
                            htmlFor='my-drawer-4'
                            aria-label='close sidebar'
                            className='drawer-overlay'
                        ></label>
                        <ul className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
                            {/* サイドバーコンテンツ！ */}
                            <li>
                                <p>概要</p>
                                <ul>
                                    <li>
                                        <Link to='/'>桐光学園について</Link>
                                    </li>
                                    <li>
                                        <Link to='/'>TANEについて</Link>
                                    </li>
                                    <li>
                                        <Link to='/'>TANE Mapについて</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <p>リーガル</p>
                                <ul>
                                    <li>
                                        <Link to='/'>利用規約</Link>
                                    </li>
                                    <li>
                                        <Link to='/'>プライバシーポリシー</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
