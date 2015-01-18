// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game', stateActions);

var score = -1;
var player;
var pipes;

var label_score;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("background", "assets/hawkeye2.jpg.png");
    game.load.image("playerImg", "assets/watto3.png");
game.load.audio("score","assets/out.mp3");

    game.load.image("pipe", "assets/stumps50.png")
    game.load.image("bottom","assets/bottom.png")
    game.load.image("top","assets/top.png")

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#FFD6AD");

    game.add.text(150,350, "LEG BEFORE WATTO",
        {font: "20px Aharoni", fill: "#009900"});
    game.add.text(100,370, "How many runs can he score?",
        {font: "20px Aharoni", fill: "#009900"});
    game.add.text(20,27.5, "SCORE",
        {font: "20px Aharoni", fill: "#000000"});



    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(player_jump);

    label_score = game.add.text(100,10, "0",
    {font: "50px Aharoni", fill: "#000000"});

    player = game.add.sprite (450,200,"playerImg");

    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);

    pipes = game.add.group();


    generate_pipe();
        pipe_interval = 1.75;
        game.time.events.loop(pipe_interval * Phaser.Timer.SECOND, generate_pipe);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.enable(player);
        player.body.velocity.x=0;
        player.body.velocity.y=-100;
        player.body.gravity.y=800



}


/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade.overlap(player, pipes, game_over);

}


function changeScore() {
    score = score + (1/32);
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

function generate_pipe () {
    var gap_start = game.rnd.integerInRange (0,3);
    for (var count = -10; count <22; count++) {
        if (count != gap_start && count != gap_start + 1 && count !=gap_start + 2 && count != gap_start + 3 && count != gap_start + 4) {
            add_pipe_block(800, count * 50);
        }
        if(count == gap_start){
            add_pipe_block2 (800, count *50)
        }
        if(count == gap_start + 4){
            add_pipe_block3 (800, count *50)
        }
        changeScore();
    }
}

function add_pipe_block (x,y) {
    var pipe = pipes.create(x,y, "pipe");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x=-200;
}

function add_pipe_block2 (x,y) {
    var pipe = pipes.create(x,y, "bottom");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x=-200;
}

function add_pipe_block3 (x,y) {
    var pipe = pipes.create(x,y, "top");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x=-200;
}

function player_jump() {
    player.body.velocity.y=-300;
}

function game_over () {
    game.sound.play("score")
    location.reload();
}

