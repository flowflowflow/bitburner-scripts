/** @param {NS} ns **/
// TODO: unused + unfinished, based on setup.ns
export async function main(ns) {
	const home = "home";
	const target = ns.args[0];
	var servers = ns.scan(home);
	var scripts = ns.ls(home, "basic-");

	for (let entry in scripts) {
		ns.tprint("found script: " + scripts[entry]);
	}

	// Hack servers if needed and populate with scripts
	for (let entry in servers) {
		ns.tprint("found server: " + servers[entry]);
		let subservers = ns.scan(servers[entry]);
		for (let subentry in subservers) {
			if (subservers[subentry] !== "home") {
				ns.tprint("----->   " + subservers[subentry]);
				if (!ns.hasRootAccess(subservers[subentry])) {
					takeover(subservers[subentry]);
				}
				ns.tprint("copying scripts to " + subservers[subentry]);
				await ns.scp(scripts, home, subservers[subentry]);
			}
		}

		if (!ns.hasRootAccess(servers[entry])) {
			takeover(servers[entry]);
		}
		ns.tprint("copying scripts to " + servers[entry]);
		await ns.scp(scripts, home, servers[entry]);
	}

	/** 
	 * 	Attempts to take over target machine	
	 * 
	 *  @param {string} tar
	 *  @return {boolean} outcome 
	**/
	async function takeover(tar) {
		let currentTarget = tar;
		let isNotTakenOver = true;
		let attemptCounter = 0;

		if (ns.getServerNumPortsRequired <= 5 && attemptCounter < 30) {
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
					ns.nuke(currentTarget);
					isNotTakenOver = !ns.hasRootAccess(currentTarget);
				}
				
				attemptCounter++;
			}

			ns.tprint("target " + currentTarget + " taken over");
			return true;
		}
		return false;
	}
}