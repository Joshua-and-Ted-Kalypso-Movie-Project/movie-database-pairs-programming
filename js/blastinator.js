function main(args){
    let actions = []
    switch(args.event) {
        case "idle":
            let me = args.angle
            let gun = args.turret_angle
            let him = args.data.angle
            // adjusting the position
            if (gun > him) {
                actions.push({ "turn_turret_right": 360 - me + him, "yell": "right " + (360 - me + him)})
            } else if (gun < him) {
                actions.push({ "turn_turret_right": gun + him, "yell": "right " + (gun + him)})

            actions.push({ "shoot": true, "data": {} })}
        else {
            actions.push({"turn_turret_left": 45, "move_forwards": 50})
            actions.push({"turn_left": 45})
            break;}
        case "wall-collide":
            actions.push({"turn_left": 90, "move_opposide":10})
            actions.push({"turn_left":90, "move_forwards": 50})
            break
        case "hit":
            actions.push({"yell": "PORKINS NOOOOO!", "turn_right": 90, "move_opposite": 50})
            break
        case "enemy-spot":
            let angle = args.enemy_spot.angle
            if (!("angle" in args.data)) {
                actions.push({ "yell": "Spotted at " + angle })
                actions.push({ "data": { "angle": angle } })
                actions.push({turn_right:  "Fire!", "shoot":true})
                break}
            default:
                console.log(args)
            }
            return { "body": actions}
    }