/**
 * Created by yinwk on 2017/5/4.
 */
var path = require("path");
var webpack = require("webpack");
//与postcss相互搭配,可以对css3前缀进行自动添加
var autoprefixer = require("autoprefixer");
//动态html module模块加载插件
var HtmlWebpackPlugin = require("html-webpack-plugin");
//路径巡航
//相当于
//cd __dirname
//cd ../dll
const DLL_DIR = path.resolve(__dirname, "../dll");
//同上
//只不过第二个参数进入不同的路径
const ROOT_DIR = path.resolve(__dirname, "..");
const BUILD_DIR = path.resolve(__dirname, "../build");
const APP_DIR = path.resolve(__dirname, "../scripts");

const PORT = "8040";

const AUTO_PREFIXER_BROWSER = [
    "Android >= 4",
    "Chrome >= 35",
    "Firefox >= 31",
    "iOS >= 7",
    "Explorer >= 9",
    "Opera >= 12",
    "Safari >= 7.1"
];

var webpackDev = {
    //webpack七种打包模式
    devtool: "eval",
    //入口配置
    entry: {
        app: APP_DIR + "/app.js",
        login: APP_DIR + "/login.js"
    },
    //输出文件位置,文件名字
    output: {
        publicPath: "/",
        path: BUILD_DIR,
        filename: "[name].bundle.js"
    },
    //模块文件加载器
    module: {
        loaders: [
            //js文件模块加载器
            {
                test: /\.js[x]?$/,
                include: [
                    APP_DIR,
                    DLL_DIR,
                    path.resolve(__dirname, "../stylesheets/index.js")
                ],
                loaders: ["react-hot", "babel"]
            },
            //css文件模块加载器
            {
                test: /\.css$/,
                loaders: ["style", "css", "postcss"]
            },
            //图片文件模块加载器
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: "url-loader?limit=8192"
            }
        ]
    },
    //css3动态添加前缀
    postcss: [autoprefixer({browsers: AUTO_PREFIXER_BROWSER})],

    //文件后缀添加,设置根目录
    resolve: {
        root: ROOT_DIR
    },

    //模块插件
    plugins: [
        //防止在打包过程中有错误,导致源文件损坏
        new webpack.NoErrorsPlugin(),
        //读取dll外部依赖包
        new webpack.DllReferencePlugin({
            //上下文对象
            context: ROOT_DIR,
            manifest: require(DLL_DIR + "/vendor_manifest.dev.json")
        }),
        new HtmlWebpackPlugin({
            publicPath: "/",
            filename: "app.html",
            template: ROOT_DIR + "/app.html",
            chunks: ["app"]
        }),
        new HtmlWebpackPlugin({
            publicPath: "/",
            filename: "login.html",
            template: ROOT_DIR + "/login.html",
            chunks: ["login"]
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false
            },
            comments: false
        })
    ],

    devServer: {
        port: PORT,
        host: "0.0.0.0"
    }
};

module.exports = webpackDev;