/**
 * Created by feichongzheng on 16/12/7.
 */
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const version = require('./package.json').version;
const dist = 'dist/'+version+'/lib/fayUc';

module.exports = {

    entry: __dirname + '/src/view/fayUc/fayUc.js', // 已多次提及的唯一入口文件
    output: {
        path: __dirname + '/' + dist, // 打包后的文件存放的地方
        filename: 'fayUc.js', // 打包后输出文件的文件名
        chunkFilename: 'fayUc.js',
    },

    plugins: [
        new CleanPlugin([dist], {
            'root': __dirname,
            'verbose': true,
            'dry': false,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                VERSION: JSON.stringify(version),
            },
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ],
};
