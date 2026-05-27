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
            {/* 玩家护照/头像卡片 - 动森核心UI */}
            <div className='ac-passport'>
                <div className='ac-passport-header'>Island Passport</div>
                <div className='ac-passport-body'>
                    <div className='ac-avatar'>
                        <div className='ac-avatar-circle'>
                            <GithubLogo size={48} color='#5D4037' />
                        </div>
                    </div>
                    <div className='ac-passport-info'>
                        <div className='ac-passport-name'>guokaigdg</div>
                        <div className='ac-passport-title'>Island Representative</div>
                        <div className='ac-passport-status'>
                            {dataState === 'LOADING' && <span className='ac-status loading'>Loading...</span>}
                            {dataState === 'SUCCESS' && <span className='ac-status success'>{pokemon} Connected</span>}
                            {dataState === 'ERROR' && <span className='ac-status error'>Disconnected</span>}
                        </div>
                    </div>
                </div>
                <a className='ac-passport-link' href='https://github.com/guokaigdg/react-seed'>
                    Visit Island GitHub
                </a>
            </div>
        </div>
    );
};

export default observer(About);
