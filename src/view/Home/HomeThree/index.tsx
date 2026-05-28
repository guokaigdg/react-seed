import ObserverHoc from './components/ObserverComponents';
import ObserverComponents from './components/ObserverHoc';

import './index.less';

const HomeThree = () => {
    return (
        <div className='home-three-root'>
            <div className='home-three-base'>
                <ObserverHoc />
            </div>
            <div className='home-three-base'>
                <ObserverComponents />
            </div>
        </div>
    );
};

export default HomeThree;
