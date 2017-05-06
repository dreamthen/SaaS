/**
 * Created by ypc on 2016/8/12.
 * 生产环境
 */
var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_DIR = path.resolve(__dirname, '..');
var BUILD_DIR = path.resolve(__dirname, '../build');
var APP_DIR = path.resolve(__dirname, '../scripts');
var DLL_DIR = path.resolve(__dirname, '../dll');
var IMAGE_DIR = path.resolve(__dirname, '../images');

var fs = require("fs-extra");

fs.copySync(DLL_DIR, BUILD_DIR + "/dll", {
    dereference: true
});

fs.copySync(IMAGE_DIR, BUILD_DIR + "/images", {
    dereference: true
});

const AUTOPREFIXER_BROWSERS = [
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 9',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1'
];

var config = {
    entry: {
        app: APP_DIR + '/app.js',
        login: APP_DIR + '/login.js'
    },

    output: {
        // 注意下未指定publicPath时对css文件中url的处理
        path: BUILD_DIR,
        filename: 'js/[name].[chunkhash].js'
    },

    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                include: [
                    APP_DIR,
                    DLL_DIR,
                    path.resolve(__dirname, '../stylesheets/index.js')
                ],
                loaders: ['babel']
            },
            {
                test: /\.(css)$/,
                loader: ExtractTextPlugin.extract('style', ['css', 'postcss'])
            },
            {
                test: /\.(svg|woff([\?]?.*)|ttf([\?]?.*)|eot([\?]?.*)|svg([\?]?.*))$/i,
                loader: 'url-loader?limit=10000'
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'images/[name].[hash:8].[ext]'
                }
            }
        ]
    },

    postcss: [autoprefixer({browsers: AUTOPREFIXER_BROWSERS})],

    resolve: {
        root: ROOT_DIR
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DllReferencePlugin({
            context: ROOT_DIR,
            manifest: require(DLL_DIR + '/vendor_manifest.dev.json')
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false
            },
            comments: false
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new ExtractTextPlugin('css/[name].[contenthash].css'),
        new HtmlWebpackPlugin({
            isNeed: false,
            filename: 'login.html',
            template: ROOT_DIR + "/login.html",
            chunks: ["login"],
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            isNeed: false,
            filename: 'app.html',
            template: ROOT_DIR + "/app.html",
            chunks: ["app"],
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        })
    ]
};

module.exports = config;