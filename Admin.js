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
console.log(Admins + " Are the current administrators")
Admin("IDK!")
console.log(Admins + " Are now the administrators")
UnAdmin("IDK!")
console.log(`${Admins} Are now the admins`)



// Kick command

Game.command("kick", (caller, args) => {
    if (Admins.includes(caller.username)) {
        for (let player of Game.players) {
            if (player.username.startsWith(args)) {
                return player.kick(`You were kicked by ${caller.username}`)
                
            }

        }
    }
})


let Help = `Help Commands!
/ban Player || Bans the user from the server.
/kick Player || Kicks the player from the server.
/to Player || Teleports yourself to the player position

Made by Edged. More Coming Soon.
`

// Teleport Command ez ez ez 
Game.command("help", (caller, args)=>{
    if (Admins.includes(caller.username)){
        console.log(``)

    }
})
Game.command("to", (caller, args) => {
    if (Admins.includes(caller.username)){
    P = getPlayer(args);
    caller.topPrint(`Teleporting ${P.username}`);
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
               
                return BannedUsers.push(player)

            }
        }
    }

})


Game.on("playerJoin", (player) => {
    if (BannedUsers.includes(player.username)) {
        return player.kick("You're banned")




    }
})

Game.on("playerJoin", (player) => {
    if (Admins.includes(player.username)) {
        
        return player.topPrint(`Welcome ${player.username} You're an administrator.`)
        

    }
})

