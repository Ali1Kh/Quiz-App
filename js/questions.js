import { questions } from "./index.js";
let score = 0;
export class questionsClass {
  constructor(i) {
    this.questions = questions;
    this.category = questions[i].category;
    this.question = questions[i].question;
    this.correctAnswer = questions[i].correct_answer;
    this.incorrectAnswers = questions[i].incorrect_answers;
    this.allAnswers = this.incorrectAnswers.concat(this.correctAnswer).sort();
    this.index = i;
    this.answered = false;
  }

  displayQuestion() {
    // ?Load Content
    $(".questions").html(`
       <div class="info d-flex justify-content-between mb-3">
    <div class="category text-white rounded-3 py-1 px-2 border border-1">${
      this.category
    }</div>
    <div class="qIndex rounded-3 p-1 border border-1">${this.index + 1} Of ${
      this.questions.length
    } Questions</div>
    </div>
    <p class="question fw-semibold fs-4 my-4">${this.question}</p>
    <ul class="list-unstyled d-flex flex-wrap px-5">
     ${this.allAnswers
       .map((ans) => {
         return `<li class="ans w-50 mb-3 px-2"><button class="btn border-2 rounded-pill fw-semibold w-100 ">${ans}</button></li>`;
       })
       .join("")}
    </ul>
    <div class="score fs-4"><i class="fa-regular fa-smile"></i> Score: ${score}</div>
    </div>
    `);
    let answersBtns = document.querySelectorAll(".ans button");
    for (let i = 0; i < answersBtns.length; i++) {
      answersBtns[i].addEventListener("click", (e) => {
        this.checkAnswer(e);
      });
    }
    // ?Show Question
    $(".options").hide(500, () => {
      $(".questions").show(500);
    });
  }

  checkAnswer(e) {
    if (!this.answered) {
      this.answered = true;
      if (e.target.innerHTML == this.correctAnswer) {
        e.target.classList.add("correct");
        score++;
      } else {
        e.target.classList.add("wrong");
      }
    }

    $(".questions").addClass("animate_animated", "animate__backOutLeft");

    this.nextQuestion();
  }
  nextQuestion() {
    this.index++;
    if (this.index > questions.length - 1) {
        $(".questions").hide(400);
        $(".result").show(400);
        $(".result .content").html(score==questions.length?"Congratulations":"Your Score is :"+score)
        $("#tryAgain").click(()=>location.reload())
        return;
    }

    $(".questions").addClass("animate__backOutLeft");
    let nextQ = new questionsClass(this.index);
    nextQ.displayQuestion();
  }
}
