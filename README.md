React-SSR项目

1、clone后，yarn安装依赖

2、 yarn dev:run //打包运行
    yarn dev:build //打包
    yarn dev:start //运行服务
3、 scripts内的sh文件需要添加权限 ， mac先输入chmod u+rx scripts/*.sh 添加权限
目录
    client 客户端
    server 服务器
    shared 共享代码

搭建服务器 使用koa yarn add koa @types/koa

客户端搭建 react react-dom @types/react @types/react-dom

webpack webpack-cli

babel-loader @babel/core @babel/preset-react

koa-static @koa/router

webpack-node-externals

nodemon

npm-run-all
