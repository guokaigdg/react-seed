export interface GetRequestPokemonDataType {
    offset?: number;
    limit: number;
}

export interface GetPokemonDataType {
    name: string;
    url: string;
    detail?: GetPokemonDetailType;
}

export interface GetPokemonDetailType {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    types: Array<{
        type: {
            name: string;
        };
    }>;
    abilities: Array<{
        ability: {
            name: string;
        };
    }>;
    stats: Array<{
        base_stat: number;
        stat: {
            name: string;
        };
    }>;
}

export interface GetRequestPokemonSearchType {
    query: string;
}

// pokeapi 列表接口原始返回结构（无统一包装）
export interface GetResponsePokemonData {
    results: GetPokemonDataType[];
    count: number;
    next: string | null;
    previous: string | null;
}

// pokeapi 详情接口原始返回结构（无统一包装）
export type GetResponsePokemonDetail = GetPokemonDetailType;
