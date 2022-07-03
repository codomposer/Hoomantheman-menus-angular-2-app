import { useContext, Suspense, Switch, Match, lazy, JSX } from 'solid-js'
import { HydrationScript } from 'solid-js/web'
import { RouteHOC, RouteHOC_props_T, RouterContext } from './router.js'
import RootRoute from '../routes/_solid/RootRoute'
// const RootRoute = lazy(()=>import('../routes/_solid/RootRoute'))
export const App:(props?:RouteHOC_props_T)=>JSX.Element = RouteHOC(()=>{
	const [, pending, { matches }] = useContext(RouterContext)
	return (
		<html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
        <meta name="theme-color" content="#333333"/>
        <title>Menu.com</title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <HydrationScript/>
      </head>
      <body>
        <div id="app" classList={{ pending: pending() }}>
          <Suspense
					>
            <Switch>
              <Match when={matches('index')}>
                <div>Loaded index</div>
                <div>Loaded index 2</div>
                <RootRoute></RootRoute>
              </Match>
            </Switch>
          </Suspense>
        </div>
      </body>
      <script type="module" src="/client/index.js" async></script>
    </html>
	)
})
