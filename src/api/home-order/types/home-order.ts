export interface GetRequestOrderDataType {
    item: string;
    order: string;
    qq: string;
}

export interface GetOrderDataType {
    id: number;
    qq: string;
    phone: string;
    ver?: string[];
}

// 接口返回原始结构（无统一包装）
export interface GetResponseOrdereData {
    result: string;
    orders: GetOrderDataType[];
}
