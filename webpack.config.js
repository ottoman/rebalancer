
module.exports = {
  entry: {
    app: './src/main'
  },
  output: {
    path: './dist/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js'
  },
  module: {
    loaders: [
      {
          test: /\.(ttf|eot|svg|woff|woff2)$/,
          loader: 'file-loader?name=../dist/fonts/[name].[ext]'
      },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.md$/, loader: 'html!markdown' },
      { test: /\.(jsx|js)$/, loader: 'babel-loader' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    modulesDirectories: [
      'bower_components',
      'node_modules'
    ],
    alias: {
    }
  }
};




