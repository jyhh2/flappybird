// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(900, 400, Phaser.AUTO, 'game', stateActions);

var score = 0;
var player;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
game.load.image("playerImg", "assets/watto3.png");
game.load.audio("score","assets/out.mp3")
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#FFD6AD");
    game.add.text(300,350, "Welcome to my game",
        {font: "20px Arial", fill: "#FFFFFF"});



    game.input.onDown.add(clickHandler);

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);

    label_score = game.add.text(20,20, "0")

    player = game.add.sprite(41,41, "playerImg");

    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    var label_score;
}

function clickHandler(event){
    game.add.sprite(event.x, event.y, "playerImg");
    game.sound.play("score");
}
function spaceHandler () {
    game.sound.play("score");
    changeScore();
}
function changeScore() {
    score = score + 1;
    label_score.setText(score.toString());
}
function moveRight() {
    player.x += 10;

}
function moveLeft() {
    player.x = player.x - 10;
}
function moveDown() {
    player.y = player.y + 10;
}
function moveUp() {
    player.y = player.y - 10;
}