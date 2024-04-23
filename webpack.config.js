const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    app: './src/scripts/app.js',
    taskClass: './src/scripts/classes/Task.js',
    projectClass: './src/scripts/classes/Project.js',
    handlers: './src/scripts/modules/Handlers.js',
    layout: './src/scripts/modules/Layout.js',
    UserStorage: './src/scripts/modules/UserStorage.js',
    burger: './src/scripts/views/BurgerView.js',
    filters: './src/scripts/views/FiltersView.js',
    form: './src/scripts/views/FormView.js',
    projects: './src/scripts/views/ProjectsView.js',
    task: './src/scripts/views/TaskView.js',
  },
  entry: './src/index.js',
  output: {
    filename: 'bundle.main.js',
    clean: true,
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    }
    ],
  },  
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
};