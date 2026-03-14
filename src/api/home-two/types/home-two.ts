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

export interface SearchPokemonResponseType {
    count: number;
    results: GetPokemonDataType[];
}

// 接口返回统一格式数据
export type GetResponsePokemonData = ApiResponseData<{
    results: GetPokemonDataType[];
    count: number;
    next: string;
    previous: number | null;
}>;

export type GetResponsePokemonDetail = ApiResponseData<GetPokemonDetailType>;

export type GetResponseSearchPokemon = ApiResponseData<SearchPokemonResponseType>;
