const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/react']
            }
          }
        },
        {
            test: /\.(html|css)$/,
            use: [
              {
                loader: "html-loader"
              }
            ]
        },
        {
          test: /\.(jpg|png)$/,
          use: {
            loader: 'url-loader',
          },
        },
        {
          test: /\.(ttf)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: './fonts/[name].[ext]'
            },
          },]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      })
    ]  
  };