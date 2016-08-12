import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import fs from 'fs'
import configureWebpack from './configureWebpack'

import { parse_to_json as parseLisgy } from '@buggyorg/lisgy'
import library from '@buggyorg/component-library'
import { resolve as buggyResolve } from '@buggyorg/resolve'
import graphlib from 'graphlib'
import graphify from './forkGraphify'
import { convertGraph as asKGraph } from '@buggyorg/graphlib2kgraph'

const app = express()
app.use(bodyParser.text({ limit: '1MB' }))

const componentLibrary = library(process.env.BUGGY_COMPONENT_LIBRARY_HOST || 'http://localhost:9200')

app.post('/api/lisgy/parse', (req, res) => {
  if (!req.body) {
    return res.status(400).end()
  }
  parseLisgy(req.body, true)
  .then((graph) => graphlib.json.read(graph))
  .then((graph) => {
    if (req.query.type === 'unresolved') {
      res.json({
        status: 'success',
        graph: graphlib.json.write(graph)
      }).end()
    } else {
      return buggyResolve(graph, componentLibrary.get)
      .then((graph) => {
        if (req.query.type === 'svg') {
          return graphify(asKGraph(graph))
          .then((svg) => res.header('Content-Type', 'image/svg+xml').send(svg).end())
        } else if (req.query.type === 'go') {
          // TODO
        } else {
          res.json({
            status: 'success',
            graph: graphlib.json.write(graph)
          }).end()
        }
      })
    }
  })
  .catch((err) => {
    res.json({
      status: 'error',
      error: err
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

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
