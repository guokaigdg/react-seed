import React from 'react';
import {
    IconContext,
    Horse,
    AddressBook,
    AndroidLogo,
    Palette,
    Aperture,
    Heart,
    Cube,
    GithubLogo
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
                <div className='icon-container'>
                    <Horse /> {/* I'm lime-green, 32px, and bold! */}
                    <Heart /> {/* Me too! */}
                    <Cube /> {/* Me three :) */}
                    <AddressBook />
                    <AndroidLogo />
                    <Aperture />
                    <Palette />
                    <GithubLogo />
                </div>
            </IconContext.Provider>
        </div>
    );
};

export default HomeFour;
