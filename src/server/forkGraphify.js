import child_process from 'child_process'
import path from 'path'

export default function (graph) {
  const child = child_process.fork(path.join(__dirname, '/forkGraphifyWorker'))
  return new Promise((resolve, reject) => {
    child.on('message', (m) => {
      const msg = JSON.parse(m)
      if (msg.error) {
        reject(msg.error)
      } else {
        resolve(msg.svg)
      }
    })
    child.send(JSON.stringify(graph))
  })
}