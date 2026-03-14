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
 * @function fetchPokemon
 * @description 获取宝可梦列表（包含详细信息）
 */

export async function fetchPokemon(data: GetRequestPokemonDataType) {
    const response: any = await request<GetResponsePokemonData>({
        url: 'https://pokeapi.co/api/v2/pokemon',
        params: data
    });

    const results = response.data.results || [];

    const detailedResults = await Promise.all(
        results.map(async (pokemon: any) => {
            try {
                const detailResponse = await fetchPokemonByName(pokemon.name);
                return {
                    ...pokemon,
                    detail: detailResponse.data
                };
            } catch {
                return pokemon;
            }
        })
    );

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
    const response: any = await request({
        url: 'https://pokeapi.co/api/v2/pokemon',
        params: {limit: 1000}
    });

    const allPokemon = response.data.results || [];
    const searchTerm = query.toLowerCase();

    const filtered = allPokemon.filter((pokemon: any) => pokemon.name.toLowerCase().includes(searchTerm));

    const detailedResults = await Promise.all(
        filtered.slice(0, 20).map(async (pokemon: any) => {
            try {
                const detailResponse = await fetchPokemonByName(pokemon.name);
                return {
                    ...pokemon,
                    detail: detailResponse.data
                };
            } catch {
                return pokemon;
            }
        })
    );

    return {
        data: {
            count: filtered.length,
            results: detailedResults
        }
    };
}

/**
 * @function getJsonTest
 * @description 请求测试 application/json
 * @description 使用说明 https://juejin.cn/post/7365414174217404466
 */

export function getJsonTest(params: GetRequestPokemonDataType) {
    return request({
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/api/data/xxx',
        params
    });
}
