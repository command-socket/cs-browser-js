/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:42 PM -- November 21st, 2019.
 *	Project: @commandsocket/browser-client
 */

import { ISocket, SocketEvents } from "@command-socket/core";
import * as IPUtilities from "./ip-utilities";

/**
 * An implementation of the base CommandSocket ISocket for use in the browser.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class BrowserWebSocket implements ISocket {
	
	private readonly websocket: WebSocket;
	
	private readonly events: SocketEvents;
	
	public constructor(url: string);
	public constructor(websocket: WebSocket);
	public constructor(urlOrWebSocket: string | WebSocket) {
		
		if (typeof urlOrWebSocket === "string") this.websocket = new WebSocket(urlOrWebSocket);
		else this.websocket = urlOrWebSocket;
	
		this.events = new SocketEvents();
		
		this.websocket.addEventListener("open", (): void => {
			
			this.getEvents().OPEN.notify({
				source: this
			});
			
		});
		
		this.websocket.addEventListener("message", (event: MessageEvent): void => {
			
			this.getEvents().MESSAGE.notify({
				source: this,
				data: event.data
			});
			
		});
		
		this.websocket.addEventListener("close", (event: CloseEvent): void => {
		
			this.getEvents().CLOSE.notify({
				source: this,
				code: event.code,
				reason: event.reason
			});
		
		});
		
		// TODO [11/21/19 @ 12:50 PM] - Error event?
	
	}
	
	public send(data: any): void {
		
		this.websocket.send(data);
		
	}
	
	public close(code?: number, reason?: string): void {
		
		this.websocket.close(code, reason);
		
	}
	
	public async getIP(): Promise<string> {
		
		return await IPUtilities.getPublicIP();
		
	}
	
	public getEvents(): SocketEvents {
		
		return this.events;
		
	}
	
}