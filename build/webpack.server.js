const path = require('path');
const nodeExternals = require('webpack-node-externals');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();
module.exports = smp.wrap({
    mode: 'development',
    // cache: true,
    // cache: {
    //     type:'filesyswetem'
    //   },
    entry: path.join(__dirname, '../src/server/app.tsx'),
    output: {
        filename: 'app.js',
        path: path.join(__dirname, '../dist'),
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [{
            test: /\.ts(x)?$/,
            use: 'babel-loader',
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.mjs']
    }
})