Admins = ["Edge.", "simulated_1", "Player1"] // put here random users for admin lol
BannedUsers = []

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
                return player.kick(`You were kicked by ${caller.username}`)

            }

        }
    }
    else return caller.topPrint("You cant run that command! Missing privileges: Administrator")

})


let Help = `Help Commands!
/ban Player || Bans the user from the server.
/kick Player || Kicks the player from the server.
/to Player || Teleports yourself to the player position

Made by Edged. More Coming Soon.
`

// Teleport Command ez ez ez 
Game.command("commands", (caller, args) => {
    if (Admins.includes(caller.username)) {
        caller.message(Help)

    }
})

Game.command("admin", (caller, args) => {
    if (Admin.includes(caller.username)) {
        caller.topPrint(`User ${args} is now an Administrator.`)
        return Admin(args.username)
    }
    else return caller.topPrint("You cant run that command! Missing privileges: Administrator")

})
Game.command("unadmin", (caller, args) => {
    if (Admin.includes(caller.username)) {
        caller.topPrint(`User ${args} is no longer an administrator.`)
        return UnAdmin(args.username)
    }
    else return caller.topPrint("You cant run that command! Missing privileges: Administrator")

})
Game.command("to", (caller, args) => {
    if (Admins.includes(caller.username)) {
        P = getPlayer(args);
        caller.topPrint(`Teleporting to ${P.username}`);
        CallerPos = caller.position;
        caller.setPosition(new Vector3(P.position.x, P.position.y, P.position.z)) //Offsets work for god sake
    }

})

// Ban Command


Game.command("ban", (caller, args) => {
    if (Admins.includes(caller.username)) {
        for (let player of Game.players) {
            if (player.username.startsWith(args)) {
                player.kick(`You've been banned by ${caller.username}`)
                caller.topPrint(`Banned user ${player.username}.`)
                return BannedUsers.push(player)

            }

        }
    }
    else return caller.topPrint("You cant run that command! Missing privileges: Administrator")

})

Game.command("unban", (caller, args) => {
    if (Admins.includes(caller.username)) {
        removeA(args)
        return caller.topPrint(`User ${args} is now Unbanned!`)
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
            return player.topPrint(`Welcome ${player.username} You're an administrator.`)

            // The outfit is now loaded.
        })


    }
})

