const modoDev = process.env.NODE_ENV !== 'production'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { Module } = require('webpack')
const webpack = require('webpack')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: './src/principal.js',
    output: {
        filename: 'principal.js',
        path: __dirname + '/public'
    },
    devServer:{
        contentBase: "./public",
        port: 9000
    },

    optimization: {
        minimizer: [            
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new TerserPlugin({
            parallel: true,
            terserOptions: {
                ecma: 6,
            },
        }),

        new MiniCssExtractPlugin({
            filename: "estilo.css"
        })
    ],

    module:{
        rules: [{
            test: /\.s?[ac]ss$/, 
            use: [
                MiniCssExtractPlugin.loader,
                //'style-loader', //Adiciona CSS na DOM injetando a tag <style>
                'css-loader', //Interpreta @import, url()...
                'sass-loader',
            ]
        },{
            test: /\.(png|svg|jpg|gif)$/, 
            use: ['file-loader']
        }]
    }
}