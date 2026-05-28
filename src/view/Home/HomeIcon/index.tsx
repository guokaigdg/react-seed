import {observer} from 'mobx-react-lite';
import imgPng from '@/assets/images/web.png';
import AppleIcon from '@/assets/icons/svg/apple.svg?react';
import MyIcon from '@/assets/icons/svg/my.svg?react';
import LoopIcon from '@/assets/icons/svg/loop.svg?react';
import LoadingIcon from '@/assets/icons/svg/loading.svg?react';
import './index.less';

const HomeIcon = () => {
    return (
        <div className='home-icon-root'>
            <AppleIcon className='icon-top' />
            <img className='about-img' src={imgPng} alt='' />
            <MyIcon className='icon-my' fill='pink' />
            <LoopIcon fill='#1db02e' />
            <LoadingIcon fill='#1db02e' />
        </div>
    );
};

export default observer(HomeIcon);
