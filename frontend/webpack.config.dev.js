const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: './src/index.tsx',
    cache: true,
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        symlinks: false,
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@styles': path.resolve(__dirname, 'src/styles'),
        },
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    devServer: {
        port: 8080,
        hot: true,
        compress: true,
        publicPath: '/',
    },
};
