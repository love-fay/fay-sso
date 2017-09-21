/**
 * Created by feichongzheng on 16/12/7.
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const path = require('path');
const glob = require('glob');
const version = require('./package.json').version;
const dist = 'dist/' + version;

function getEntry (globPath, pathDir) {
    const files = glob.sync(globPath);
    let entries = {};
    let entry, dirname, basename, pathname, extname;

    for (let i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(pathDir, '') : pathname;
        entries[pathname] = './' + entry;
    }
    return entries;
}

let htmls = getEntry('./src/view/**/*.html', 'src\\view\\');
let entries = {};
let plugins = [];
plugins.push(
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
    new webpack.optimize.ModuleConcatenationPlugin()
);
for (let key in htmls) {
    if (htmls.hasOwnProperty(key)) {
        let distDir = key.substr(key.lastIndexOf('/') + 1);
        let html = htmls[key];
        let js = html.replace('.html', '.js');
        key = distDir;
        entries[key] = ['babel-polyfill', js];
        plugins.push(new HtmlWebpackPlugin({
            filename: (key + '.html'),
            template: html,
            inject: true,
            chunks: [key],
        }));
    }
}

plugins.push(
    new ExtractTextPlugin({
        filename: 'css/[name].[contenthash].css',
    }),
    new UglifyJSPlugin(),
    new CopyWebpackPlugin([
        {from: __dirname + '/src/assets', to: __dirname + '/' + dist + '/assets'},
        {from: __dirname + '/src/favicon.ico', to: __dirname + '/' + dist + '/favicon.ico'},
    ])
);

module.exports = {
    entry: entries,
    output: {
        path: __dirname + '/' + dist,
        filename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: (loader) => [
                                    require('autoprefixer')(),
                                    require('cssnano')(),
                                ],
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env',{
                                'targets': {
                                    'browsers': ['last 2 versions', 'ie >= 9'],
                                },
                                'modules': false,
                                'loose': true,
                                'useBuiltIns': true,
                                'debug': true,
                            },
                            ]
                        ],
                        plugins: [
                            'babel-plugin-transform-class-properties',
                            'babel-plugin-syntax-dynamic-import',
                            [
                                'babel-plugin-transform-runtime', {
                                'helpers': true,
                                'polyfill': true,
                                'regenerator': true,
                            },
                            ],
                            [
                                'babel-plugin-transform-object-rest-spread', {
                                'useBuiltIns': true
                            },
                            ],
                        ],
                    },
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        outputPath: 'images',
                    },
                },
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                    }, {
                        loader: 'less-loader',
                    }],
                    fallback: 'style-loader',
                }),
            },
            {
                test: /\.gz$/,
                enforce: 'pre',
                use: 'gzip-loader',
            },
        ],
    },

    plugins: plugins,
};
