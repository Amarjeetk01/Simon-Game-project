var level = 0;
var gamePattern = [];
var userClick = [];
var colour = ["red", "blue", "green", "yellow"];
var started = false;

$(document).keypress(function () {
    if (!started) {
        nextSequence();
        started = true;
    }
});
$(".btn").click(function () {

    var buttonID = $(this).attr("id");
    makeSound(buttonID);
    buttonAnimation(buttonID);
    userClick.push(buttonID);
    checkSequence(userClick.length - 1);
});

function makeSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}
function buttonAnimation(currentKey) {
    var activeKey = $("#" + currentKey)
    activeKey.addClass("pressed");
    setTimeout(function () {
        activeKey.removeClass("pressed");
    }, 100);
}

function checkSequence(currentLevel) {
        if (gamePattern[currentLevel] === userClick[currentLevel]) {
            if (userClick.length === gamePattern.length) {
                setTimeout(function () {
                    nextSequence();
                }, 1000);
            }
        }
        else {
            var wrong = new Audio("./sounds/wrong.mp3");
            wrong.play();
            $("#level-title").text("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            startOver();
        }
    }

    function nextSequence() {
        level++;
        $("#level-title").text("Level " + level);
        userClick = [];
        var randomNumber = Math.floor(Math.random() * 4);
        var randomColor = colour[randomNumber];
        gamePattern.push(randomColor);
        makeSound(randomColor);
        buttonAnimation(randomColor);
        $("level-title").text("Level " + level);
    }

    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
    }