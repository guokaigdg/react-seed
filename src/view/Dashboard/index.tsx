import {observer} from 'mobx-react-lite';
import {
    IconContext,
    HorseIcon,
    AddressBookIcon,
    AndroidLogoIcon,
    ApertureIcon,
    HeartIcon,
    CubeIcon
} from '@phosphor-icons/react';
import './index.less';

const Dashboard = () => {
    return (
        <div className='dashboard-root'>
            <span>hello world Dashboard </span>
            <IconContext.Provider
                value={{
                    color: '#f9f4da',
                    size: 48,
                    weight: 'duotone',
                    mirrored: false
                }}
            >
                <div>
                    <HorseIcon /> {/* I'm lime-green, 32px, and bold! */}
                    <HeartIcon /> {/* Me too! */}
                    <CubeIcon /> {/* Me three :) */}
                    <AddressBookIcon />
                    <AndroidLogoIcon />
                    <ApertureIcon />
                </div>
            </IconContext.Provider>
            <span>hello world Dashboard </span>
            <span>hello world Dashboard </span>
            <span>hello world Dashboard </span>
            <span>hello world Dashboard </span>
            <span>hello world Dashboard </span>
            <span>hello world Dashboard </span>
            <span>hello world Dashboard </span>
            <span>hello world Dashboard </span>
            <span>hello world Dashboard </span>
            <span>hello world Dashboard </span>
        </div>
    );
};

export default observer(Dashboard);
