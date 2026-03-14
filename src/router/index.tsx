/*
 * react-router-dom v6 官方文档
 * https://reactrouter.com/en/v6.3.0/getting-started/installation
 */
import React from 'react';
import SuspenseLazy from '@/components/SuspenseLazy';
import {Navigate, RouteObject} from 'react-router-dom';

const Home = SuspenseLazy(() => import(/* webpackChunkName:"home" */ '@/view/Home'));
const HomeOne = SuspenseLazy(() => import(/* webpackChunkName:"home-one" */ '@/view/Home/HomeOne'));
const HomeTwo = SuspenseLazy(() => import(/* webpackChunkName:"home-two" */ '@/view/Home/HomeTwo'));
const HomeThree = SuspenseLazy(() => import(/* webpackChunkName:"home-three" */ '@/view/Home/HomeThree'));
const HomeFour = SuspenseLazy(() => import(/* webpackChunkName:"home-four" */ '@/view/Home/HomeFour'));
const HomeMobx = SuspenseLazy(() => import(/* webpackChunkName:"home-mobx" */ '@/view/Home/HomeMobx'));
const HomeIcon = SuspenseLazy(() => import(/* webpackChunkName:"home-icon" */ '@/view/Home/HomeIcon'));
const HomeOrder = SuspenseLazy(() => import(/* webpackChunkName:"home-order" */ '@/view/Home/HomeOrder'));
const HomeRoadbike = SuspenseLazy(() => import(/* webpackChunkName:"home-road-bike" */ '@/view/Home/HomeRoadbike'));
const Dashboard = SuspenseLazy(() => import(/* webpackChunkName:"dashboard" */ '@/view/Dashboard'));
const About = SuspenseLazy(() => import(/* webpackChunkName:"about" */ '@/view/About'));
const NotFound = SuspenseLazy(() => import(/* webpackChunkName:"not-found" */ '@/view/NotFound'));

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to='home/road-bike' /> // 重定向
    },
    {
        path: 'home',
        element: Home,
        children: [
            // 嵌套路由
            {
                path: 'one',
                element: HomeOne
            },
            {
                path: 'two',
                element: HomeTwo
            },
            {
                path: 'three',
                element: HomeThree
            },
            {
                path: 'four',
                element: HomeFour
            },
            {
                path: 'mobx',
                element: HomeMobx
            },
            {
                path: 'icon',
                element: HomeIcon
            },
            {
                path: 'order',
                element: HomeOrder
            },
            {
                path: 'road-bike',
                element: HomeRoadbike
            }
        ]
    },
    {
        path: 'dashboard',
        element: Dashboard
    },
    {
        path: 'about',
        element: About
    },
    // 未匹配到页面
    {
        path: '*',
        element: NotFound
    }
];

export default routes;
