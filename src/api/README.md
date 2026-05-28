## api 文件介绍

| 文件              | 说明              | 备注                                           |
| ----------------- | ----------------- | ---------------------------------------------- |
| request.ts        | axios 封装        |                                                |
| README.md         | api 文件说明      |                                                |
| home-two/index.ts | two 页面-请求接口 | home-two/types/home-two.ts (请求参数类型定义 ) |
| ...               | ...               | ...                                            |

## 请求接口文件说明

```
├── home-order                  # 订单页面, 按照页面划分api
│   └──types
|   |   └──home-order.ts        # 订单页面类型
|   └──index.ts                 # 订单页面接口
├── home-two
│   └──types
|   |   └── home-two.ts
|   └──index.ts
```

## request.ts 介绍

- 请求配置
- 实现请求拦截
- 实现响应拦截
- 常见错误信息处理
- api 集中式管理
- 重复发送请求
