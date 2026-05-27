import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {IconContext, Horse, AddressBook, AndroidLogo, Aperture, Heart, Cube} from '@phosphor-icons/react';
import './index.less';

const Dashboard = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const inventoryItems = [
        {icon: <Horse />, name: 'Horse'},
        {icon: <Heart />, name: 'Heart'},
        {icon: <Cube />, name: 'Cube'},
        {icon: <AddressBook />, name: 'Book'},
        {icon: <AndroidLogo />, name: 'Droid'},
        {icon: <Aperture />, name: 'Lens'},
        {icon: null, name: ''},
        {icon: null, name: ''},
        {icon: null, name: ''},
        {icon: null, name: ''}
    ];

    return (
        <div className='dashboard-root'>
            {/* 日期时间组件 - 动森经典 */}
            <div className='ac-datetime'>
                <div className='ac-date'>
                    <span className='ac-weekday'>{weekdays[currentTime.getDay()]}</span>
                    <span className='ac-monthday'>
                        {months[currentTime.getMonth()]} {currentTime.getDate()}
                    </span>
                </div>
                <div className='ac-time'>
                    {currentTime.getHours().toString().padStart(2, '0')}
                    <span className='ac-colon'>:</span>
                    {currentTime.getMinutes().toString().padStart(2, '0')}
                </div>
            </div>

            {/* 物品栏/背包格子 UI */}
            <div className='ac-inventory'>
                <div className='ac-inventory-title'>Inventory</div>
                <div className='ac-inventory-grid'>
                    <IconContext.Provider value={{size: 36, weight: 'duotone', mirrored: false}}>
                        {inventoryItems.map((item, idx) => (
                            <div key={idx} className={`ac-inv-slot ${item.icon ? 'has-item' : ''}`}>
                                {item.icon && <div className='ac-inv-icon'>{item.icon}</div>}
                            </div>
                        ))}
                    </IconContext.Provider>
                </div>
            </div>

            {/* 动森经典对话框 */}
            <div className='ac-dialog'>
                <div className='ac-dialog-box'>
                    <div className='ac-dialog-avatar'>T</div>
                    <div className='ac-dialog-content'>
                        <div className='ac-dialog-name'>Tom Nook</div>
                        <div className='ac-dialog-text'>
                            Welcome to Nook Plaza! Feel free to explore the island services, yes yes!
                        </div>
                    </div>
                </div>
                <div className='ac-dialog-arrow' />
            </div>
        </div>
    );
};

export default observer(Dashboard);
