const path = require('path');

// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

module.exports = {
    mode: 'development',
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
    resolve:{
        //设置如何被解析
        extensions: ['.ts', '.js', '.json','.tsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename:'temlpate.html',
            template:path.resolve(__dirname, '../src/client/template/index.html')
        })
    ]
    // })
}