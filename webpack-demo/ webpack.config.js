// const path = require('path');

// module.exports = {
//   entry: __dirname + '/app.js',
//   output: {
//     path: __dirname + "/dist",
//     filename: 'main.js',
//   }
// };
//打包命令 node_modules/.bin/webpack app.js dist/main.js
module.exports = {
  entry: '/app.js',
  output: {
    filename: 'main.js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
    ]
  },
}