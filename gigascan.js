/** @param {NS} ns **/
export async function main(ns) {
	const home = "home";
	const target = ns.args[0];
	const currentMachine = ns.getHostname();
	var servers = ns.scan(currentMachine);
	var scripts = ns.ls(home, "basic-");

	ns.tprint("Host:  " + currentMachine);
	for (let entry in servers) {	// depth 0
		ns.tprint("found server: " + servers[entry]);
		let subservers = ns.scan(servers[entry]);	// depth 1
		for (let subentry in subservers) {
			if (subservers[subentry] !== home && subservers.length > 1) {
				ns.tprint("-----> " + subservers[subentry]);
				let subserversd2 = ns.scan(subservers[subentry]); // depth 2
				for (let subentryd2 in subserversd2) {
					if (subserversd2[subentryd2] !== subservers[subentry] && subserversd2[subentryd2] !== servers[entry] && subserversd2.length > 1) {
						ns.tprint("----------> " + subserversd2[subentryd2]);
						let subserversd3 = ns.scan(subserversd2[subentryd2]);	// depth 3
						for (let subentryd3 in subserversd3) {
							if (subserversd3[subentryd3] !== subserversd2[subentryd2] && subserversd3[subentryd3] !== subservers[subentry] && subserversd3.length > 1) {
								ns.tprint("----------------> " + subserversd3[subentryd3]);
								let subserversd4 = ns.scan(subserversd3[subentryd3]);	// depth 4
								for (let subentryd4 in subserversd4) {
									if (subserversd4[subentryd4] !== subserversd3[subentryd3] && subserversd4[subentryd4] !== subserversd2[subentryd2] && subserversd4.length > 1) {
										ns.tprint("----------------------> " + subserversd4[subentryd4]);
										let subserversd5 = ns.scan(subserversd4[subentryd4]);	// depth 5
										for (let subentryd5 in subserversd5) {
											if (subserversd5[subentryd5] !== subserversd4[subentryd4] && subserversd5[subentryd5] !== subserversd3[subentryd3] && subserversd5.length > 1) {
												ns.tprint("-------------------------> " + subserversd5[subentryd5]);
												let subserversd6 = ns.scan(subserversd5[subentryd5]);	// depth 6
												for (let subentryd6 in subserversd6) {
													if (subserversd6[subentryd6] !== subserversd5[subentryd5] && subserversd6[subentryd6] !== subserversd4[subentryd4] && subserversd6.length > 1) {
														ns.tprint("------------------------------> " + subserversd6[subentryd6]);
														let subserversd7 = ns.scan(subserversd6[subentryd6]);	// depth 7
														for(let subentryd7 in subserversd7) {
															if (subserversd7[subentryd7] !== subserversd6[subentryd6] && subserversd7[subentryd7] !== subserversd5[subentryd5] && subserversd7.length > 1) {
																ns.tprint("-----------------------------------> " + subserversd7[subentryd7]);
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}