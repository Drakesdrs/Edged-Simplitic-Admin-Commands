Admins = ["Edge.", "simulated_1"] // put here random users for admin lol


console.log(isInArray); // true
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
                 player.kick(`You were kicked by ${caller.username}`)
                 return
            }

        }
    }
})

// Ban Command

BannedUsers = []

Game.command("ban", (caller, args) => {
    if (Admins.includes(caller.username)) {
        for (let player of Game.players) {
            if (player.username.startsWith(args)) {
                player.kick("banned")
                BannedUsers.push(player)
                return
                
            }
        }
    }

})


Game.on("playerJoin", (player) => {
    if (BannedUsers.includes(player.username)){
        return player.kick("You're banned")
        
        


    }
 })

 Game.on("playerJoin", (player) => {
    if (Admins.includes(player.username)){
        console.log("Admin has joined wow")
        player.topPrint(`Welcome ${player.username} You're an administrator.`)
        return 

    }
 })

