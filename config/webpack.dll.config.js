const webpack = require('webpack');
const path = require('path');
const config = require('./config');
module.exports = {
    entry: {
        react: ['react', 'react-dom', 'antd']
    },
    output: {
        filename: '[name].dll.js',
        path: `${config.public}/dll`,
        libraryTarget: 'var',
        library: '_dll_[name]_[hash]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(`${config.public}/dll`, '[name].manifest.json'),
            name: '_dll_[name]_[hash]'
        })
    ]
};