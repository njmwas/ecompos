const config = require("./config")
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const path = require("path")

const manifestGen = new WebpackManifestPlugin({
    fileName: 'manifest.json',
    stripSrc: true,
    publicPath: config.build.assetsURL
});

module.exports = {
    context: config.build.context,
    mode: process.env.PRODUCTION ? "production" : "development",
    entry: {
        app: "./src/index.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ]
                }
            },
            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, "src"),
                use:['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts']
    },
    output: {
        path: config.build.assetsPath,
        filename: 'js/[name].[chunkhash].js',
        publicPath: config.build.assetsURL
    },
    plugins: [manifestGen],
    devServer: {
        static: config.build.assetsPath,

    }
}