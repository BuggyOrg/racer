import { toolchainSequence } from '@buggyorg/buggy'
import * as toolchain from '@buggyorg/buggy/lib/toolchain'
import * as NPM from '@buggyorg/buggy/lib/npm/cacheCli'
import promiseAllProps from 'promise-props'
import startWebserver from './webserver'

// cache the toolchains (and only prepare one toolchain at a time)

const toolchains = {
  lisgyToPortgraph: toolchainSequence('lisgy', 'portgraph', [], toolchain, NPM),
  lisgyToResolvedPortgraph: toolchainSequence('lisgy', 'portgraph', ['resolve'], toolchain, NPM),
  lisgyToSvg: toolchainSequence('lisgy', 'svg', ['resolve'], toolchain, NPM),
  resolvePortgraph: toolchainSequence('portgraphJSON', 'portgraph', ['resolve'], toolchain, NPM),
  resolvedPortgraphToSvg: toolchainSequence('portgraphJSON', 'svg', [], toolchain, NPM)
}

console.log('Preparing toolchains…')
promiseAllProps(toolchains)
.then((toolchains) => {
  console.log('Toolchains are ready')
  startWebserver(process.env.PORT || 3000, { toolchains })
})
.catch((e) => {
  console.error('Preparing the toolchains failed', e)
})
