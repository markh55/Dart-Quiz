const questions = [
    {
        question: "What is a checkout score for 156?",
        answers: [
            {text: "T19, T19, D20", correct: false},
            {text: "T20, T20, D20", correct: false},
            {text: "T20, T14, D16", correct: false},
            {text: "T20, T20, D19", correct: true},
        ]
    },
    {
        question: "How many world titles does Michael van Gerwen have?",
        answers: [
            { text: "5", correct: false },
            { text: "1", correct: false },
            { text: "0", correct: false },
            { text: "3", correct: true },
        ]
    },
    {
        question: "What is the highest possible checkout in darts?",
        answers: [
            { text: "180", correct: false },
            { text: "170", correct: true },
            { text: "160", correct: false },
            { text: "150", correct: false },
        ]
    },
    {
        question: "Who won the PDC World Championship on their debut appearance in 2018?",
        answers: [
            { text: "Nathan Aspinall", correct: false },
            { text: "Glen Durrant", correct: false },
            { text: "Rob Cross", correct: true },
            { text: "Dimitri Van Den Bergh", correct: false },
        ]
    },
    {
        question: "Which player is nicknamed Bully Boy?",
        answers: [
            { text: "Nathan Aspinall", correct: false },
            { text: "Joe Cullen", correct: false },
            { text: "Jonny Clayton", correct: false },
            { text: "Michael Smith", correct: true },
        ]
    },
    {
        question: "Which player is known for his intense stare at the dartboard and aggressive celebrations?",
        answers: [
            { text: "Adrian Lewis", correct: false },
            { text: "Gerwyn Price", correct: true },
            { text: "Jonny Clayton", correct: false },
            { text: "Danny Noppert", correct: false },
        ]
    },
    {
    question: "What is the standard height from the floor to the bullseye in professional darts?",
    answers: [
        { text: "5 feet 4 inches", correct: false },
        { text: "6 feet", correct: false },
        { text: "4 feet 10 inches", correct: false },
        { text: "5 feet 8 inches", correct: true },
    ]
},
{
question: "In professional darts, what is the “Madhouse”?",
answers: [
    { text: "Missing three darts at double 1", correct: false },
    { text: "Needing double 1 to win", correct: true },
    { text: "Scoring three consecutive busts", correct: false },
    { text: "Hitting only single 5s in a turn", correct: false },
    ]
},
{
    question: "What is the minimum number of darts needed to win a game of 501?",
    answers: [
        { text: "12", correct: false },
        { text: "6", correct: false },
        { text: "15", correct: false },
        { text: "9", correct: true },
        ]
    },
    {
        question: "Phil Taylor won a record 16 World Championships. In which year did he win his first title?",
        answers: [
            { text: "1990", correct: true },
            { text: "1995", correct: false },
            { text: "1992", correct: false },
            { text: "1998", correct: false },
            ]
        },

]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    nextButton.onclick = nextQuestion;
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questonNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questonNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++; 
    } else {
        selectedBtn.classList.add("incorrect");
    }

    nextButton.style.display = "block";
}
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        questionElement.innerHTML = `Quiz Finished! Your score: ${score}/${questions.length}`;
        answerButtons.innerHTML = "";
        nextButton.innerHTML = "Restart";
        nextButton.style.display = "block";
        nextButton.addEventListener("click", () => {
            window.location.reload();
        } );
    }
}