/**
 * External Library Code: https://github.com/heresy/angular2-social-login
 */
declare let IN:any
declare let FB:any
export class Auth {
	gauth:any
	login = async (provider:string):Promise<any>=>{
		return new Promise(
			(resolve, reject)=>{
				switch (provider) {
					case 'google':
						if (typeof (this.gauth) === 'undefined') {
							this.gauth = gapi.auth2.getAuthInstance()
						}
						if (!this.gauth.isSignedIn.get()) {
							this.gauth.signIn().then(()=>{
								localStorage.setItem('_login_provider', 'google')
								resolve(this._google_login_data())
							})
						} else {
							localStorage.setItem('_login_provider', 'google')
							resolve(this._google_login_data())
						}
						break
					case 'facebook':
						FB.getLoginStatus((response)=>{
							if (response.status === 'connected') {
								FB.api('/me?fields=name,email,picture', (res)=>{
									if (!res || res.error) {
										reject(res.error)
									} else {
										const facebook_social_login_data:facebook_social_login_data_T = {
											name: res.name,
											email: res.email,
											uid: res.id,
											provider: 'facebook',
											image: res.picture.data.url,
											token: response.authResponse.accessToken
										}
										localStorage.setItem('_login_provider', 'facebook')
										resolve(facebook_social_login_data)
									}
								})
							} else {
								FB.login((response2)=>{
									if (response2.status === 'connected') {
										FB.api('/me?fields=name,email,picture', (res)=>{
											if (!res || res.error) {
												reject(res.error)
											} else {
												const facebook_social_login_data:facebook_social_login_data_T = {
													name: res.name,
													email: res.email,
													uid: res.id,
													provider: 'facebook',
													image: res.picture.data.url,
													token: response2.authResponse.accessToken
												}
												localStorage.setItem('_login_provider', 'facebook')
												resolve(facebook_social_login_data)
											}
										})
									}
								}, { scope: 'email' })
							}
						})
						break
					case 'linkedin':
						IN.User.authorize(()=>{
							IN.API.Raw('/people/~:(id,first-name,last-name,email-address,picture-url)').result(
								res=>{
									const linkedin_social_login_data:linkedin_social_login_data_T = {
										name: res.firstName + ' ' + res.lastName,
										email: res.emailAddress,
										uid: res.id,
										provider: 'linkedin',
										image: res.pictureUrl
									}
									localStorage.setItem('_login_provider', 'linkedin')
									resolve(linkedin_social_login_data)
								})
						})
						break
				}
			}
		)
	}
	logout = async ():Promise<boolean>=>{
		const provider = localStorage.getItem('_login_provider')
		return new Promise((resolve)=>{
			switch (provider) {
				case 'google':
					const gElement = document.getElementById('gSignout')
					if (typeof (
						gElement) !== 'undefined' && gElement != null) {
						gElement.remove()
					}
					const d = document
					let gSignout
					const ref = d.getElementsByTagName('script')[0]
					gSignout = d.createElement('script')
					gSignout.src = 'https://accounts.google.com/Logout'
					gSignout.type = 'text/javascript'
					gSignout.id = 'gSignout'
					localStorage.removeItem('_login_provider')
					resolve(true)
					ref.parentNode.insertBefore(gSignout, ref)
					break
				case 'facebook':
					FB.logout(()=>{
						localStorage.removeItem('_login_provider')
						resolve(true)
					})
					break
				case 'linkedin':
					IN.User.logout(()=>{
						localStorage.removeItem('_login_provider')
						resolve(true)
					}, {})
					break
			}
		})
	}
	private _google_login_data():google_social_login_data_T {
		const currentUser = this.gauth.currentUser.get()
		const profile = currentUser.getBasicProfile()
		const idToken = currentUser.getAuthResponse().id_token
		return {
			token: idToken,
			uid: profile.getId(),
			name: profile.getName(),
			email: profile.getEmail(),
			image: profile.getImageUrl(),
			provider: 'google'
		}
	}
}
export const auth = new Auth()
export interface SocialLoginData_I {
	provider:string
	name:string
	email:string
	image:string
	uid:string
}
export interface google_social_login_data_T extends SocialLoginData_I {
	provider:'google'
	token:string
}
export interface facebook_social_login_data_T extends SocialLoginData_I {
	provider:'facebook'
	token:string
}
export interface linkedin_social_login_data_T extends SocialLoginData_I {
	provider:'linkedin'
}
