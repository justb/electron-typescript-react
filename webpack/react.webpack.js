const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const rootPath = path.resolve(__dirname, '..')

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    mainFields: ['main', 'module', 'browser']
  },
  node: {global: true},
  entry: ['react-hot-loader/patch', path.resolve(rootPath, 'src', 'index.tsx')] ,
  target: 'electron-renderer',
  // target: process.env.NODE_ENV !== "production" ? "web" : "browserslist",
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ["@babel/plugin-transform-runtime",]
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(rootPath, 'dist/renderer'),
    historyApiFallback: true,
    compress: false,
    hot: true,
    host: '0.0.0.0',
    port: 4000,
    publicPath: '/'
  },
  output: {
    path: path.resolve(rootPath, 'dist/renderer'),
    filename: 'js/[name].js',
    publicPath: './'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    
    
    // new ReactRefreshWebpackPlugin({
    //   overlay: {
    //     entry: webpackDevClientEntry,
    //     // The expected exports are slightly different from what the overlay exports,
    //     // so an interop is included here to enable feedback on module-level errors.
    //     module: reactRefreshOverlayEntry,
    //     // Since we ship a custom dev client and overlay integration,
    //     // the bundled socket handling logic can be eliminated.
    //     sockIntegration: false,
    //   },
    // }),
  ]
}
