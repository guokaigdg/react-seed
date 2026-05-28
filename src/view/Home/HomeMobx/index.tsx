import {observer} from 'mobx-react-lite';
import {useStores} from '@/store';
import {Button} from '@/components';

import './index.less';

const HomeMobx = () => {
    const {globalStore, aboutStore} = useStores();
    const {count, name, addCount, setName} = globalStore;
    const {count: aboutCount, aboutAddCount} = aboutStore;

    const handleClickAddCount = () => {
        addCount();
        aboutAddCount();
    };
    const handleClickSetName = () => {
        setName(`Hello${Math.random() * 10}`);
    };

    return (
        <div className='home-mobx-root'>
            <p>{name}</p>
            <p> globalStore: {count}</p>
            <p> aboutStore: {aboutCount}</p>
            <div>
                <Button onClick={handleClickAddCount}>Mobx数据更新-addCount</Button>
                <span className='mobx-block'></span>
                <Button onClick={handleClickSetName}>Mobx数据更新-setName</Button>
            </div>
        </div>
    );
};

export default observer(HomeMobx);
