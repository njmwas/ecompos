const config = require("./config")
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

const manifestGen = new WebpackManifestPlugin({
    fileName: 'manifest.json',
    stripSrc: true,
    publicPath: config.build.assetsURL
});

module.exports = {
    context: config.build.context,
    mode:"development",
    entry: {
        app: "./src/index.js",
    },
    module:{
        rules:[
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
            }
        ]
    },
    resolve:{
        extensions:['*', '.js', '.jsx', '.tsx', '.ts']
    },
    output: {
        path: config.build.assetsPath,
        filename: 'js/[name].[chunkhash].js',
        publicPath: config.build.assetsURL
    },
    plugins: [manifestGen],
    devServer:{
        static: config.build.assetsPath,
        proxy:{
            "/":"http://localhost:5003",
            secure: false
        }
    }
}