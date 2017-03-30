import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import fs from 'fs'
import configureWebpack from './configureWebpack'

import { connect as connectToLibrary } from '@buggyorg/library-client'
import { run as runBuggy, toolchainSequence, runToolchain } from '@buggyorg/buggy'
import * as toolchain from '@buggyorg/buggy/lib/toolchain'
import * as toolchainGen from '@buggyorg/buggy/lib/toolchainGen'
import * as NPM from '@buggyorg/buggy/lib/npm/cacheCli'

const app = express()
app.use(bodyParser.text({ limit: '1MB' }))

const getComponentLibrary = Promise.resolve(connectToLibrary(process.env.BUGGY_LIBRARY_HOST || 'http://localhost:9200'))

// cache the toolchains (and only prepare one toolchain at a time)
let lisgyToPortgraphToolchain = toolchainSequence('lisgy', 'portgraph', [], toolchain, NPM)
let lisgyToResolvedPortgraphToolchain = lisgyToPortgraphToolchain.then(() => toolchainSequence('lisgy', 'portgraph', ['resolve'], toolchain, NPM))
let lisgyToSvgToolchain = lisgyToResolvedPortgraphToolchain.then(() => toolchainSequence('lisgy', 'svg', ['resolve'], toolchain, NPM))
lisgyToPortgraphToolchain.catch((e) => {
  console.error('Could not prepare lisgy -> portgraph toolchain', e)
})
lisgyToResolvedPortgraphToolchain.catch((e) => {
  console.error('Could not prepare lisgy -> resolved portgraph toolchain', e)
})
lisgyToSvgToolchain.catch((e) => {
  console.error('Could not prepare lisgy -> svg toolchain', e)
})

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

  toolchain
  .then((sequence) => runToolchain(sequence, req.body, NPM))
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

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
