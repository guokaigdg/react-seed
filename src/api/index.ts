/*
 * @file: 所有的接口列表
 * 宝可梦api https://pokeapi.co/about
 */

import client from './client';
import {pokemonOptions, orderData} from './type';

/**
 * @function fetchPokemon
 * @description 获取宝可梦列表（包含详细信息）
 */

export async function fetchPokemon(data: pokemonOptions) {
    // 先获取列表
    const response: any = await client({
        url: 'https://pokeapi.co/api/v2/pokemon',
        params: data
    });
    
    const results = response.results || [];
    
    // 获取每个宝可梦的详细信息
    const detailedResults = await Promise.all(
        results.map(async (pokemon: any) => {
            try {
                const detail = await fetchPokemonByName(pokemon.name);
                return {
                    ...pokemon,
                    detail
                };
            } catch (error) {
                // 如果获取详情失败，返回原始数据
                return pokemon;
            }
        })
    );
    
    return {
        ...response,
        results: detailedResults
    };
}

/**
 * @function fetchPokemonByName
 * @description 根据名称查询宝可梦详情
 * @param {string} name - 宝可梦名称
 */

export function fetchPokemonByName(name: string) {
    return client({
        url: `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    });
}

/**
 * @function searchPokemon
 * @description 搜索宝可梦（获取所有数据后前端过滤）
 * @param {string} query - 搜索关键词
 */

export async function searchPokemon(query: string) {
    // 获取所有宝可梦数据
    const response: any = await client({
        url: 'https://pokeapi.co/api/v2/pokemon',
        params: { limit: 1000 }
    });
    
    const allPokemon = response.results || [];
    const searchTerm = query.toLowerCase();
    
    // 过滤匹配的宝可梦
    const filtered = allPokemon.filter((pokemon: any) => 
        pokemon.name.toLowerCase().includes(searchTerm)
    );
    
    // 获取前20个匹配结果的详细信息
    const detailedResults = await Promise.all(
        filtered.slice(0, 20).map(async (pokemon: any) => {
            try {
                const detail = await fetchPokemonByName(pokemon.name);
                return {
                    ...pokemon,
                    detail
                };
            } catch (error) {
                return pokemon;
            }
        })
    );
    
    return {
        count: filtered.length,
        results: detailedResults
    };
}

/**
 * @function fetchPostOrder
 * @description  查询订单请求
 */

export function fetchPostOrder(data: orderData) {
    const CORS_PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    const TARGET_API_URL = 'http://api.iatkb.com/order/check';
    return client({
        url: `${CORS_PROXY_URL}${TARGET_API_URL}`,
        method: 'post',
        data
    });
}
