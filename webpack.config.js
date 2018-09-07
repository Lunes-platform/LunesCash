const HardSource = require('hard-source-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

let popup = {
  target: 'web',
  // mode: 'development', //TODO parse to production
  mode: 'production', //TODO parse to production
  entry: ['babel-polyfill',__dirname+'/src/popup.js'],
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
						// ['transform-react-jsx', { pragma: 'h' }],
            ['transform-class-properties', { spec: true }],
            'transform-object-rest-spread'
					]
        }
      }
    ]
  },
  plugins: [
    new HardSource(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8080,
      server: {
        baseDir: ['./public/']
      },
      files: ['*.css','*.js'],
      watch: true
    })
  ],
  optimization: {
    minimize: false
  },
  resolve: {
    alias: {
      Components: __dirname+'/src/components/',
      Containers: __dirname+'/src/containers/',
      Functions: __dirname+'/src/functions/',
    }
  }
}
let background = {
  mode: 'production',
  target: 'web',
  entry: ['babel-polyfill', __dirname+'/src/background/index.js'],
  output: {
    filename: 'main.bundle.js',
    path: __dirname+'/public/js/background/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env'],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  },
  plugins: [
    new HardSource()
  ]
}


module.exports = [popup, background]
