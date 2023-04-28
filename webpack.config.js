const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');

module.exports = {
    mode: 'production',
    entry: {
        letterboxd: './src/scripts/letterboxd.ts',
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
                { from: './src/styles', to: './styles' },
                { from: './src/images', to: './images' },
            ]
        }),
        new HtmlWebpackPlugin({
            template: './src/popup.html',
            filename: 'popup.html',
            chunks: ['popup'],
        }),
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                    if (!fs.existsSync('./dist/scripts')) {
                        fs.mkdirSync('./dist/scripts');
                    }
                    fs.renameSync('./dist/letterboxd.js', './dist/scripts/letterboxd.js');
                });
            },
        },
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
};
