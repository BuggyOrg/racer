import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

const app = express()
app.use(bodyParser.text({ limit: '1MB' }))

{
  const webpack = require('webpack')
  const webpackMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')

  const webpackConfig = require('../../webpack.config')
  const compiler = webpack(webpackConfig)
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: '/',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '..', '..', 'build', 'index.html')))
    res.end()
  })
}

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
