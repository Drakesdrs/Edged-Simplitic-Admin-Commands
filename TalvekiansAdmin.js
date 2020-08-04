const vipitem = 174778 // Replace this with your item ID

const colorcodeRegex = /\\c[0-9]/g
const hexcodeRegex = /(\[#[0-9a-fA-F]{6}\])/g
const internalcodeRegex = /<color:[0-9A-F]{6}>/g

vips = [] // array of vip userids

Game.on("playerJoin", async(p) => {
	let hasVIP = await p.ownsAsset(vipitem)
	if (hasVIP) {
		vips.push(p.userId)
	}
})




Game.on("chat", async (player, message) => {
    if (player.admin && hasVIP){
        Game.messageAll("[BH Admin Abuser][Donator] "+ player.username+ ":[#ffffff] "+ message)
	}
	if (player.admin){
        Game.messageAll("[BH Admin Abuser] "+ player.username+ ":[#ffffff] "+ message)
    }

    else if (player.username == "Talveka" && hasVIP){
        Game.messageAll("[#00a2fa][Queen] "+ player.username+":[#ffffff] "+message)

    }
    else if (player.username == "Edge."){
        Game.messageAll("[#ff0000][Developer] "+ player.username+":[#ffffff] "+message)

    }
    else if (hasVIP){
        Game.messageAll("[#fffb00][Simp][Donator] "+player.username+":[#ffffff] "+message)
	}
	else{
		Game.messageAll("[#fffb00][Simp] "+player.username+":[#ffffff] "+message)

	}
});
