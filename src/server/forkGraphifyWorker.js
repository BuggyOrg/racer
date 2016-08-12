import graphify from '@buggyorg/graphify'

process.on('message', (m) => {
  process.send(graphify(JSON.parse(m)))
})
