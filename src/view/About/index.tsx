import {useState, useEffect} from 'react';
import {observer, useLocalObservable} from 'mobx-react-lite';
import {runInAction} from 'mobx';
import {GithubLogoIcon} from '@phosphor-icons/react';
import {fetchPokemonList} from '@/api/home-two';
import * as styles from './index.module.less';

interface StoreType {
    pokemon: string;
    getFetchPokemo: () => void;
}
// FSM模式: 有限状态机
// 有限状态机（Finite-state machine,FSM），又称有限状态自动机，简称状态机，表示有限个状态以及在这些状态之间的转移和动作等行为的数学模型
type DataStateType = 'LOADING' | 'SUCCESS' | 'ERROR';

const About = () => {
    const [dataState, setDataState] = useState<DataStateType>('LOADING');
    const PokemoStore = useLocalObservable<StoreType>(() => ({
        pokemon: '',
        async getFetchPokemo() {
            try {
                const res = await fetchPokemonList({
                    limit: 500
                });
                const {results} = res.data;
                if (results) {
                    setDataState('SUCCESS');
                    runInAction(() => {
                        this.pokemon = 'Pokemon';
                    });
                } else {
                    setDataState('ERROR');
                    runInAction(() => {
                        this.pokemon = 'ERROR';
                    });
                }
            } catch {
                setDataState('ERROR');
            }
        }
    }));
    const {getFetchPokemo, pokemon} = PokemoStore;

    useEffect(() => {
        getFetchPokemo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.aboutRoot}>
            <a href='https://github.com/guokaigdg/react-seed'>
                <GithubLogoIcon size={68} color='#f9f4da' />
            </a>
            <div className={styles.header}> 恭喜开启 less + css modules 模式 </div>
            <p>Hello About</p>
            {dataState === 'LOADING' && <div>LOADING</div>}
            {dataState === 'SUCCESS' && <div>SUCCESS {pokemon}</div>}
            {dataState === 'ERROR' && <div>ERROR {pokemon}</div>}
        </div>
    );
};

export default observer(About);
