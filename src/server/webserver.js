import express from 'express'
import bodyParser from 'body-parser'
import configureWebpack from './configureWebpack'

export default function startWebserver (port, options = {}) {
  const app = express()
  app.use(bodyParser.text({ limit: '1MB' }))
  app.post('/api/lisgy/parse', (req, res) => {
    if (!req.body) {
      return res.status(400).end()
    }

    let toolchain
    if (req.query.type === 'unresolved') {
      toolchain = lisgyToPortgraphToolchain
    } else if (req.query.type === 'svg') {
      toolchain = lisgyToSvgToolchain
    } else {
      toolchain = lisgyToResolvedPortgraphToolchain
    }

    runToolchain(toolchain, req.body, NPM)
    .then((output) => {
      if (req.query.type === 'svg') {
        res.header('Content-Type', 'image/svg+xml').send(output).end()
      } else {
        res.json({
          status: 'success',
          graph: JSON.parse(output)
        }).end()
      }
    })
    .catch((e) => {
      console.error(e)
      res.status(500).json({
        status: 'error',
        error: e
      }).end()
    })
  })

  if (process.env.NODE_ENV !== 'production') {
    console.log('running in development environment')
    configureWebpack(app)
  } else {
    app.use(express.static(path.join(__dirname, '..', '..', 'build')))
    app.get('*', (req, res) => {
      res.write(fs.readFileSync(path.join(__dirname, '..', '..', 'build', 'index.html')))
      res.end()
    })
  }

  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}
