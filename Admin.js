Admins = ["Edge.", "simulated_1", "Player1"] // put here random users for admin lol
BannedUsers = []

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
// Check if the user is admin

function CheckAdmin(User) {
    if (Admins.includes(User)) {

        console.log(`${User} Is an administrator.`)
        return true;

    }
    else if (!Admins.includes(User)) {
        console.log(`${User} Is not an administrator`)
        return false;
    }

}

CheckAdmin("Talveka")

// Commands:

function Admin(user) {
    Admins.push(user)
}
function UnAdmin(user) {
    removeA(Admins, user)
}



// Kick command

Game.command("kick", (caller, args) => {
    if (Admins.includes(caller.username)) {
        for (let player of Game.players) {
            if (player.username.startsWith(args)) {
                return player.kick(`You were kicked by ${caller.username}`, 5)

            }

        }
    }
    else return caller.topPrint("You cant run that command! Missing privileges: Administrator", 5)

})


let Help = `Help Commands!\n
/ban Player || Bans the user from the server.\n
/kick Player || Kicks the player from the server.\n
/to Player || Teleports yourself to the player position\n
\n
Made by Edged. More Coming Soon.
`

// Teleport Command ez ez ez 
Game.command("commands", (caller, args) => {
    if (Admins.includes(caller.username)) {
        console.log(Help)

    }
})

Game.command("admin", (caller, args) => {
    if (Admins.includes(caller.username)) {
        if (caller.username == args) return caller.topPrint("You cant admin yourself again lol.")
        caller.topPrint(`User ${args} is now an Administrator.`, 5)
        return Admin(args.username)
    }
    else return caller.topPrint("You cant run that command! Missing privileges: Administrator", 5)

})
Game.command("unadmin", (caller, args) => {
    if (Admins.includes(caller.username)) {
        if (caller.username == args) return caller.topPrint("You cant unadmin yourself.")
        caller.topPrint(`User ${args} is no longer an administrator.`, 5)
        return UnAdmin(args)
    }
    else return caller.topPrint("You cant run that command! Missing privileges: Administrator", 5)

})

Game.command("m", (caller, args) => {
    if (Admins.includes(caller.username)) {
        Game.topPrintAll(`${args}`, 5)
    }
    else return caller.topPrint("You cant run that command! Missing privileges: Administrator", 5)

})
Game.command("n", (caller, args) => {
    if (Admins.includes(caller.username)) {
        Game.centerPrintAll(`${args}`, 5)
    }
    else return caller.topPrint("You cant run that command! Missing privileges: Administrator", 5)

})

Game.command("b", (caller, args) => {
    if (Admins.includes(caller.username)) {
        Game.bottomPrintAll(`${args}`, 5)
    }
    else return caller.topPrint("You cant run that command! Missing privileges: Administrator", 5)

})


// Here i let the player go to himself cuz well i mean not much bothering.
Game.command("to", (caller, args) => {
    if (Admins.includes(caller.username)) {
        let P = getPlayer(args);
        if (P == undefined || P == " ") return caller.bottomPrint(`Player with the username key ${args} was not found on the server! Please try again.`, 3)
        caller.topPrint(`Teleporting to ${P.username}`, 3);
        CallerPos = caller.position;
        caller.setPosition(new Vector3(P.position.x, P.position.y, P.position.z)) //Offsets work for god sake
    }

})

Game.command("bring", (caller, args) => {
    if (Admins.includes(caller.username)) {
        let P = getPlayer(args);
        if (P == undefined || P == " ") return caller.bottomPrint("Player not found", 3)
        if (P.username == caller.username) return caller.topPrint("You cant Bring yourself!", 3)
        else {
            caller.topPrint(`Bringing Player ${P.username}`, 5)
            CallerPos = caller.position;
            P.setPosition(new Vector3(CallerPos.x, CallerPos.y, CallerPos.z))

        }

    }
    else {
        return caller.topPrint("You cant run that command! Missing privileges: Administrator", 5)
    }

})
// Ban Command


Game.command("ban", (caller, args) => {

    if (Admins.includes(caller.username)) {
        let P = getPlayer(args)

        if (caller.username == P.username) {
            return caller.topPrint("You can ban yourself!")
        }
        else {
            caller.topPrint(`Banning user ${P}...`, 3)
            P.kick(`You've been banned by ${caller.username}`)
        }
    }
    else return caller.topPrint("You cant run that command! Missing privileges: Administrator", 5)

})

Game.command("unban", (caller, args) => {
    if (Admins.includes(caller.username)) {
        if (BannedUsers.includes(args)) {
            removeA(args)
            return caller.topPrint(`User ${args} is now Unbanned!`, 5)

        }
    }
    else return caller.topPrint("You cant run that command! Missing privileges: Administrator", 5)

})


Game.on("playerJoin", (player) => {
    if (BannedUsers.includes(player.username)) {
        return player.kick("You're banned")
    }
})

Game.on("playerJoin", (player) => {
    if (Admins.includes(player.username)) {
        player.on("avatarLoaded", () => {
            return player.topPrint(`Welcome ${player.username} You're an administrator.`, 10)

            // The outfit is now loaded.
        })


    }
})

