/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	12:40 PM -- November 21st, 2019.
 *	Project: @commandsocket/browser-client
 */

import {
	CommandSocket,
	CommandSetStructure,
	CommandRegistry,
	FullCommandSet
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
	
	public constructor(url: string, commandRegistry?: CommandRegistry<FullCommandSet<LCS>>);
	public constructor(websocket: WebSocket, commandRegistry?: CommandRegistry<FullCommandSet<LCS>>);
	public constructor(urlOrWebSocket: string | WebSocket,
					   commandRegistry: CommandRegistry<FullCommandSet<LCS>> = new CommandRegistry<FullCommandSet<LCS>>()) {
	
		super(new BrowserWebSocket(urlOrWebSocket as any), commandRegistry);
	
	}
	
}