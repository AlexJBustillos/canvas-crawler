const movementDisplay = document.querySelector('#movement')
const game = document.getElementById('game')


//converting px to '' in order to not strecth out image
//getComputedStyle is accesing 400 and 800
const computedStyle = getComputedStyle(game);
const height = computedStyle.height
const width = computedStyle.width
game.height = height.replace('px', '')
game.width = width.replace('px', '')


// grab context from canvas
const ctx = game.getContext('2d')


// //draw rectangle here
// ctx.fillRect(10, 10, 100, 100);
// ctx.strokeRect(10, 10, 100, 100);

// function drawBox(x, y, size, color) {
//     ctx.fillStyle = color
//     ctx.fillRect(x, y, size, size)
// }


// var ogre = {
//     x: 10,
//     y: 10,
//     color: "#BADA55",
//     width: 40,
//     height: 80,
//     alive: true,
//     render: function () {
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// }

// var hero = {
//     x: 0,
//     y: 0,
//     color: "hotpink",
//     width: 20,
//     height: 20,
//     alive: true,
//     render: function () {
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// }

class Crawler{
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.alive = true
    }

    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

const ogre = new Crawler(10, 10, "#BADA55", 40, 80)
const hero = new Crawler(150, 150, 'hotpink', 20, 20)
 

document.querySelector('#status').addEventListener('click', function() {
    hero.render()
    ogre.render()

})


document.addEventListener('keyup', function(evt) {
    if (evt.key === 'w') {
        hero.y -= 10
    } else if(evt.key === 'a') {
        hero.x -= 10
    } else if (evt.key === 's') {
        hero.y += 10
    } else if (evt.key === 'd') {
        hero.x += 10
    }

    
    movementDisplay.textContent = `X: ${hero.x}, Y: ${hero.y}`;
})

function detectHit() {
    //hit coming in from the right
    if (hero.x < ogre.x + ogre.width 
        && hero.x + hero.width > ogre.x
        && hero.y < ogre.y + ogre.height 
        && hero.y + hero.height > ogre.y) {
        ogre.alive = false
    }

    
}

function rePaint() {
    // clear off the entire canvas
    ctx.clearRect(0, 0, game.width, game.height)

    //render the hero and ogre
    hero.render()
    if (ogre.alive) {
        ogre.render()

    }

    detectHit()
}

setInterval(rePaint, 1000 / 60) // 60 frames per second
