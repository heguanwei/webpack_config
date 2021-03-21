const path = require('path');
const os = require('os');
const fs = require('fs');
const Webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HappyPack = require('happypack');
const HappyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const appDirectory = fs.realpathSync(process.cwd());
// console.log(appDirectory, '-----------appDirectory');
// console.log(path.resolve(__dirname, 'dist'), '--------__dirname');
// console.log(path.resolve(__filename), '--------__filename');
const config = require('./config');
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "js/[name].[chunkhash:8].js",
        path: config.public,
        // publicPath: config.public
    },
    devServer: {
        host: 'localhost',
        port: 9000,
        // open: true,
        open: 'chrome',
        inline: true,
        contentBase: config.public,
        compress: true,
    },
    resolve: {
        alias: {
            "@": config.src
         }
    },
    watchOptions: {
        aggregateTimeout: 500,
        poll: 1000,
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: 'happypack/loader?id=babel',
            },
            {
                test: /\.(less|css)?$/,
                include: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",// compiles Less to CSS
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true,
                            modifyVars: {
                                'primary-color': '#ff0000',
                                'link-color': '#ff0000',
                                'border-radius-base': '2px',
                            },
                            javascriptEnabled: true,
                        }
                    }
                ]
            },
            {
                test: /\.(less|css)?$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'happypack/loader?id=less',
                    },
                ]
            },
            {
                test: /\.(htm|html)$/i,
                // loader: 'html-withimg-loader',
                loader: 'happypack/loader?id=html',
                exclude: [config.public]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        // new CleanWebpackPlugin([config.dist], {
        //     root: path.resolve(__dirname),   //根目录 //其他配置按需求添加
        //     verbose: true,
        //     dry: false
        // }),

        new HappyPack({
            id: 'html',
            loaders: [
                {
                    loader: 'html-withimg-loader',
                }
            ],
            threadPool: HappyThreadPool,
            verbose: true,
        }),
        new HappyPack({
            id: 'babel',
            loaders: [
                {
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    options: {
                        cacheDirectory: true,
                        sourceMap: true,
                    }
                }
            ],
            threadPool: HappyThreadPool,
            verbose: true,
        }),
        new HappyPack({
            id: 'less',
            loaders: [

                {
                    loader: "css-loader",
                    options: {
                        modules: {
                            localIdentName: "[name]__[local]--[hash:base64:5]",
                        },
                    }
                },
                { loader: "postcss-loader" },
                {
                    loader: "less-loader",
                    options: {
                        modules: {
                            localIdentName: "[name]__[local]--[hash:base64:5]",
                        },
                    }
                }
            ],
            threadPool: HappyThreadPool
        }),
        new HtmlWebpackPlugin({
            title: "output management",
            template: `${config.public}/index.html`,
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            },
            // minify: { // 压缩HTML文件
            //     removeComments: true, // 移除HTML中的注释
            //     collapseWhitespace: true, // 删除空白符与换行符
            //     minifyCSS: true, // 压缩内联css
            //     //是否压缩html里的js（使用uglify-js进行的压缩）
            //     minifyJS: true,
            //     //删除多余的属性
            //     removeRedundantAttributes: true,
            // },
            hash: true,
            // cache: true,
            inject: "body",
        }),
        // new Webpack.DllReferencePlugin({
        //     manifest: `${config.public}/dll/react.manifest.json`
        // }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash:8].css",
            chunkFilename: "[id].css"
        })
    ]
}