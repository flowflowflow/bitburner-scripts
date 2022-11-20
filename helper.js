/**
 * Returns an array of all hostnames in the network tree
 * 
 * @param {string[]} myServers
 * @param {number} safetyCounter Prevents infnite recursion
 * @param {NS} ns
 */
export async function getServerList(myServers, safetyCounter, ns) {
	let srvrsSeen = myServers;
	let currServScanResult = [];

	for (let serverSeen in srvrsSeen) {
		currServScanResult = ns.scan(srvrsSeen[serverSeen]);
		for (let entry in currServScanResult) {
			if (!srvrsSeen.includes(currServScanResult[entry])) {
				srvrsSeen.push(currServScanResult[entry]);
				if ((++safetyCounter) < 250) {
					await getServerList(srvrsSeen, safetyCounter, ns);
				} else {
					ns.exit();
				}
			}
		}
	}
	//Filter out invalid values (NaN, null, {}, undefined)
	srvrsSeen = srvrsSeen.filter(x => x != null);
	return srvrsSeen;
}


/** 
 * 	Attempts to take over target machine	
 * 
 *  @param {string} target
 * 	@param {NS} ns
 *  @return {boolean} outcome 
**/
export async function takeover(target, ns) {
	const home = "home";
	let currentTarget = target;
	let isNotTakenOver = true;
	let attemptCounter = 0;

	let scripts = ns.ls(home, ".js");
	//scripts.push(ns.ls(home, ".ns")); //in case of deprecated .ns scripts

	if (!ns.hasRootAccess(currentTarget) && attemptCounter < 30) {
		while (isNotTakenOver) {
			if (ns.fileExists("BruteSSH.exe", "home")) {
				ns.brutessh(currentTarget);
			}
			if (ns.fileExists("FTPCrack.exe", "home")) {
				ns.ftpcrack(currentTarget);
			}
			if (ns.fileExists("HTTPWorm.exe", "home")) {
				ns.httpworm(currentTarget);
			}
			if (ns.fileExists("relaySMTP.exe", "home")) {
				ns.relaysmtp(currentTarget);
			}
			if (ns.fileExists("SQLInject.exe", "home")) {
				ns.sqlinject(currentTarget);
			}
			if (ns.fileExists("NUKE.exe", "home")) {
				try {
					ns.nuke(currentTarget);
					isNotTakenOver = !ns.hasRootAccess(currentTarget);
				} catch (error) {
					ns.tprint("not enough ports to nuke " + currentTarget);
					return false;
				}

			}
			attemptCounter++;
		}

		await ns.scp(scripts, home, currentTarget);
		ns.tprint("target " + currentTarget + " taken over");
		return true;
	}
	return false;
}



/** 
 * 	Returns a sorted map of all servers with the currently available money	
 * 
 * 	@param {NS} ns
 *  @return {Map} server list 
**/
export async function getServersWithMoney(ns) {

	const unsortedServersMap = new Map();
	let serversOwned = ["home", ...ns.getPurchasedServers()];
	let serversSeen = ["home", ...await getServerList(serversOwned, 0, ns)];

	serversSeen = removeOwnedServers(serversSeen, ns);

	//Get money currently available on server and save in a map
	for (let server in serversSeen) {
		unsortedServersMap.set(serversSeen[server], ns.getServerMoneyAvailable(serversSeen[server]));
	}

	//sort by values (asc)
	const sortedMap = new Map([...unsortedServersMap.entries()].sort((a, b) => b[1] - a[1]));

	//Remove servers that contain no money
	for (const [key, value] of sortedMap.entries()) {
		if (value == 0) {
			sortedMap.delete(key);
		}
	}
	
	/*
	for (const [key, value] of sortedMap.entries()) {
		ns.tprint("Server: " + key + "  Money available: " + value);
	}
	*/

	return sortedMap;
}


/**
 * Returns the list of all servers excluding purchased servers and home
 * 
 * @param {string[]} serverList
 * @param {NS} ns
 * 
 * @return {string[]} list of all servers excluding purchased and home
 */
export function removeOwnedServers(serverList, ns) {
	const toRemove = new Set(["home", ...ns.getPurchasedServers()]);
	let listOfServers = serverList;

	listOfServers = listOfServers.filter( x => !toRemove.has(x));

	return listOfServers;
}
