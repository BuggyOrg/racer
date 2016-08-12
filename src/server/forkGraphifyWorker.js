import graphify from '@buggyorg/graphify'

process.on('message', (m) => {
    graphify(JSON.parse(m))
    .then((svg) => process.send(JSON.stringify({ svg })))
    .catch((e) => process.send(JSON.stringify({ error: e })))
})
