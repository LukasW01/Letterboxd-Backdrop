const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        letterboxd: './src/scripts/letterboxd.js',
        input: './src/scripts/input.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/scripts'),
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/manifest.json', to: '../manifest.json' },
                { from: './src/popup.html', to: '../popup.html' },
                { from: './src/scripts/data.js', to: 'data.js' },
                { from: './src/styles/popup.css', to: '../styles/popup.css' },
                { from: './src/images', to: '../images' },
            ]
        }),
    ]
};
