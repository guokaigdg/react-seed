import React, {ReactNode, useState} from 'react';
import {useNavigate, Outlet, useLocation} from 'react-router-dom';
import CX from 'classnames';
import {observer} from 'mobx-react-lite';
import {
    IconContext,
    GlobeHemisphereEast,
    HardDrives,
    IceCream,
    Keyboard,
    InstagramLogo,
    FileTsx,
    GithubLogo,
    PersonSimpleBike,
    GameController
} from '@phosphor-icons/react';
import {Button} from '@/components';
import './index.less';

interface LinkItem {
    icon: ReactNode;
    name: string;
    link: string;
}

function Home() {
    const navigate = useNavigate();
    const params = useLocation();
    const {pathname} = params;
    const [activeLink, setActiveLink] = useState<string>(pathname);

    const MenuLink = [
        {name: 'HomeOne', icon: <GlobeHemisphereEast />, link: '/home/one'},
        {name: 'Pokemon', icon: <GameController />, link: '/home/two'},
        {name: 'HomeThree', icon: <FileTsx />, link: '/home/three'},
        {name: 'Mobx 数据更新', icon: <HardDrives />, link: '/home/mobx'},
        {name: 'Phosphor 图标库', icon: <InstagramLogo />, link: '/home/four'},
        {name: 'Svg 封装', icon: <IceCream />, link: '/home/icon'},
        {name: '订单查询', icon: <Keyboard />, link: '/home/order'},
        {name: '套件重量查询', icon: <PersonSimpleBike />, link: '/home/road-bike'}
    ];

    const handleClickLink = (link: string) => {
        setActiveLink(link);
        navigate(link);
    };

    const homeClasses = CX('home-root', {
        'home-root-no-bg': activeLink === '/home/order'
    });

    return (
        <div className={homeClasses}>
            <Outlet />
            <div className={CX('home-dock', {'home-dock-light': activeLink === '/home/two'})}>
                <div className='dock-items'>
                    <div className='dock-item github-dock'>
                        <a href='https://github.com/guokaigdg/react-seed' className='dock-link'>
                            <IconContext.Provider
                                value={{
                                    size: 28,
                                    weight: 'regular',
                                    mirrored: false
                                }}
                            >
                                <GithubLogo />
                            </IconContext.Provider>
                        </a>
                    </div>
                    {MenuLink.map((item: LinkItem) => (
                        <div key={item.name} className='dock-item'>
                            <Button
                                type='text'
                                className='dock-btn'
                                active={activeLink === item.link}
                                onClick={() => handleClickLink(item.link)}
                            >
                                <IconContext.Provider
                                    value={{
                                        size: 24,
                                        weight: activeLink === item.link ? 'fill' : 'regular',
                                        mirrored: false
                                    }}
                                >
                                    {item.icon}
                                </IconContext.Provider>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default observer(Home);
