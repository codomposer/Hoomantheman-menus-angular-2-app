import { createSignal, createContext, useContext, useTransition, JSX, Context } from 'solid-js'
import { isServer } from 'solid-js/web'
// Super simplistic pushstate router that matches on absolute paths
export const RouterContext:Context<RouterContext_defaultValue_T|undefined> =
	createContext<RouterContext_defaultValue_T>()
//region TODO: Remove when https://github.com/solidjs/solid/issues/559 is fixed
// export type Provider<T> = (props:{ value:T, children?:any })=>any
// const Provider = RouterContext.Provider as unknown as Provider<RouterContext_defaultValue_T>
//endregion
export function RouteHOC(Comp):(props?:RouteHOC_props_T)=>JSX.Element {
	return (props:RouteHOC_props_T = {})=>{
		const [location, setLocation] = createSignal(
			(props.url ? props.url : window.location.pathname).slice(1) || 'index'
			),
			matches = (match:string)=>{
				return match === (location() || 'index')
			},
			[pending, start] = useTransition()
		!isServer && (window.onpopstate = ()=>setLocation(window.location.pathname.slice(1)))
		return (
			<RouterContext.Provider
				value={[location, pending, { setLocation: v=>start(()=>setLocation(v)), matches }]}
			>
        <Comp/>
      </RouterContext.Provider>
		)
	}
}
export const Link = props=>{
	const [, , { setLocation }] = useContext(RouterContext)
	const navigate = e=>{
		if (e) e.preventDefault()
		window.history.pushState('', '', `/${props.path}`)
		setLocation(props.path)
	}
	return (
		<a class="link" href={`/${props.path}`} onClick={navigate}>
      {props.children}
    </a>
	)
}
export interface RouteHOC_props_T {
	url?:string
}
export type RouterContext_defaultValue_T = [()=>string, ()=>boolean, {
	setLocation:(v:string)=>void
	matches:(match:string)=>boolean
}]
