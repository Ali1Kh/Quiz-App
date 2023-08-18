import { quiz } from "./quiz.js";
import { questionsClass } from "./questions.js";

let categoryVal, diffVal, numVal;
export let questions;


$("#start").click(start);
$("body").keypress(function (e) {
 e.keyCode == 13?start():null
});

 async function start (){
  categoryVal = $("#category").val();
  diffVal = $("#diff").val();
  numVal = $("#numQ").val();
  if (numVal != "") {
    let options = new quiz(categoryVal, diffVal, numVal);
    questions = await options.getQuestions();

    let que = new  questionsClass(0);
    que.displayQuestion();

    $(".hint").removeClass("d-block");
    $(".hint").addClass("d-none");
  } else {
    $(".hint").removeClass("d-none");
    $(".hint").addClass("d-block");
  }
}