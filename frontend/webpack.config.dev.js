const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const commonWebpackConfig = require('./webpack.config.common');

module.exports = merge(commonWebpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: ['./src/index'],
    cache: true,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath: '/',
    },
    devServer: {
        port: 8080,
        hot: true,
        compress: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
