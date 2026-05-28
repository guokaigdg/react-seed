/*
 * react-router 官方文档
 * https://reactrouter.com/7.1.5/upgrading/v6
 */
import SuspenseLazy from '@/components/SuspenseLazy';
import {Navigate, RouteObject} from 'react-router';

const Home = SuspenseLazy(() => import('@/view/Home'));
const HomeOne = SuspenseLazy(() => import('@/view/Home/HomeOne'));
const HomeTwo = SuspenseLazy(() => import('@/view/Home/HomeTwo'));
const HomeThree = SuspenseLazy(() => import('@/view/Home/HomeThree'));
const HomeFour = SuspenseLazy(() => import('@/view/Home/HomeFour'));
const HomeMobx = SuspenseLazy(() => import('@/view/Home/HomeMobx'));
const HomeIcon = SuspenseLazy(() => import('@/view/Home/HomeIcon'));
const HomeOrder = SuspenseLazy(() => import('@/view/Home/HomeOrder'));
const Dashboard = SuspenseLazy(() => import('@/view/Dashboard'));
const About = SuspenseLazy(() => import('@/view/About'));
const NotFound = SuspenseLazy(() => import('@/view/NotFound'));

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to='home/one' /> // 重定向
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
