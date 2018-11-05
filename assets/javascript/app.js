$(document).ready(function(){

    $("#start-btn").on("click", game.startTimer);
  
  });
  
  var game = {

    timeRemaining : 90,
  
    startTimer: function() {
      $("#timer").text("Time remaining: " + game.timeRemaining);
      setInterval(game.countdown, 1000);
      $("#start-page").hide();
      trivia.displayQuestions();
    },
  
    countdown: function() {
      game.timeRemaining--;
      $("#timer").text("Time remaining: " + game.timeRemaining);
      if (game.timeRemaining === 0) {
        game.stopTimer();
        $("#timer").empty();
      }
    },
  
    stopTimer: function() {
      clearInterval();
      trivia.checkAnswers();
    },
  
   
    showTally: function(numbCorrect, numbIncorrect, numbUnanswered) {
      $("#end-page").show();
      $("#questions-box").empty();
      $("#timer").empty();
      $("#timer").hide();
      $("#correct-answers").text("Correct answers: " + numbCorrect);
      $("#incorrect-answers").text("Incorrect answers: " + numbIncorrect);
      $("#unanswered").text("Skipped questions: " + numbUnanswered);
    }
  }
  
  var trivia = {
  
    displayQuestions: function() {
      var divContainer = $("#questions-box");
      var answerGroup = $(".form-check");
      divContainer.append('<h2>Answer the following questions:</h2>');
              
      for (var i = 0; i < questionBank.length; i++) {
  
        divContainer.append('<div id="question">' + questionBank[i].question + '</div>');
  
        var answer1 = questionBank[i].answers[0];
        var answer2 = questionBank[i].answers[1];
        var answer3 = questionBank[i].answers[2];
  
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
      }
  
      var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
      divContainer.append(doneButton);
      $("#done-button").on("click", game.stopTimer);
    },
  
    checkAnswers: function() {
      var correctAnswer;
      var userAnswer;
      var numbCorrect = 0;
      var numbIncorrect = 0;
      var numbUnanswered = 0;
  
      for (var i = 0; i < questionBank.length; i++) {
        correctAnswer = questionBank[i].correct;
        userAnswer = $('input[id=radio'+i+']:checked + label').text();
  
        if (userAnswer === correctAnswer) {
          numbCorrect++;
        } else if (userAnswer === "") {
          numbUnanswered++;
        } else if (userAnswer !== correctAnswer) {
          {
            numbIncorrect++;
          }
        }
      }
      game.showTally(numbCorrect, numbIncorrect, numbUnanswered);
    },
  }