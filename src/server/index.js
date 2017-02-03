import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import fs from 'fs'
import configureWebpack from './configureWebpack'

import { connect as connectToLibrary } from '@buggyorg/library-client'
import { run as runBuggy } from '@buggyorg/buggy'
import * as toolchain from '@buggyorg/buggy/lib/toolchain'
import * as NPM from '@buggyorg/buggy/lib/npm/cacheCli'

const app = express()
app.use(bodyParser.text({ limit: '1MB' }))

const getComponentLibrary = Promise.resolve(connectToLibrary(process.env.BUGGY_COMPONENT_LIBRARY_HOST || 'http://localhost:9200'))

app.post('/api/lisgy/parse', (req, res) => {
  if (!req.body) {
    return res.status(400).end()
  }

  // TODO
  runBuggy(req.body, 'json', [], toolchain, NPM)

  // parseLisgy(req.body, true)
  // .then((graph) => graphlib.json.read(graph))
  // .then((graph) => {
  //   if (req.query.type === 'unresolved') {
  //     res.json({
  //       status: 'success',
  //       graph: graphlib.json.write(graph)
  //     }).end()
  //   } else {
  //     return buggyResolve(graph, componentLibrary.get)
  //     .then((graph) => {
  //       if (req.query.type === 'svg') {
  //         return graphify(asKGraph(graph))
  //         .then((svg) => res.header('Content-Type', 'image/svg+xml').send(svg).end())
  //       } else if (req.query.type === 'go') {
  //         // TODO
  //       } else {
  //         res.json({
  //           status: 'success',
  //           graph: graphlib.json.write(graph)
  //         }).end()
  //       }
  //     })
  //   }
  // })
  // .catch((err) => {
  //   res.json({
  //     status: 'error',
  //     error: err
  //   }).end()
  // })
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
