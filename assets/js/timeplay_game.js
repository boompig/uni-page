var app = angular.module("TimeplayApp", []);
app.controller("TimeplayCtrl", function ($scope, $timeout, $http) {
  "use strict";

  this.name = null;
  this.cdf_id = null;
  this.questionIndex = 0;
  this.score = 0;

  this.qa_list = [
    {
      question: "A necessary and sufficient condition for deadlock is...",
      answer_list: [
        "Multiple threads",
        "Circular wait",
        "No synchronization mechanisms",
        "There is no sufficient condition"
      ],
      answer_index: 1
    },
    {
      question: "Who invented the semaphore?",
      answer_list: [
        "Alan Turing",
        "Richard Bellman",
        "Edsger Dijkstra",
        "Claude Shannon"
      ],
      answer_index: 2
    }
  ];

  this.chosenAnswer = null;
  this.showAnswerResult = false;
  this.answerResult = null;
  this.answerResultAnimationDuration = 1000;

// ---------- API -------------
  this.sendAnswer = function () {
      var data = { answer_index: this.chosenAnswer };
      var url = "api/question/" + this.questionIndex + "/answer";
      console.log("Posting to URL " + url);
      $http.post(url, data)
      .then(function (response) {
        console.log(response);
      });
  };

  this.getUserInfo = function () {
    var that = this;
    console.log("Loading user info...");
    $http.get("api/user")
    .success(function (response) {
      console.log("Got user info:");
      console.log(response);

      // redirect to registration if not filled out
      if (!response.name || !response.cdf_id) {
        window.location.href = "timeplay.html";
      }

      // fill in values
      that.name = response.name;
      that.cdf_id = response.cdf_id;
    })
  };
// ---------- API -------------

  /**
   * Animations. TODO: use actual library for this
   */
  this.animateAnswerResult = function () {
    this.showAnswerResult = true;
    var that = this;
    $timeout(function () {
      // hide again
      that.showAnswerResult = false;
      that.answerResult = null;

      // move on to next question
    }, this.answerResultAnimationDuration);
  };

  /**
   * Check the chosen answer against the correct answer
   */
  this.selectAnswer = function () {
    var correctAnswer = this.getCorrectAnswer();
    console.log("Chosen answer is " + this.chosenAnswer);
    console.log("Correct answer is " + correctAnswer);
    if (this.chosenAnswer === correctAnswer) {
      this.answerResult = "Correct!";
      this.score++;
    } else {
      this.answerResult = "Wrong!";
    }
    console.log(this.answerResult);
    this.sendAnswer();
    // this.animateAnswerResult();
    this.questionIndex++;
  };

  this.getQuestion = function () {
    if (this.questionIndex >= this.qa_list.length) {
      return null;
    } else {
      return this.qa_list[this.questionIndex].question;
    }
  };

  this.getAnswerList = function () {
    if (this.questionIndex >= this.qa_list.length) {
      return null;
    } else {
      return this.qa_list[this.questionIndex].answer_list;
    }
  };

  this.getCorrectAnswer = function () {
    return this.qa_list[this.questionIndex].answer_index;
  }

  this.onLoad = function () {
    this.getUserInfo();
  };

  this.onLoad();
});
