const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const urls = require('./server/config.js');

let config = {
  entry: './client/overview.jsx',
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/asset/index.html'
    }),
  ],
  output: {
    filename: 'overview.js',
    path: path.resolve(__dirname, 'dist'),
    // clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-react",
              [
                "@babel/preset-env",
                {
                  "targets": {
                    "node": "current"
                  },
                  "useBuiltIns": "entry",
                  "modules": false
                }
              ]]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.output.publicPath = urls.dev.overview;
  }

  if (argv.mode === 'production') {
    config.output.publicPath = urls.production.overview;
  }

  return config;
};