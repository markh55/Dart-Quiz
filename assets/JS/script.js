const questions = [
    {
        question: "What is a checkout score for 156?",
        answers: [
            {text: "T19, T19, D20", correct: false},
            {text: "T20, T20, D20", correct: false},
            {text: "T20, T14, D16", correct: false},
            {text: "T20, T20, D18", correct: true}
        ]
    },
    {
        question: "How many world titles does Michael van Gerwen have?",
        answers: [
            { text: "5", correct: false },
            { text: "1", correct: false },
            { text: "0", correct: false },
            { text: "3", correct: true }
        ]
    },
    {
        question: "What is the highest possible checkout in darts?",
        answers: [
            { text: "180", correct: false },
            { text: "170", correct: true },
            { text: "160", correct: false },
            { text: "150", correct: false }
        ]
    },
    {
        question: "Who won the PDC World Championship on their debut appearance in 2018?",
        answers: [
            { text: "Nathan Aspinall", correct: false },
            { text: "Glen Durrant", correct: false },
            { text: "Rob Cross", correct: true },
            { text: "Dimitri Van Den Bergh", correct: false }
        ]
    },
    {
        question: "Which player is nicknamed Bully Boy?",
        answers: [
            { text: "Nathan Aspinall", correct: false },
            { text: "Joe Cullen", correct: false },
            { text: "Jonny Clayton", correct: false },
            { text: "Michael Smith", correct: true }
        ]
    },
    {
        question: "Which player is known for his intense stare at the dartboard and aggressive celebrations?",
        answers: [
            { text: "Adrian Lewis", correct: false },
            { text: "Gerwyn Price", correct: true },
            { text: "Jonny Clayton", correct: false },
            { text: "Danny Noppert", correct: false }
        ]
    },
    {
    question: "What is the standard height from the floor to the bullseye in professional darts?",
    answers: [
        { text: "5 feet 4 inches", correct: false },
        { text: "6 feet", correct: false },
        { text: "4 feet 10 inches", correct: false },
        { text: "5 feet 8 inches", correct: true }
    ]
},
{
question: "In professional darts, what is the “Madhouse”?",
answers: [
    { text: "Missing three darts at double 1", correct: false },
    { text: "Needing double 1 to win", correct: true },
    { text: "Scoring three consecutive busts", correct: false },
    { text: "Hitting only single 5s in a turn", correct: false }
    ]
},
{
    question: "What is the minimum number of darts needed to win a game of 501?",
    answers: [
        { text: "12", correct: false },
        { text: "6", correct: false },
        { text: "15", correct: false },
        { text: "9", correct: true }
        ]
    },
    {
        question: "Phil Taylor won a record 16 World Championships. In which year did he win his first title?",
        answers: [
            { text: "1990", correct: true },
            { text: "1995", correct: false },
            { text: "1992", correct: false },
            { text: "1998", correct: false }
            ]
        },

]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


/**
 * Resets the quiz by setting the question index and score to their original values (0). 
 * Hides the "Next" button and prepares it for the next question, and then displays the first question. 
 * This function ensures the quiz starts fresh and is ready for the user.
 */

function startQuiz() {
    currentQuestionIndex = 0; // Resets the question index to start from the first question.
    score = 0; // Resets the score to 0 for a new quiz session.
    nextButton.innerHTML = "Next"; // Sets the button text to "Next".
    nextButton.style.display = "none"; // Hides the button until an answer is selected.
    nextButton.onclick = nextQuestion; // Sets the button to call the nextQuestion function when clicked.
    showQuestion(); // Calls the showQuestion function to display the first question.
}

/**
 * Displays the current question and its answers, setting up the UI for user interaction.
 * 1. Clears previous question and answers using `resetState()`.
 * 2. Retrieves and displays the current question with its number.
 * 3. Loops through each answer, creating a button for each:
    - Sets button text, adds styling, and appends it to the container.
 * 4. If the answer is correct, adds a `data.correct` attribute.
 * 5. Adds a click event listener to each button to trigger `selectAnswer`.
 */

function showQuestion() {
    resetState(); // Clears the previous question and answers
    let currentQuestion = questions[currentQuestionIndex]; // Gets the current question
    let questionNo = currentQuestionIndex + 1; // Sets the question number
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Displays the current question number and text
    
    currentQuestion.answers.forEach(answer => { // Loops through answers and creates a button
        const button = document.createElement("button"); // Creates a new button element
        button.innerHTML = answer.text; // Sets the button text to the answer text
        button.classList.add("btn"); // Adds the "btn" class to the button for styling
        answerButtons.appendChild(button); // Appends button to the answer container
 
        if (answer.correct) { // If the answer is correct, set a data attribute
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer); // Adds an event listener to the button to call selectAnswer when clicked
    });
}

/**
 * Resets the screen by hiding the "Next" button and clearing the answer buttons.
 * 1. Hides the "Next" button so it’s not visible.
 * 2. Removes all the answer buttons from the screen.
 */

function resetState() {
    nextButton.style.display = "none"; // Hides the "Next" button
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild); // Removes all child elements from the answer container
    }
}

/**
 * Runs when the user picks an answer.
 * 1. Checks if the answer is right.
 * 2. Adds a "correct" or "incorrect" class to the button.
 * 3. Updates the score if the answer is right.
 * 4. Shows the "Next" button to move to the next question.
 */

function selectAnswer(e) { 
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true"; // Checks if the selected answer is correct

    if (isCorrect) {
        selectedBtn.classList.add("correct"); // Adds "correct" class to the button for styling
        score++; // Increases the score if the answer is correct
    } else {
        selectedBtn.classList.add("incorrect"); // Adds "incorrect" class to the button for styling
    }
    
         // Disable all buttons after an answer is selected
    const allButtons = answerButtons.querySelectorAll("button");
    allButtons.forEach(button => button.disabled = true);



    nextButton.style.display = "block"; // Display "Next" button once an answer is selected
}

/**
 * Goes to the next question or wraps up the quiz if you're out of questions.
 * - If there are more questions, it shows the next one.  
 * - If you're done, it displays your final score and a "Restart" button.  
 * - Clicking "Restart" reloads the page so you can play again.  
 */

function nextQuestion() {
    currentQuestionIndex++; // Move to the next question

    if (currentQuestionIndex < questions.length) { // If there are more questions
        showQuestion(); // Show the next question
    } else {
        questionElement.innerHTML = `Quiz Finished! Your score: ${score}/${questions.length}`; // Displays the final score
        answerButtons.innerHTML = ""; // Clears any remaining answer buttons
        nextButton.innerHTML = "Restart"; // Sets the button text to "Restart"
        nextButton.style.display = "block"; // Shows the "Restart" button
        nextButton.addEventListener("click", () => { // Adds an event listener to restart the quiz
            window.location.reload(); // Reloads the page to restart the quiz
        } );
    }
}

nextButton.onclick = startQuiz; // Starts the quiz when the page loads

startQuiz();