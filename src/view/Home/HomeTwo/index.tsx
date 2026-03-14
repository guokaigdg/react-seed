import React, {useState, useEffect, useCallback} from 'react';
import {useStores} from '@/store';
import {Button} from '@/components';
import {observer} from 'mobx-react-lite';
import './index.less';

const HomeTwo = () => {
    const {globalStore} = useStores();
    const {loading, data, searchResults, searchLoading, getFetchGetTest, searchPokemonByName, getPokemonDetail, clearSearchResults} = globalStore;
    const [offset, setOffset] = useState<number>(20);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [selectedPokemon, setSelectedPokemon] = useState<any>(null);

    // 防抖搜索
    const debouncedSearch = useCallback(
        (query: string) => {
            const timer = setTimeout(() => {
                if (query.trim()) {
                    searchPokemonByName(query);
                }
            }, 500);
            return () => clearTimeout(timer);
        },
        [searchPokemonByName]
    );

    // 处理搜索输入变化
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        setIsSearching(value.trim() !== '');
        
        if (value.trim()) {
            debouncedSearch(value);
        } else {
            clearSearchResults();
        }
    };

    // 执行搜索
    const handleSearch = () => {
        if (searchQuery.trim()) {
            searchPokemonByName(searchQuery);
        } else {
            // 如果搜索框为空，加载更多数据
            getFetchGetTest({
                limit: 500
            });
        }
    };

    // 查看宝可梦详情
    const handleViewDetail = async (pokemon: any) => {
        if (pokemon.detail) {
            setSelectedPokemon(pokemon.detail);
        } else {
            const detail = await getPokemonDetail(pokemon.name);
            if (detail) {
                setSelectedPokemon(detail);
            }
        }
    };

    // 关闭详情
    const handleCloseDetail = () => {
        setSelectedPokemon(null);
    };

    // 查询更多
    const handleGetMorePokemon = async () => {
        await getFetchGetTest({
            limit: 20,
            offset: offset
        });
        setOffset(offset + 20);
    };

    useEffect(() => {
        getFetchGetTest({
            limit: 20,
            offset: 0
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 确定显示的数据
    const displayData = isSearching ? searchResults : data;

    return (
        <div className='home-two-root'>
            <div className='search-wrap'>
                <input 
                    className='input' 
                    type='search' 
                    placeholder='输入宝可梦名称（如：pikachu, charizard）'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button className='search-btn' onClick={handleSearch}>
                    {searchLoading ? '搜索中...' : '查询'}
                </Button>
            </div>

            {isSearching && (
                <div className='search-result-info'>
                    找到 {searchResults.length} 个结果
                </div>
            )}

            {/* 宝可梦详情弹窗 */}
            {selectedPokemon && (
                <div className='pokemon-detail-modal' onClick={handleCloseDetail}>
                    <div className='pokemon-detail-content' onClick={(e) => e.stopPropagation()}>
                        <button className='close-btn' onClick={handleCloseDetail}>×</button>
                        <div className='detail-header'>
                            <img 
                                src={selectedPokemon.sprites?.other?.['official-artwork']?.front_default || selectedPokemon.sprites?.front_default} 
                                alt={selectedPokemon.name}
                                className='detail-image'
                            />
                            <div className='detail-info'>
                                <h2>{selectedPokemon.name} <span className='pokemon-id'>#{selectedPokemon.id}</span></h2>
                                <div className='types'>
                                    {selectedPokemon.types?.map((type: any) => (
                                        <span key={type.type.name} className={`type-badge ${type.type.name}`}>
                                            {type.type.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='detail-body'>
                            <div className='info-row'>
                                <span className='label'>身高:</span>
                                <span className='value'>{selectedPokemon.height / 10} m</span>
                            </div>
                            <div className='info-row'>
                                <span className='label'>体重:</span>
                                <span className='value'>{selectedPokemon.weight / 10} kg</span>
                            </div>
                            <div className='info-row'>
                                <span className='label'>特性:</span>
                                <span className='value'>
                                    {selectedPokemon.abilities?.map((ability: any) => ability.ability.name).join(', ')}
                                </span>
                            </div>
                            <div className='stats-section'>
                                <h3>基础数值</h3>
                                {selectedPokemon.stats?.map((stat: any) => (
                                    <div key={stat.stat.name} className='stat-bar'>
                                        <span className='stat-name'>{stat.stat.name}</span>
                                        <div className='stat-progress'>
                                            <div 
                                                className='stat-fill' 
                                                style={{width: `${Math.min((stat.base_stat / 150) * 100, 100)}%`}}
                                            />
                                        </div>
                                        <span className='stat-value'>{stat.base_stat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='list-root'>
                {displayData.length > 0 ? (
                    <>
                        <div className='pokemon-list'>
                            {displayData.map((item: any) => (
                                <div 
                                    key={item.name} 
                                    className='pokemon-item'
                                    onClick={() => handleViewDetail(item)}
                                >
                                    <img 
                                        alt={item.name} 
                                        className='img' 
                                        src={item.detail?.sprites?.front_default || `https://img.pokemondb.net/artwork/large/${item.name}.jpg`}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image';
                                        }}
                                    />
                                    <span className='pokemon-name'>{item.name}</span>
                                    {item.detail?.types && (
                                        <div className='pokemon-types'>
                                            {item.detail.types.slice(0, 2).map((type: any) => (
                                                <span key={type.type.name} className={`mini-type ${type.type.name}`}>
                                                    {type.type.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {/* 搜索结果显示加载更多按钮 */}
                        {isSearching && searchResults.length >= 20 && (
                            <div className='pokemon-item-bottom'>
                                <span className='load-more-hint'>已显示前20个搜索结果</span>
                            </div>
                        )}
                        {/* 初始化列表显示查看更多 */}
                        {!isSearching && (
                            <div className='pokemon-item-bottom'>
                                {loading ? <Button>loading</Button> : <Button onClick={handleGetMorePokemon}>查看更多</Button>}
                            </div>
                        )}
                    </>
                ) : (
                    <div className='no-results'>
                        {isSearching ? (
                            <div className='empty-state'>
                                <div className='empty-icon'>🔍</div>
                                <p>未找到匹配的宝可梦</p>
                                <span className='empty-hint'>尝试输入其他名称，如：pikachu, charizard</span>
                            </div>
                        ) : (
                            <div className='empty-state'>
                                <div className='empty-icon'>📭</div>
                                <p>暂无数据</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default observer(HomeTwo);
