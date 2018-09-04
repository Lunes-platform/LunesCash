let popup = {
  target: 'web',
  mode: 'development',
  entry: ['babel-polyfill',__dirname+'/src/index.js'],
  output: {
    filename: 'bundle.js',
    path: __dirname+'/public/js/popup/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ["env","react"],
          plugins: [
						['transform-react-jsx', { pragma: 'h' }]
					]
        }
      }
    ]
  }
}


module.exports = popup
