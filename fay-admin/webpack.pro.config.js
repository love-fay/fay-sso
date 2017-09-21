/**
 * Created by feichongzheng on 16/12/7.
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {

    entry: ['babel-polyfill', __dirname + '/src/main.js'],
    output: {
        path: __dirname + '/dist/pro',
        filename: 'js/[name]-[hash:8].js',
        chunkFilename: 'js/[name]-[id].[hash:8].bundle.js',
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
                        presets: ['react',
                            ['env',{
                                'targets': {
                                    'browsers': ['last 2 versions', 'ie >= 9'],
                                    'uglify': true
                                },
                                'modules': false,
                                'loose': true,
                                'useBuiltIns': true,
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
                            [
                                'import',
                                {
                                    "libraryName": "antd",
                                    "style": true,
                                }
                            ]
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

    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, 'src')
        ],
        extensions: ['.js', '.json', '.css', 'less'],
        alias: {
            FayAntd: path.resolve(__dirname, 'src/lib/antd/lib/'),
        }
    },

    plugins: [
        new CleanPlugin(['dist/pro'], {
            'root': __dirname,
            'verbose': true,
            'dry': false,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css',
        }),
        new UglifyJSPlugin(),
        new CopyWebpackPlugin([
            {from: __dirname + '/src/assets', to: __dirname + '/dist/pro/assets'},
            {from: __dirname + '/src/favicon.ico', to: __dirname + '/dist/pro/favicon.ico'},
            {from: __dirname + '/src/faylogin.html', to: __dirname + '/dist/pro/faylogin.html'},
        ]),
    ],
};
