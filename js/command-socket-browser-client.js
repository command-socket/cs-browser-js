"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const core_1=require("@command-socket/core"),browser_websocket_1=require("./browser-websocket");class CommandSocketBrowserClient extends core_1.CommandSocket{constructor(e,o=new core_1.CommandRegistry){super(new browser_websocket_1.BrowserWebSocket(e),o)}}exports.CommandSocketBrowserClient=CommandSocketBrowserClient;
//# sourceMappingURL=command-socket-browser-client.js.map
