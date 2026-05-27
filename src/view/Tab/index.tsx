import React from 'react';
import {NavLink} from 'react-router-dom';
import './index.less';

const Tab = () => {
    return (
        <div className='tab-root'>
            <div className='tab-wrap'>
                <NavLink to='home/one'>Nook Home</NavLink>
                <NavLink to='dashboard'>Nook Plaza</NavLink>
                <NavLink to='about'>Island Info</NavLink>
            </div>
        </div>
    );
};
export default Tab;
