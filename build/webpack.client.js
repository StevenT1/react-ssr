const path = require('path');
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const smp = new SpeedMeasurePlugin();
// module.exports = smp.wrap({
module.exports = {
    mode: 'development',
    // cache: {
    //     type:'filesystem'
    //   },
    entry: path.join(__dirname, '../src/client/index.tsx'),
    output: {
        filename: 'scripts/[name].bundle.js',
        path: path.join(__dirname, '../dist/assets'),
    },
    module: {
        rules: [{
            test: /\.ts(x)?$/,
            use: 'babel-loader',
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.mjs']
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/client/template/index.html'),
        })
    ]
    // })
}