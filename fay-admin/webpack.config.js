/**
 * Created by feichongzheng on 16/12/7.
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const path = require('path');
const autoprefixerFromPostcss = require('autoprefixer');
const cssnanoFromPostcss = require('cssnano');

module.exports = {

    entry: ['babel-polyfill', __dirname + '/src/main.js'],
    output: {
        path: __dirname + '/public',
        filename: 'js/[name].[hash:8].bundle.js',
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
                                    autoprefixerFromPostcss(),
                                    cssnanoFromPostcss(),
                                ],
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader?cacheDirectory',
                    options: {
                        presets: ['react',
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
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: 'pre',
            },
        ],
    },

    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, 'src'),
        ],
        extensions: ['.js', '.json', '.css', 'less'],
        alias: {
            FayAntd: path.resolve(__dirname, 'src/lib/antd/lib/'),
        }
    },

    plugins: [
        new CleanPlugin(['public'], {
            'root': __dirname,
            'verbose': true,
            'dry': false,
        }),
        new CopyWebpackPlugin([
            {from: __dirname + '/src/assets', to: __dirname + '/public/assets'},
            {from: __dirname + '/src/favicon.ico', to: __dirname + '/public/favicon.ico'},
            {from: __dirname + '/src/faylogin.html', to: __dirname + '/public/faylogin.html'},
        ]),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css',
        }),
        new DashboardPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],

    devtool: 'source-map',

    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        host: "0.0.0.0",//本地IP和localhost都可以用
        port: '8000',
        historyApiFallback: true, // 不跳转
        inline: true, // 内联模式
        hot: true,
        hotOnly: true,
    },
};
