import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import React from 'react';
import ReactDOMServer, { renderToString } from 'react-dom/server';
import {
    matchPath,
    StaticRouter
} from 'react-router-dom';
import App from '../shared/app';
import { Provider } from 'react-redux';
import { createServerStore } from '../shared/store'
import routes from '../shared/Routes';

const fs = require('fs');
const path = require('path');

//读取模版文件的地址
const fileResolve = file => path.resolve(__dirname, file);
//读取到模版文件
const template = fs.readFileSync(fileResolve('assets/temlpate.html'), 'utf-8')
function templating(template) {
    return props => template.replace(/<!--(\w+)-->/g, (_, key) => props[key.trim()])
}

const app = new Koa();
//使用路由进行路径管理
const router = new Router({});
router.get(['/', '/about'], async (ctx, next) => {
    const promises = [];
    const store = createServerStore();

    routes.some(route => {
        const match = matchPath(ctx.request.path, route);
        if (match && route.loadData) {
            promises.push(route.loadData(store))
        }
        // if (match) {
        //     route.loadData ? promises.push(route.loadData(store)) : promises.push(new Promise(resolve => resolve(123)))
        // }
        return match;
    })
//      routes.forEach((route) => {
//          route.loadData ? promises.push(route.loadData(store)):null;
//  })
    await Promise.all(promises).then(() => {

        const html = ReactDOMServer.renderToString(
            <Provider store={store}>
                <StaticRouter location={ctx.request.url}>
                    <App />
                </StaticRouter>
            </Provider>
        );
        const render = templating(template);
        ctx.body = render({
            html,
            store: `<script>window.REDUX =${JSON.stringify(store.getState())}</script>`
        })
    })

})

router.get('/getData', ctx => {
    ctx.body = {
        code: 0,
        data: "得到的数据"
    }
})
//把静态资源绑到页面上
app.use(serve('assets'));
//把路由中间件绑上app
app.use(router.routes()).use(router.allowedMethods());
app.listen(7777, () => {
    console.log('ssr服务已启动于7777端口')
})