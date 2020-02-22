/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:40 PM -- November 21st, 2019.
 *	Project: @commandsocket/browser-client
 */

import {
	CommandSocket,
	CommandSetStructure,
	CommandRegistry
} from "@command-socket/core";
import { BrowserWebSocket } from "./browser-websocket";

/**
 * A browser-specific implementation of a CommandSocket.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class CommandSocketBrowserClient<
	LCS extends CommandSetStructure = any,
	RCS extends CommandSetStructure = any> extends CommandSocket<LCS, RCS> {
	
	protected constructor(url: string, commandRegistry?: CommandRegistry<LCS>);
	protected constructor(websocket: WebSocket, commandRegistry?: CommandRegistry<LCS>);
	protected constructor(urlOrWebSocket: string | WebSocket,
					   commandRegistry: CommandRegistry<LCS> = new CommandRegistry<LCS>()) {
	
		super(new BrowserWebSocket(urlOrWebSocket as any), commandRegistry);
	
	}
	
	public static create<LCS extends CommandSetStructure, RCS extends CommandSetStructure>(
		url: string, commandRegistry?: CommandRegistry<LCS>): Promise<CommandSocket<LCS, RCS>>;
	
	public static create<LCS extends CommandSetStructure, RCS extends CommandSetStructure>(
		websocket: WebSocket, commandRegistry?: CommandRegistry<LCS>): Promise<CommandSocket<LCS, RCS>>;
	
	public static create<LCS extends CommandSetStructure, RCS extends CommandSetStructure>(urlOrWebSocket: string | WebSocket,
																						   commandRegistry: CommandRegistry<LCS> = new CommandRegistry<LCS>()): Promise<CommandSocket<LCS, RCS>> {
		
		return new Promise<CommandSocket<LCS, RCS>>((resolve: (value?: (PromiseLike<CommandSocket<LCS, RCS>> | CommandSocket<LCS, RCS>)) => void): void => {
			
			let commandsocket: CommandSocket<LCS, RCS> = new CommandSocketBrowserClient(urlOrWebSocket as any, commandRegistry);
			
			commandsocket.getEvents().OPEN.subscribe((): void => resolve(commandsocket));
			
		});
		
	}
	
}