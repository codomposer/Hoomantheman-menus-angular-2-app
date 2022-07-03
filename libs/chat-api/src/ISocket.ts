import type { Socket } from 'socket.io-client'
import type { IChatThread } from '@menus/chat'
import type { BaseUser } from '@menus/user-common'
export interface ISocketServer extends Socket {
	lastMessageSent:string;
	rooms:any;
	orderNumber:string;
	userType:string;
	handshake:any;
	user:BaseUser;
	thread:IChatThread;
	threads:IChatThread[];
}
