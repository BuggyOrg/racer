import express from 'express'
import bodyParser from 'body-parser'
import { parse_to_json as parseLisgy } from '@buggyorg/lisgy'
import library from '@buggyorg/component-library'
import { resolve as buggyResolve } from '@buggyorg/resolve'
import graphlib from 'graphlib'
import graphify from '@buggyorg/graphify'
import { convertGraph as asKGraph } from '@buggyorg/graphlib2kgraph'

const app = express()
app.use(bodyParser.text({ limit: '1MB' }))

app.post('/api/lisgy/parse', (req, res) => {
  if (!req.body) {
    return res.status(400).end()
  }
  parseLisgy(req.body, true)
  .then((graph) => graphlib.json.read(graph))
  .then((graph) => buggyResolve(graph, library(process.env.BUGGY_COMPONENT_LIBRARY_HOST || 'http://localhost:9200').get))
  .then((graph) => {
    if (req.query.type === 'svg') {
      return graphify(asKGraph(graph))
      .then((svg) => res.header('Content-Type', 'image/svg+xml').send(svg).end())
    } else if (req.query.type === 'go') {
      // TODO
    } else {
      res.json(graphlib.json.write(graph)).end()
    }
  })
  .catch((err) => {
    console.error(err)
    res.status(500).end()
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`buggy-racer listening on port ${port}`)
})
