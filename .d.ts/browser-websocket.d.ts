import { ISocket, SocketEvents } from "@command-socket/core";
export declare class BrowserWebSocket implements ISocket {
    private readonly websocket;
    private readonly events;
    constructor(url: string);
    constructor(websocket: WebSocket);
    send(data: any): void;
    close(code?: number, reason?: string): void;
    getIP(): Promise<string>;
    getEvents(): SocketEvents;
}
