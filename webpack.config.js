const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        letterboxd: './src/scripts/letterboxd.ts',
        input: './src/scripts/input.ts',
        data: './src/scripts/data.ts'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/scripts'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/manifest.json', to: '../manifest.json' },
                { from: './src/popup.html', to: '../popup.html' },
                { from: './src/styles/popup.css', to: '../styles/popup.css' },
                { from: './src/images', to: '../images' },
            ]
        }),
    ]
};
