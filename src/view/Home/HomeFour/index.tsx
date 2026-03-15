import React from 'react';
import {
    IconContext,
    HorseIcon,
    AddressBookIcon,
    AndroidLogoIcon,
    PaletteIcon,
    ApertureIcon,
    HeartIcon,
    CubeIcon,
    GithubLogoIcon
} from '@phosphor-icons/react';
import './index.less';

const HomeFour = () => {
    return (
        <div className='home-four-root'>
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
                    <PaletteIcon />
                    <GithubLogoIcon />
                </div>
            </IconContext.Provider>
        </div>
    );
};

export default HomeFour;
