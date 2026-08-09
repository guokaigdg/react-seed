/*
 * @file: home-two页面接口列表
 * 宝可梦api https://pokeapi.co/about
 */

import request from '../request';
import {GetRequestPokemonDataType, GetResponsePokemonData, GetResponsePokemonDetail} from './types/home-two';

/**
 * @function fetchPokemonByName
 * @description 根据名称查询宝可梦详情
 */

export function fetchPokemonByName(name: string) {
    return request<GetResponsePokemonDetail>({
        url: `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    });
}

/**
 * @function fetchPokemonList
 * @description 获取宝可梦列表（仅列表，不拉取详情）
 */

export function fetchPokemonList(data: GetRequestPokemonDataType) {
    return request<GetResponsePokemonData>({
        url: 'https://pokeapi.co/api/v2/pokemon',
        params: data
    });
}

/**
 * @description 限制并发数的 map：同一时间最多 limit 个任务执行
 */
async function mapLimit<T, R>(items: T[], limit: number, mapper: (item: T) => Promise<R>): Promise<R[]> {
    const results: R[] = [];
    let index = 0;
    const workers = Array.from({length: Math.min(limit, items.length)}, async () => {
        while (index < items.length) {
            const current = index++;
            results[current] = await mapper(items[current]);
        }
    });
    await Promise.all(workers);
    return results;
}

/**
 * @function fetchPokemon
 * @description 获取宝可梦列表（包含详细信息，详情并发受限）
 */

export async function fetchPokemon(data: GetRequestPokemonDataType) {
    const response = await fetchPokemonList(data);

    const results = response.data.results || [];

    const detailedResults = await mapLimit(results, 5, async (pokemon) => {
        try {
            const detailResponse = await fetchPokemonByName(pokemon.name);
            return {
                ...pokemon,
                detail: detailResponse.data
            };
        } catch {
            return pokemon;
        }
    });

    return {
        ...response,
        data: {
            ...response.data,
            results: detailedResults
        }
    };
}

/**
 * @function searchPokemon
 * @description 搜索宝可梦（获取所有数据后前端过滤）
 */

export async function searchPokemon(query: string) {
    const response = await request<GetResponsePokemonData>({
        url: 'https://pokeapi.co/api/v2/pokemon',
        params: {limit: 1000}
    });

    const allPokemon = response.data.results || [];
    const searchTerm = query.toLowerCase();

    const filtered = allPokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm));

    const detailedResults = await mapLimit(filtered.slice(0, 20), 5, async (pokemon) => {
        try {
            const detailResponse = await fetchPokemonByName(pokemon.name);
            return {
                ...pokemon,
                detail: detailResponse.data
            };
        } catch {
            return pokemon;
        }
    });

    return {
        data: {
            count: filtered.length,
            results: detailedResults
        }
    };
}
