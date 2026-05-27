import React from 'react';
import './index.less';

function NotFound() {
    return (
        <div className='not-found-root'>
            <div className='ac-lost-card'>
                <div className='ac-lost-icon'>?</div>
                <div className='ac-lost-code'>404</div>
                <div className='ac-lost-text'>This island could not be found...</div>
                <div className='ac-lost-hint'>Maybe Kapp took a wrong turn?</div>
            </div>
        </div>
    );
}

export default NotFound;
