const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ESBuildPlugin } = require('esbuild-loader');

module.exports = {
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        symlinks: false,
        alias: {
            '@components': path.resolve(__dirname, './src/components'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@services': path.resolve(__dirname, './src/services'),
            '@pages': path.resolve(__dirname, './src/pages'),
        },
    },
    module: {
        rules: [
            // {
            //     test: /\.(tsx|ts)?$/,
            //     loader: 'esbuild-loader',
            //     options: {
            //         loader: 'tsx',
            //     },
            // },
            {
                test: /\.(tsx|ts)?$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true,
                },
            },
        ],
    },
    optimization: {
        runtimeChunk: 'single',
        moduleIds: 'hashed',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'initial',
                },
            },
        },
    },
    plugins: [
        // new ESBuildPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
};
