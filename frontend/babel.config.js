module.exports = {
    presets: [
        ['@babel/preset-env', { targets: 'last 2 Chrome versions', loose: true }],
        ['@babel/preset-typescript'],
        ['@babel/preset-react'],
    ],
    plugins: [
        [
            'babel-plugin-styled-components',
            {
                fileName: true,
                minify: true,
            },
        ],
        [
            '@babel/plugin-proposal-class-properties',
            {
                loose: true,
            },
        ],
    ],
};
