import { hydrate } from 'solid-js/web'
import { App } from '../app/index.js'
// entry point for browser
hydrate(()=><App/>, document)
