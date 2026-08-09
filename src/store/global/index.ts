import {makeAutoObservable, runInAction} from 'mobx';
import {fetchPokemon, searchPokemon} from '@/api/home-two';
import {fetchPostOrder} from '@/api/home-order';
import {
    GetRequestPokemonDataType,
    GetPokemonDataType,
    GetRequestPokemonSearchType
} from '@/api/home-two/types/home-two';
import {GetRequestOrderDataType, GetOrderDataType} from '@/api/home-order/types/home-order';

class Global {
    constructor() {
        // makeAutoObservable: 自动将所有属性和方法转换为可观察对象。
        makeAutoObservable(this);
    }
    count = 0;
    name = 'react';
    data: GetPokemonDataType[] = [];
    orderData: GetOrderDataType[] = [];
    loading = true;

    addCount = () => {
        this.count++;
    };
    setName = (data: string) => {
        this.name = data;
    };

    getFetchGetTest = async (params: GetRequestPokemonDataType) => {
        runInAction(() => {
            this.loading = true;
        });
        try {
            const res = await fetchPokemon(params);
            const {results} = res.data;
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

    clearPokemonData = () => {
        runInAction(() => {
            this.data = [];
        });
    };

    searchPokemonByName = async (params: GetRequestPokemonSearchType) => {
        runInAction(() => {
            this.loading = true;
        });
        try {
            const res = await searchPokemon(params.query);
            const pokemonData = res.data;
            runInAction(() => {
                this.data = pokemonData.results;
                this.loading = false;
            });
        } catch (err) {
            console.log(err);
            runInAction(() => {
                this.loading = false;
            });
        }
    };
    getPostOrder = async (params: GetRequestOrderDataType) => {
        this.loading = true;
        try {
            const res = await fetchPostOrder(params);
            const {orders, result} = res.data;
            if (result === 'Fail') {
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
