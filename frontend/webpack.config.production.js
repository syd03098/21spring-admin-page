const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
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
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: undefined,
                    parse: {},
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                    },
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    module: false,
                    output: {},
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: true,
                    safari10: false,
                },
            }),
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: true,
            generateStatsFile: true,
        }),
    ],
});
