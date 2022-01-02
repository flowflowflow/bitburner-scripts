/** @param {NS} ns **/
export async function main(ns) {
	const home = "home";
	const target = ns.args[0];
	var servers = ns.scan(home);
	var scripts = ns.ls(home, "basic-");

	for (let entry in servers) {
		ns.tprint("found server: " + servers[entry]);
		let subservers = ns.scan(servers[entry]);
		for (let subentry in subservers) {
			if (subservers[subentry] !== "home" && subservers.length > 1) {
				ns.tprint("-----> " + subservers[subentry]);
				let subserversd2 = ns.scan(subservers[subentry]);
				for(let subentryd2 in subserversd2) {
					if(subserversd2[subentryd2] !== subservers[subentry] && subserversd2[subentryd2] !== servers[entry] && subserversd2.length > 1) {
						ns.tprint("----------> " + subserversd2[subentryd2]);
						let subserversd3 = ns.scan(subserversd2[subentryd2]);
						for(let subentryd3 in subserversd3) {
							if(subserversd3[subentryd3] !== subserversd2[subentryd2] && subserversd3[subentryd3] !== subservers[subentry]  && subserversd3.length > 1) {
								ns.tprint("----------------> " + subserversd3[subentryd3]);
								let subserversd4 = ns.scan(subserversd3[subentryd3]);
								for(let subentryd4 in subserversd4) {
									if(subserversd4[subentryd4] !== subserversd3[subentryd3] && subserversd4[subentryd4] !== subserversd2[subentryd2]   && subserversd4.length > 1) {
										ns.tprint("----------------------> " + subserversd4[subentryd4]);
										let subserversd5 = ns.scan(subserversd4[subentryd4]);
										for(let subentryd5 in subserversd5) {
											if(subserversd5[subentryd5] !== subserversd4[subentryd4] && subserversd5[subentryd5] !== subserversd3[subentryd3]   && subserversd5.length > 1) {
												ns.tprint("-------------------------> " + subserversd5[subentryd5]);
												let subserversd6 = ns.scan(subserversd5[subentryd5]);
												for(let subentryd6 in subserversd6) {
													if(subserversd6[subentryd6] !== subserversd5[subentryd5] && subserversd6[subentryd6] !== subserversd4[subentryd4]   && subserversd6.length > 1) {
														ns.tprint("------------------------------> " + subserversd6[subentryd6]);
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