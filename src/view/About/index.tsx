import React, {useState, useEffect} from 'react';
import {observer, useLocalObservable} from 'mobx-react-lite';
import {runInAction} from 'mobx';
import {GithubLogo} from '@phosphor-icons/react';
import {fetchPokemon} from '@/api/index';
import './index.less';

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
                const res: any = await fetchPokemon({
                    limit: 500
                });
                console.log(res);
                const {results} = res;
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
            } catch (err) {
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
        <div className='about-root'>
            <a href='https://github.com/guokaigdg/react-seed'>
                <GithubLogo size={68} color='#f9f4da' />
            </a>
            <p>Hello About</p>
            {dataState === 'LOADING' && <div>LOADING</div>}
            {dataState === 'SUCCESS' && <div>SUCCESS {pokemon}</div>}
            {dataState === 'ERROR' && <div>ERROR {pokemon}</div>}
        </div>
    );
};

export default observer(About);
