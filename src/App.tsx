import {useRoutes} from 'react-router';
import Tab from '@/view/Tab';
import routes from '@/router';
import '@/styles/index.less';

function App() {
    // 通过useRoutes配置实现路由管理
    const element = useRoutes(routes);
    return (
        <div className='app'>
            <Tab />
            {element}
        </div>
    );
}

export default App;
