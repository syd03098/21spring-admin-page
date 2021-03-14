const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const commonWebpackConfig = require('./webpack.config.common');

module.exports = merge(commonWebpackConfig, {
    mode: 'production',
    devtool: false,
    entry: './src/index',
    cache: true,
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].[contenthash].js',
        publicPath: '/dist/',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new ESBuildMinifyPlugin({
                sourcemap: false,
            }),
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            generateStatsFile: false,
        }),
    ],
});
