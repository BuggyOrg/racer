import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import configureWebpack from './configureWebpack'

import { runToolchain } from '@buggyorg/buggy'
import * as NPM from '@buggyorg/buggy/lib/npm/cacheCli'

export default function startWebserver (port, { toolchains }) {
  const app = express()
  app.use(bodyParser.text({ limit: '1MB' }))

  app.post('/api/lisgy/parse', async (req, res) => {
    if (!req.body) {
      return res.status(400).end()
    }

    try {
      if (req.query.type === 'unresolved') {
        const output = await runToolchain(toolchains.lisgyToPortgraph, req.body, NPM)
        res.json({
          status: 'success',
          graph: JSON.parse(output)
        }).end()
      } else if (req.query.type === 'resolved') {
        const output = await runToolchain(toolchains.lisgyToResolvedPortgraph, req.body, NPM)
        res.json({
          status: 'success',
          graph: JSON.parse(output)
        }).end()
      } else if (req.query.type === 'svg') {
        const output = await runToolchain(toolchains.lisgyToSvg, req.body, NPM)
        res.header('Content-Type', 'image/svg+xml').send(output).end()
      } else if (req.query.type === 'all') {
        const unresolved = await runToolchain(toolchains.lisgyToPortgraph, req.body, NPM)
        const resolved = await runToolchain(toolchains.resolvePortgraph, unresolved, NPM)
        const kgraph = await runToolchain(toolchains.resolvedPortgraphToKGraph, resolved, NPM)
        res.json({
          status: 'success',
          unresolved: JSON.parse(unresolved),
          resolved: JSON.parse(resolved),
          kgraph: JSON.parse(kgraph)
        }).end()
      } else {
        res.status(400).end()
      }
    } catch (e) {
      console.error(e)
      res.status(500).json({
        status: 'error',
        error: e
      }).end()
    }
  })

  if (process.env.NODE_ENV !== 'production') {
    console.log('running in development environment')
    configureWebpack(app)
  } else {
    app.use(express.static(path.join(__dirname, '..', '..', 'build')))
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'))
    })
  }

  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}
