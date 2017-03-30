import { toolchainSequence } from '@buggyorg/buggy'
import * as toolchain from '@buggyorg/buggy/lib/toolchain'
import * as NPM from '@buggyorg/buggy/lib/npm/cacheCli'

import startWebserver from './webserver'

// cache the toolchains (and only prepare one toolchain at a time)
let lisgyToPortgraphToolchain = toolchainSequence('lisgy', 'portgraph', [], toolchain, NPM)
let lisgyToResolvedPortgraphToolchain = toolchainSequence('lisgy', 'portgraph', ['resolve'], toolchain, NPM)
let lisgyToSvgToolchain = toolchainSequence('lisgy', 'svg', ['resolve'], toolchain, NPM)
lisgyToPortgraphToolchain.catch((e) => {
  console.error('Could not prepare lisgy -> portgraph toolchain', e)
})
lisgyToResolvedPortgraphToolchain.catch((e) => {
  console.error('Could not prepare lisgy -> resolved portgraph toolchain', e)
})
lisgyToSvgToolchain.catch((e) => {
  console.error('Could not prepare lisgy -> svg toolchain', e)
})

console.log('Preparing toolchains…')
Promise.all([lisgyToPortgraphToolchain, lisgyToResolvedPortgraphToolchain, lisgyToSvgToolchain])
.then((toolchains) => {
  console.log('Toolchains are ready')
  startWebserver(process.env.PORT || 3000, {
    toolchains: {
      lisgyToPortgraph: toolchains[0],
      lisgyToResolvedPortgraph: toolchains[1],
      lisgyToSvg: toolchains[2]
    }
  })
})
