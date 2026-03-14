import React, {useState, useEffect} from 'react';
import {useStores} from '@/store';
import {Button} from '@/components';
import {observer} from 'mobx-react-lite';
import './index.less';

const HomeTwo = () => {
    const {globalStore} = useStores();
    const {loading, data, getFetchGetTest, searchPokemonByName, clearPokemonData} = globalStore;
    const [offset, setOffset] = useState<number>(20);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
    const [showDetail, setShowDetail] = useState<boolean>(false);

    const handleSearch = async () => {
        if (!searchKeyword.trim()) {
            setSearchKeyword('');
            setOffset(20);
            clearPokemonData();
            await getFetchGetTest({
                limit: 20,
                offset: 0
            });
            return;
        }
        await searchPokemonByName({
            query: searchKeyword.trim()
        });
    };

    const handleClearSearch = async () => {
        setSearchKeyword('');
        setOffset(20);
        clearPokemonData();
        await getFetchGetTest({
            limit: 20,
            offset: 0
        });
    };

    const handleGetMorePokemon = async () => {
        await getFetchGetTest({
            limit: 20,
            offset: offset
        });
        setOffset(offset + 20);
    };

    const handlePokemonClick = (pokemon: any) => {
        setSelectedPokemon(pokemon);
        setShowDetail(true);
    };

    const handleCloseDetail = () => {
        setShowDetail(false);
        setSelectedPokemon(null);
    };

    useEffect(() => {
        getFetchGetTest({
            limit: 20,
            offset: 0
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='home-two-root'>
            <div className='search-wrap'>
                <input
                    className='input'
                    type='search'
                    placeholder='输入宝可梦名称'
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                ></input>
                <Button className='search-btn' onClick={handleSearch}>
                    查询
                </Button>
                <Button className='clear-btn' onClick={handleClearSearch}>
                    清空
                </Button>
            </div>

            <div className='list-root'>
                {data.map((item: any) => (
                    <div key={item.name} className='pokemon-item' onClick={() => handlePokemonClick(item)}>
                        <img alt='' className='img' src={`https://img.pokemondb.net/artwork/large/${item.name}.jpg`} />
                        <span>{item.name}</span>
                        {item.detail && item.detail.types && (
                            <div className='pokemon-types'>
                                {item.detail.types.map((type: any) => (
                                    <span key={type.type.name} className='type-badge-small'>
                                        {type.type.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                <div className='pokemon-item-bottom'>
                    {loading ? <Button>loading</Button> : <Button onClick={handleGetMorePokemon}>查看更多</Button>}
                </div>
            </div>

            {showDetail && selectedPokemon && (
                <div className='pokemon-detail-modal' onClick={handleCloseDetail}>
                    <div className='pokemon-detail-content' onClick={(e) => e.stopPropagation()}>
                        <div className='detail-header'>
                            <h2>{selectedPokemon.name}</h2>
                            <button className='close-btn' onClick={handleCloseDetail}>
                                ×
                            </button>
                        </div>
                        <div className='detail-body'>
                            <img
                                alt=''
                                className='detail-img'
                                src={`https://img.pokemondb.net/artwork/large/${selectedPokemon.name}.jpg`}
                            />
                            {selectedPokemon.detail && (
                                <div className='detail-info'>
                                    <div className='info-row-basic'>
                                        <div className='basic-info-item'>
                                            <span>身高:</span>
                                            <span>{selectedPokemon.detail.height / 10} m</span>
                                        </div>
                                        <div className='basic-info-item'>
                                            <span>体重:</span>
                                            <span>{selectedPokemon.detail.weight / 10} kg</span>
                                        </div>
                                        <div className='basic-info-item'>
                                            <span>属性:</span>
                                            <div className='types'>
                                                {selectedPokemon.detail.types.map((type: any) => (
                                                    <span key={type.type.name} className='type-badge'>
                                                        {type.type.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='info-row'>
                                        <span>能力:</span>
                                        <div className='abilities'>
                                            {selectedPokemon.detail.abilities.map((ability: any) => (
                                                <span key={ability.ability.name} className='ability-badge'>
                                                    {ability.ability.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='info-row'>
                                        <span>种族值:</span>
                                        <div className='stats'>
                                            {selectedPokemon.detail.stats.map((stat: any) => (
                                                <div key={stat.stat.name} className='stat-item'>
                                                    <span className='stat-name'>{stat.stat.name}:</span>
                                                    <span className='stat-value'>{stat.base_stat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default observer(HomeTwo);
