
function buildQuiz(){
    // variable to store html outouy
    const output = [];
    //for each question
    myQuesstions.forEach( (currentQuestion, questionNumber) => {
        //variable to store their answer
        const answers = [];
        //and for each question
        for(letter in currentQuestion.answers){
            //add a html radio button 
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                </label>`
            );
        }
        // add this question and its answer to the output
        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
        );
    })
    quizContainer.innerHTML = output.join('');
};

//display right away
function showResult(){
    //gather answer containers fromour quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
    //keep track of user answer
    let numCorrect = 0;
    //for each question
    myQuesstions.forEach( (currentQuestion, questionNumber) => {
        //find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const useranswer = (answerContainer.querySelector(selector) || {}).Value;
        //if answer is correct 
        if(useranswer === currentQuestion.correctAnswer){
            //add to the number of correct answer
            numCorrect++;
            //color the answer green 
            answerContainers[questionNumber].style.color = 'green';
            console.log('correct')
        }
        //if answer is wrong
        else{
            //color the answer red
            answerContainers[questionNumber].style.color = 'red';
            console.log('wrong')
        }
    });
    //show numberof correct answers out of total
    result.innerHTML = `${numCorrect} out of ${myQuesstions.length}`;
};

const quizContainer = document.getElementById('quiz');
const result = document.getElementById('result');
const button = document.getElementById('button');
//quiz questions in an array
const myQuesstions = 
[
    {
        question: 'who invented java script?',
        answers: { 
         a: "douglas crockford", 
         b: "sheryl sandberg", 
         c: "brendan eich"
        }, 
        correctAnswer: "c"
    }, {
        question: "which one of these is a javaScript package manager?", 
        answers: { 
            a: "node.js", 
            b: "typescript", 
            c: "npm"
        }, 
        correctAnswer: "c"
    }, {
        question: "which tools can you use to ensure code quality?", 
        answers: { 
            a: "angular", 
            b: "jquery", 
            c: "reguirejs", 
            d: "eslint" 
        }, 
        correctAnswer: "d"
    }
];


buildQuiz();

//DISPLAY QUIZ ON SUBMIT
button.addEventListener("click", showResult);