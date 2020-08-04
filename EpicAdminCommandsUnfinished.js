// Add "ALL" arguments to the damn script









const Ver = "V1.5.0x"
const Developer = "The Windows 10"


console.log(`Thanks for using Epic and dank Admin commmands!\nCurrent Version: ${Ver}`)


Admins = ["The Windows 10, "simulated_1", "Player1"] // put here random users for admin if u want
BannedUsers = []
const IPBANS = [] //put ips to automatically ipban here
const SAFEIPS = ["127.0.0.1"]

Game.setMaxListeners(50) // Important to avoid future memory leaks


// Giving more memory

function getPlayer(name) {
    //totally not copied from cheats admin v2 because it works.
    for (let player of Game.players) {
        if (player.username.toLowerCase().indexOf(String(name).toLowerCase()) == 0) {
            const victim = Array.from(Game.players).find(p => p.username === player.username)
            return victim
        }
    }
}



function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}
// Check if da kid is an admin or whatever

function CheckAdmin(User) {
    if (Admins.includes(User)) {

        console.log(`${User} Is an administrator.`)
        return true;

    }
    else if (!Admins.includes(User)) {
        console.log(`${User} Aint an admin`)
        return false;
    }

}


// Commands:


// IPBanning
Game.on("playerJoin", (p) => {
    if (IPBANS.includes(p.socket.IPV4)) return p.kick("Sike, I ip logged ya and decided to ip ban ya dont troll kid")
})

Game.command("ipban", (p, m) => {
    if (Admins.includes(p.username)) { // Change YOURUSERID with your user id.
        const v = getPlayer(m);
        if (!v) return;

        if (v.socket.IPV4 == p.socket.IPV4 || SAFEIPS.includes(v.socket.IPV4)) return p.message("Unable to IP ban. This IP is in the SAFEIPS array, or is your own IP.")

        IPBANS.push(v.socket.IPV4);
        console.log(`You ip banned ${v.socket.IPV4}.`)
        for (let player of Game.players) {
            if (IPBANS.includes(player.socket.IPV4)) player.kick("You have been IP banned.")
        }
    } else return caller.topPrint("You cant execute that command kiddo try harder Missing privileges: Administrator", 5)

})

Game.command("setavatar", (p, m) => {
    p.setAvatar(m)
    p.topPrint(`User: ${p.username} avatar is now ${m}`)

})
Game.command("setavatar", (p, m) => {
    p.setAvatar(m)
    p.topPrint(`User: ${p.username} avatar is now ${m}`)

})

Game.command("edge", (p, m) => {
    p.setAvatar(m)
    p.prompt(`Current Admin Version: ${Ver}\nDeveloper: ${Developer}\nThanks for using Epic and dank admin commands`)

})

Game.command("unipban", (p, ip) => {
    if (Admins.includes(p.username)) { //Change USERID with your respective id.
        if (IPBANS.includes(ip)) {
            IPBANS.splice(IPBANS.indexOf(ip), 1)
            console.log(`Unbanned IP: ${ip}`)
        }
    }
})
// DISCO! Command.
OldBricks = []
const months = ["#b023c7", "#dc9a76", "#e9a130", "#dda957", "#5b1dab", "#2adf03", "#d2198e"];

let random = Math.floor(Math.random() * months.length);
console.log(months[random]);
Game.command("Disco", (caller, args) => {
    if (Admins.includes(caller.username)) {
        if (args == "all") {
            for (let player of Game.players) {
                let outfit = new Outfit(player)
                    // Sets all player colors to "#ffffff"
                    .body(Math.floor(Math.random() * months.length))
                    // Sets the head color (body colors are still changed!)
                    .head(Math.floor(Math.random() * months.length))
                    // Replicate the changes to the players.
                    player.setOutfit(outfit)

                // Alternatively, you can use: p.setOutfit(outfit)



            }
        }

    }
    else return caller.topPrint("Nah fam you need admin bruhh Missing privileges: Administrator", 5)

})
// Kick command

Game.command("kick", (caller, args) => {
    if (Admins.includes(caller.username)) {
        for (let player of Game.players) {
            if (player.username.startsWith(args)) {
                return player.kick(`Tough luck kid you were kicked by mista. ${caller.username}`, 5)

            }

        }
    }
    else return caller.topPrint("KeK you think your smart, you will never find a bug, Missing privileges: Administrator", 5)

})


let Help = `Help Commands!\n
/ban Player || Bans the user from the server.\n
/kick Player || Kicks the player from the server.\n
/to Player || Teleports yourself to the player position\n
\n
Made by The Windows 10 More Coming Soon.
`





Game.command("commands", (caller, args) => {
    if (Admins.includes(caller.username)) {
        console.log(Help)

    }
})

Game.command("change", (caller, args) => {
    if (Admins.includes(caller.username)) {
        args = args.split(" ")
        let P = getPlayer(args[0])
        console.log(caller.username + " is changing " + args[0] + " Score to " + args[1])
        return P.setScore(args[1])


    }
    else return caller.topPrint("You need admin perms tough luck Missing privileges: Administrator", 5);
})


Game.command("alertall", (caller, args) => {
    if (Admins.includes(caller.username)) {
        for(let P of game.players){
            P.prompt(args)
        }

    }
    else return caller.topPrint("Aww you need administrator Missing privileges: Administrator", 5);
})


Game.command("kill", (caller, args) => { // kill go brrrr
    if (Admins.includes(caller.username)) {
        args = args.split(" ")
        let P = getPlayer(args[0])
        if (args[0] == "all") {
            for (let player of Game.players) {
                player.setHealth(0)
                console.log(player.username + "Did not have the ability to survive RIP")
            }
        }
        else return P.setHealth(0)


    }
    else return caller.topPrint("You have been ip logged", 5);
})




Game.command("admin", (caller, args) => {
    if (Admins.includes(caller.username)) {
        if (caller.username == args) return caller.topPrint("You cant admin yourself again lol.")
        let P = getPlayer(args)
        caller.topPrint(`User ${P.username} is now an Administrator.`, 5)
        return Admins.push(P.username)
    }
    else return caller.topPrint("You cant run that command! Missing privileges: Administrator", 5)

})
Game.command("unadmin", (caller, args) => {
    if (Admins.includes(caller.username)) {
        if (caller.username == args) return caller.topPrint("You cant unadmin yourself.")
        let P = getPlayer(args)
        caller.topPrint(`User ${P.username} is no longer an administrator.`, 5)
        return Admins.splice(Admins.indexOf(P.username), 1)
    }
    else return caller.topPrint("You cant run that command! Missing privileges: Administrator", 5)

})

Game.command("m", (caller, args) => {
    if (Admins.includes(caller.username)) {
        Game.topPrintAll(`${args}`, 5)
    }
    else return caller.topPrint("You need admin mate Missing privileges: Administrator", 5)

})
Game.command("n", (caller, args) => {
    if (Admins.includes(caller.username)) {
        Game.centerPrintAll(`${args}`, 5)
    }
    else return caller.topPrint("TELL THE ADMIN TO GIVE YOU PERMS Missing privileges: Administrator", 5)

})

Game.command("b", (caller, args) => {
    if (Admins.includes(caller.username)) {
        Game.bottomPrintAll(`${args}`, 5)
    }
    else return caller.topPrint("You Need admin fam sorry bro Missing privileges: Administrator", 5)

})


// Teleport Command ez ez ez
Game.command("skydive", (caller, args) => {
    if (Admins.includes(caller.username)) {
        let P = getPlayer(args);
        if (args == "all"){
          for (let P of game.Players){
            P.setPosition(new Vector3(P.position.x, P.position.y, P.position.z + 100)) //Offsets work for god sake

          }
        }
        if (P == undefined || P == " ") return caller.bottomPrint(`Player with the username key ${args} was not found on the server! Please try again.`, 3)
        caller.topPrint(`Skydiving`, 3);
        CallerPos = caller.position;
        P.setPosition(new Vector3(P.position.x, P.position.y, P.position.z + 100)) //Offsets work for god sake
    }
    else return caller.topPrint("Whatcha tryna do there mate Missing privileges: Administrator", 5)

})
// Teleport Command ez ez ez
Game.command("to", (caller, args) => {
    if (Admins.includes(caller.username)) {
        let P = getPlayer(args);
        if (P == undefined || P == " ") return caller.bottomPrint(`Player with the username key ${args} was not found on the server! Please try again.`, 3)
        caller.topPrint(`Well your gonna tp to this poor soul ${P.username}`, 3);
        CallerPos = caller.position;
        caller.setPosition(new Vector3(P.position.x, P.position.y, P.position.z)) //Offsets work for god sake
    }

})

Game.command("bring", (caller, args) => {
    let  CallerPos = caller.position;
    if (args == "all"){
      for (let Player of Game.players){
        Player.setPosition(new Vector3(CallerPost.x, CallerPos.y, CallerPost.z))
      }
    if (Admins.includes(caller.username)) {
        let P = getPlayer(args);
        if (P == undefined || P == " ") return caller.bottomPrint("Player not found", 3)

        }
        if (P.username == caller.username) return caller.topPrint("You really think you can bring yourself to yourself", 3)
        else {
            caller.topPrint(`Bringing Player ${P.username}`, 5)
            P.setPosition(new Vector3(CallerPos.x, CallerPos.y, CallerPos.z))

        }

    }
