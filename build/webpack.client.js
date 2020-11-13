const path = require('path');
const { GenerateSW, InjectManifest } = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: 'production',
    //入口文件
    entry: path.join(__dirname, '../src/client/index.tsx'),
    //出口位置
    output: {
        filename: 'scripts/[name].bundle.js',
        path: path.join(__dirname, '../dist/assets'),
    },
    module: {
        rules: [
            {
                test: /\.ts(x)?$/,
                use: 'babel-loader'
            }
        ]
    },
    resolve: {
        //设置如何被解析
        extensions: ['.ts', '.js', '.json', '.tsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'temlpate.html',
            template: path.resolve(__dirname, '../src/client/template/index.html')
        }),
        // new ServiceWorkerWebpackPlugin({
        //     entry: path.join(__dirname, '../src/service-worker.js'),
        //   }),

        // new GenerateSW(
        //     {
        //     // swDest: 'workboxServiceWorker.js', // 注意点1: 不写这个名字, 插件默认会生成 service-worker.js 这个文件,然后不知道WHO又生成了一次service-worker.js这个文件(内容不是workbox预期), 所以webpack生成的workbox的脚本就这样被替换了! 导致插件配置好的文件其实没被写出!!!

        // //     // 当我们每次访问网站时都会去下载这个文件，当发现文件不一致时，就会安装这个新 Service Worker ，安装成功后，它将进入等待阶段。
        // //     // importWorkboxFrom: 'disabled', // 可填`cdn`,`local`,`disabled`, 区别下面整理
        // //     // importScripts: 'https://fds.api.x.net/workbox-cdn/workbox-sw.js', // 我从自己的cdn引入了workbox,这样就不用每个项目都上传

        // //     // 这三个都写true
        //     skipWaiting: true, // 新 Service Worker 安装成功后需要进入等待阶段，skipWaiting: true 将使其跳过等待，安装成功后立即接管网站。
        //     clientsClaim: true, // 立即接管
        //     offlineGoogleAnalytics: true, // 离线也记录ga数据, 有网了再上报的意思。
        //     cleanupOutdatedCaches: true,  // 尝试删除老版本缓存
        // //     // 缓存规则, 具体下面记录, 更详细的请查阅文档。 目前只缓存api
        //     runtimeCaching: [
        //         {
        //             urlPattern: /^https:\/\/easy-mock\.com\//,
        //             handler: 'NetworkFirst',
        //             options: {
        //                 cacheName: 'cached-api',
        //                 networkTimeoutSeconds: 2,
        //                 expiration: {
        //                     maxEntries: 50,
        //                     maxAgeSeconds: 1 * 24 * 60 * 60, // 1 day
        //                 },
        //                 cacheableResponse: {
        //                     statuses: [0, 200],
        //                 },
        //             },
        //         },
        //     ],
        // }
        // ),
    ]
}