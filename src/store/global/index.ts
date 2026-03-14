import {makeAutoObservable, runInAction} from 'mobx';
import {fetchPokemon, fetchPostOrder, searchPokemon, fetchPokemonByName} from '@/api';
import {pokemonOptions} from '@/interface/http';

class Global {
    constructor() {
        // makeAutoObservable: 自动将所有属性和方法转换为可观察对象。
        makeAutoObservable(this);
    }
    count = 0;
    name = 'react';
    data: any = [];
    searchResults: any = [];
    pokemonDetail: any = null;
    orderData: any = [];
    loading = true;
    searchLoading = false;

    addCount = () => {
        this.count++;
    };
    setName = (data: string) => {
        this.name = data;
    };

    getFetchGetTest = async (params: pokemonOptions) => {
        runInAction(() => {
            this.loading = true;
        });
        try {
            const result: any = await fetchPokemon(params);
            const {results} = result;
            // 在 MobX 中，不管是同步还是异步操作，都可以放到 action 中，
            // 只是异步操作在修改属性时，需要将赋值操作放到 runInAction 中。
            runInAction(() => {
                this.data = [...this.data, ...results];
                this.loading = false;
            });
        } catch (err) {
            console.log(err);
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    // 搜索宝可梦
    searchPokemonByName = async (query: string) => {
        if (!query.trim()) {
            runInAction(() => {
                this.searchResults = [];
            });
            return;
        }
        
        runInAction(() => {
            this.searchLoading = true;
        });
        
        try {
            const result: any = await searchPokemon(query);
            runInAction(() => {
                this.searchResults = result.results || [];
                this.searchLoading = false;
            });
        } catch (err) {
            console.log('搜索失败:', err);
            runInAction(() => {
                this.searchResults = [];
                this.searchLoading = false;
            });
        }
    };

    // 获取宝可梦详情
    getPokemonDetail = async (name: string) => {
        runInAction(() => {
            this.searchLoading = true;
        });
        
        try {
            const result = await fetchPokemonByName(name);
            runInAction(() => {
                this.pokemonDetail = result;
                this.searchLoading = false;
            });
            return result;
        } catch (err) {
            console.log('获取详情失败:', err);
            runInAction(() => {
                this.pokemonDetail = null;
                this.searchLoading = false;
            });
            return null;
        }
    };

    // 清空搜索结果
    clearSearchResults = () => {
        runInAction(() => {
            this.searchResults = [];
            this.pokemonDetail = null;
        });
    };

    getPostOrder = async (params: any) => {
        this.loading = true;
        try {
            const result: any = await fetchPostOrder(params);
            const {orders, result: newResult} = result;
            if (newResult === 'Fail') {
                console.log('请求结果出错');
            }
            runInAction(() => {
                this.orderData = orders;
                this.loading = false;
            });
        } catch (err) {
            console.log(err);
            runInAction(() => {
                this.loading = false;
            });
        }
    };
}

const globalStore = new Global();
export {globalStore};
