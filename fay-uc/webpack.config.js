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
const version = require('./package.json').version;
const serverPath = 'public';
const dist = 'public/' + version;
console.log(path.join(__dirname, 'public'));
const glob = require('glob');
function getEntry (globPath, pathDir) {
    const files = glob.sync(globPath);
    const entries = {};
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
let plugins = [
    new CleanPlugin([dist], {
        'root': __dirname,
        'verbose': true,
        'dry': false,
    }),
    new CopyWebpackPlugin([
        {from: __dirname + '/src/assets', to: __dirname + '/' + dist + '/assets'},
        {from: __dirname + '/src/favicon.ico', to: __dirname + '/' + dist + '/favicon.ico'},
    ]),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development'),
            VERSION: JSON.stringify(version),
        },
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
];

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
    new DashboardPlugin(),
    // new webpack.HotModuleReplacementPlugin()
);

module.exports = {

    devtool: 'source-map',
    entry: entries,
    output: {
        path: __dirname + '/' + dist, // 打包后的文件存放的地方
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
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                    }, {
                        loader: 'less-loader',
                    }],
                    // use style-loader in development
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

    plugins: plugins,

    devServer: {
        contentBase: path.join(__dirname, 'public'),
        publicPath: 'http://192.168.0.200:8100/0.0.2/',
        compress: true,
        host: "0.0.0.0",//本地IP和localhost都可以用
        // host: '192.168.0.200',
        port: '8100',
        historyApiFallback: true, // 不跳转
        inline: true, // 内联模式
        // hot: true,
        // hotOnly: true,
    },
};
