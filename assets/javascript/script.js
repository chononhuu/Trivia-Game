$(document).ready(function() {
    // All Variables 
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredQuestions = 0;
    var remainingTime = 15;
    var currentQuestion = 0;
    var intervalID; 
    var answered = false;
    var answer;
    var game = [{
        question: "What is the oldest team in the NBA?",
        answers: ["Boston Celtics", "New York Knicks", "Golden State Warriors", "Los Angeles Lakers"],
        answer: 0
    }, {
        question: "Which team won 1999 NBA Championship?",
        answers: ["Chicago Bulls", "Boston Celtics", "New York Knicks", "Los Angeles Lakers"],
        answer: "2"
    }, {
        question: "Where were the Thunder before Oklahoma city?",
        answers: ["St. Louis", "San Diego", "Minneapolis", "Seattle"],
        answer: "3"
    }, {
        question: "Which city has never had an NBA team?",
        answers: ["Syracuse, NY", "St. Louis, MO", "Vancouver, B.C", "Las Vegas, NV"],
        answer: "3"
    }, {
        question: "Which player has the most MVP award?",
        answers: ["Bill Russell", "Michael Jordan", "Kareem Abdul-Jabbar", "LeBron James"], 
        answer: "2"
    }];

    //main game function
    function triviaGame() {
        answered = false;
        remainingTime = 15;
        intervalID = setInterval(timer, 1000)

        if (answered === false) {
            timer();
        }

        answer = game[currentQuestion].answer;
        var question = game[currentQuestion].question;
        $(".question").html(question);

        //displaying possible answers
        for (var i = 0; i < 4; i++) {
            var answers = game[currentQuestion].answers[i];
            $(".answers").append('<h4 class=allAnswers id=' + i + '>' + answers + '</h4>');
        }

        //answer choosing listener
        $(".allAnswers").click(function() {
            var choice = $(this).attr('id');

            if (choice == answer) {
                answered = true;
                $(".question").text("Correct!!! The answer is: " + game[currentQuestion].answers[answer]);
                correctAnswer();
            }
            else {
                answered = true;
                $(".question").text("Incorrect!!! You chose: " + game[currentQuestion].answers[choice] + " Correct answer is: " + game[currentQuestion].answers[answer]);
                incorrectAnswer();
            }
        });
    };

    //new game function
    function newGame() {
        $(".button_start").remove();
        correctAnswers = 0;
        incorrectAnswers = 0;
        unansweredQuestions = 0;
        triviaGame();
    };

    //correct answer function
    function correctAnswer() {
        correctAnswers++;
        $(".remaining_time").remove();
        restart();
    };

    //incorrect answer function
    function incorrectAnswer() {
        incorrectAnswers++;
        $(".remaining_time").remove();
        restart();
    };

    //unanswered function
    function unanswered() {
        unansweredQuestions++;
        $(".remaining_time").text("Time's up!")
        restart();
    };

    //countdown function
    function timer() {

        if (remainingTime === 0) {
            answered = true;
            clearInterval(intervalID);
            $(".question").text("Time's up!!! The answer is: " + game[currentQuestion].answers[answer]);
            unanswered();
        }
        else if (answered === true) {
            clearInterval(intervalID);
        }
        else {
            remainingTime--;
            $(".remaining_time").text("You have " + remainingTime + " seconds to choose");

        }
    };
    
    //restart function automatically resets game 5 sec after displaying scoreboard 
    function restart() {
        $(".allAnswers").remove();
        currentQuestion++;

        if (currentQuestion < game.length) {
            setTimeout(function() {
                triviaGame();
            }, 5000);
        }
        else {
            setTimeout(function() {
                $(".question").remove();
                $(".remaining_time").remove();
                $(".answers").append('<h3 class=allAnswers end>Correct Answers: ' + correctAnswers + '</h3>');
                $(".answers").append('<h3 class=allAnswers end>Correct Answers: ' + incorrectAnswers + '</h3>');
                $(".answers").append('<h3 class=allAnswers end>Correct Answers: ' + unansweredQuestions + '</h3>');
                setTimeout(function() {
                    location.reload();
                }, 5000);
            }, 5000);
        }
    };

    //click start to start new game listener
    $('.startButton').on("click", function () {
        $('.startButton');
        newGame();
    });

});