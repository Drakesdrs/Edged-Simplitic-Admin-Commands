Game.on("chat", async (player, message) => {
    if (player.admin){
        Game.messageAll("[BH Admin Abuser] "+ player.username+ ": "+ message)
    }

    else if (player.username == "Talveka"){
        Game.messageAll("[Queen] "+ player.username+": "+message)

    }
    else if (player.username == "Edge."){
        Game.messageAll("[Developer] "+ player.username+": "+message)

    }
    else {
        Game.messageAll("[Simp] "+player.username+": "+message)
    }
});
