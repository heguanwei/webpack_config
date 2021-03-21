const path = require('path');
const Webpack = require('webpack');
const os = require('os');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HappyPack = require('happypack');
const HappyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const config = require('./config');

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        filename: "js/[name].[chunkhash:8].js",
        path: config.dist
    },
    resolve: {
        alias: {
            "@": config.src
        }
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
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'image/',
                            esModule: false
                        }
                    }
                ]
            },
            // {
            //     test: /\.(htm|html)$/i,
            //     loader: 'html-withimg-loader',
            //     exclude: [config.public],  // 避免了使用htmlWebpackPlugin设置html模板的标题失效
            // }
        ]
    },
    optimization: {
        splitChunks: {
            name: 'common',
            minChunks: 2
        }
    },
    plugins: [
        new CleanWebpackPlugin([config.dist], {
            root: config.project,   //根目录 //其他配置按需求添加
            verbose: true,
            dry: false
        }),
        new HtmlWebpackPlugin({
            title: "output management",
            template: "./public/index.html",
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
        new CopyWebpackPlugin([
            {
                from: path.resolve(config.public, 'dll'),
                to: path.resolve(config.dist, 'dll')
            }
        ]),
        new Webpack.DllReferencePlugin({
            manifest: `${config.public}/dll/react.manifest.json`
        }),
        new HtmlIncludeAssetsPlugin({
            assets: [`dll/react.dll.js`],
            append: false // 在其他资源前添加
        }),
        new HappyPack({
            id: 'babel',
            loaders: [
                {
                    loader: 'babel-loader',
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
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash:8].css",
            chunkFilename: "[id].css"
        }),
        new UglifyJsPlugin({
            cache: true, // 开启缓存
            parallel: true, // 多线程加速构建
            sourceMap: true, // 使用sourceMap捕获错误
            uglifyOptions: {
                compress: {
                    drop_console:true, // 放弃对 console 函数的调用
                    drop_debugger:true, // 删除 debugger语句
                }
            },
        })
    ]
}