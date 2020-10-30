import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import ReactDOMServer, { renderToString } from 'react-dom/server';
import React from 'react';
const fs = require('fs');
const path = require('path');
import App from '../shared/app';
import routes from '../shared/Routes';
import {
    matchPath,
    StaticRouter
} from 'react-router-dom';
import { Provider } from 'react-redux';
import {createServerStore} from '../shared/store'
const app = new Koa();
const router = new Router();

//读取模版文件的地址
const fileResolve = file => path.resolve(__dirname,file);
//读取到模版文件
const template  = fs.readFileSync(fileResolve('assets/index.html'),'utf-8')
function templating(template){
    return props =>template.replace(/<!--(\w+)-->/g,(_,key)=>props[key.trim()])
}

router.get(['/', '/about'], async (ctx, next) => {
    const store = createServerStore();
    const promises = [];
    //只加载当前页面刷新的页面
    routes.some(route => {
        // console.log(ctx.request.path)
        const match = matchPath(ctx.request.path, route);
        if (match){
            route.loadData ? promises.push(route.loadData(store)) :null;
        }
        return match;
    });
    //全部路由的预数据加载出来
    // routes.forEach((route) => {
    //     route.loadData ? promises.push(route.loadData(store)):null;
    // })

    await Promise.all(promises).then(() => {
        //得到模版的等待替换函数
        const render = templating(template);
        
        // console.log(store.getState());
        const html = ReactDOMServer.renderToString(
            <Provider store={store}>
                <StaticRouter location={ctx.request.url}>
                    <App />
                </StaticRouter>
            </Provider>
        );
        // ctx.body = `<!DOCTYPE html>
        // <html lang="en">
        // <head>
        //     <meta charset="UTF-8">
        //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //     <title>ssr</title>
        // </head>
        // <body>
        // <script>window.REDUX = ${JSON.stringify(store.getState())} </script>
        //     <div id='root'>${html}</div>
        //     <script src="bundle.js"></script>
            
        // </body>
        // </html>`
        //输入参数，替换html和store内的内容
        ctx.body = render({
            html,
            //脱水的数据
            // store:`<script>window.REDUX = ${JSON.stringify(store.getState())} </script>`
            store:`<script>window.REDUX =${JSON.stringify(store.getState())}</script>`
        })
    })
    
})
router.get('/getData', ctx => {
    ctx.body = {
        code: 0,
        message: "ddd",
        data: "返回的数据"
    }
})
app.use(serve('assets'));
app.use(router.routes()).use(router.allowedMethods());
app.listen("8080", () => {
    console.log("开启服务8080")
})