module.exports = {
    presets: [['@babel/preset-env'], ['@babel/preset-typescript'], ['@babel/preset-react']],
    plugins: [
        [
            'babel-plugin-styled-components',
            {
                fileName: true,
            },
        ],
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true,
            },
        ],
        [
            '@babel/plugin-proposal-class-properties',
            {
                loose: true,
            },
        ],
        ['react-hot-loader/babel'],
    ],
};
