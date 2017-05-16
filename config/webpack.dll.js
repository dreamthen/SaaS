/**
 * Created by yinwk on 2017/5/4.
 */
var path = require("path");
var webpack = require("webpack");
//路径巡航
//相当于
//cd __dirname,此时dirname:E:/SaaS/config
//cd ../dll
const DLL_DIR = path.resolve(__dirname, "../dll");
//同上
//第二步:cd ..
const ROOT_DIR = path.resolve(__dirname, "../..");
//抛出一个node模块
//此文件用来打包dll,为了防止webpack重复打包某一些相同的或者相似内容的外部依赖文件,也为了提高开发速度和打包速度
module.exports = {
    //入口配置,以react,react-dom,react-router,babel-polyfill这些最常见的外部依赖包作为入口
    entry: {
        vendor: ["react", "react-dom", "react-router", "whatwg-fetch", "babel-polyfill"]
    },
    //依赖对象输出位置,文件名字,形成一个library对象
    output: {
        publicPath: "/",
        path: DLL_DIR,
        filename: "[name].dll.js",
        library: "[name]_[chunkhash]"
    },
    plugins: [
        //防止打包过程中出现错误,打包失败后对文件造成损坏的影响
        new webpack.NoErrorsPlugin(),
        new webpack.DllPlugin({
            //依赖包manifest.json文件输出路径
            path: path.join(DLL_DIR, "[name]_manifest.dev.json"),
            //输出依赖对象名字,必须和library相对应
            name: "[name]_[chunkhash]",
            //上下文对象
            context: ROOT_DIR
        }),
        //给每一个模块包分配一个ids,根据ids的长短动态加载模块
        new webpack.optimize.OccurrenceOrderPlugin(),
        //压缩插件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false
            },
            comments: false
        }),
        //打包时如若出现重复或者内容相似的文件,进行相应的删除
        new webpack.optimize.DedupePlugin()
    ]
};