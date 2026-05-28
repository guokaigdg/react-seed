const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server'); // 本地起一个 http 服务，可配置指定其端口/热更新...
const chalk = require('chalk'); // 终端字符串样式个性化自定义
const webpackDevConfig = require('../config/webpack.dev');
const detect = require('detect-port-alt'); // 端口检测
const {SERVER_HOST, SERVER_PORT, divider} = require('../conf');
const ip = require('ip'); // 获取 IP 地址实用程序

const compiler = Webpack(webpackDevConfig);
const devServerOptions = {
    ...webpackDevConfig.devServer
};
const server = new WebpackDevServer(compiler, devServerOptions);

// 获取 basename
const basename = process.env.USER_BASENAME || '/react-seed';

// 端口处理
async function choosePort(port, host) {
    const resPort = await detect(port, host);
    if (resPort === port) {
        return resPort;
    }
    const message =
        process.platform !== 'win32' && port < 1024
            ? 'Admin permissions are required to run a server on a port below 1024.'
            : `Something is already running on port ${port}.`;

    if (process.stdout.isTTY) {
        console.log(chalk.yellow(message));
        return resPort;
    }
    console.log(chalk.red(message));
    return null;
}

// 终端日志log输出显示
const logger = {
    error: (err) => {
        console.error(chalk.red(err));
    },
    start: (port, host) => {
        console.log(`Server started! ${chalk.green('✓')}`);
        console.log(`
    ${chalk.bold('App running at:')}
    ${chalk.gray(divider)}
    - Local: ${chalk.blue(`  http://${host}:${port}${basename}`)}
    - Network: ${chalk.blue(`http://${ip.address()}:${port}${basename}`)}
    ${chalk.gray(divider)}

    Note that the development build is not optimized.
    To create a production build, run npm run build.

    ${chalk.magenta(`Press ${chalk.italic('Ctrl+c')} to stop`)}
        `);
    }
};

// 开启本地服务入口
async function startServer() {
    const resPort = await choosePort(SERVER_PORT, SERVER_HOST);
    try {
        if (resPort !== null) {
            server.listen(resPort, SERVER_HOST, (err) => {
                if (err) {
                    return logger.error(err.message);
                }
                return logger.start(resPort, SERVER_HOST);
            });
        }
    } catch (error) {
        console.log(chalk.red(error.message));
    }
}

startServer();
