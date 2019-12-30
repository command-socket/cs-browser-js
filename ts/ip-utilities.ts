/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:13 PM -- October 28th, 2019.
 *	Project: @command-socket/core
 */

import "promise-any-polyfill";

/**
 * The cached public IP of the device/network from which this module is operating.
 *
 * This is initially undefined, until the first time the {@link #getPublicIP} function is called, after which the cached
 * IP is used as the immediate return value of the `getPublicIP` function.
 */
let cachedIP: string | undefined;

export async function getPublicIP(): Promise<string> {
	
	if (cachedIP === undefined) {
		
		let sites: string[] = [
			"https://icanhazip.com/",
			"http://api.ipify.org/",
			// "http://ipv4bot.whatismyipaddress.com/"
		];
		
		let promises: Array<Promise<string>> = [];
		
		for (let site of sites) {
			
			promises.push(new Promise<string>(
				(resolve: (value?: (PromiseLike<string> | string)) => void, reject: (reason?: any) => void): void => {
				
				fetch(site).then((result: Response) => {
					
					result.text().then((ip: string) => resolve(ip));
					
				}).catch(() => reject("Failed to get public IP from '" + site + "'."));
				
			}));
		
		}
		
		cachedIP = (await Promise.any<string>(promises)).trim();
		
	}
	
	return cachedIP as string;
	
}