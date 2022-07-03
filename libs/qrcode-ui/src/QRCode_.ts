import type QRCode from 'qrcode'
export function QRCode_():typeof QRCode {
	return window.QRCode as typeof QRCode
}
declare global {
	interface Window {
		QRCode:typeof QRCode
	}
}
