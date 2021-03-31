const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const commonWebpackConfig = require('./webpack.config.common');

module.exports = merge(commonWebpackConfig, {
    mode: 'production',
    devtool: false,
    entry: ['./src/index'],
    cache: true,
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].[contenthash].js',
        publicPath: '/',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    compress: {
                        unused: true,
                        drop_console: true,
                    },
                },
            }),
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            // openAnalyzer: true,
            // generateStatsFile: true,
            openAnalyzer: false,
            generateStatsFile: false,
        }),
    ],
});
