const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        letterboxd: './src/js/letterboxd.ts',
        popup: './src/popup.tsx',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/manifest.json', to: './' },
                { from: './src/css', to: './css' },
                { from: './src/img', to: './img' },
            ]
        }),
        new HtmlWebpackPlugin({
            template: './src/popup.html',
            filename: 'popup.html',
            chunks: ['popup'],
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};
