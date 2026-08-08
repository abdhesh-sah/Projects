const API_URL = "https://opentdb.com/api.php?amount=50&category=21&difficulty=medium&type=multiple";

const question = document.querySelector(".question h2");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");

const buttons = [option1, option2, option3, option4];

let questions = [];
let currentIndex = 0;
let score = 0;

async function getQuestion() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        questions = data.results;
        displayQuestion();
    } catch (error) {
        question.innerHTML = "Failed to load questions. Please try again.";
    }
}

function displayQuestion() {
    const currentQuestion = questions[currentIndex];

    question.innerHTML = currentQuestion.question;

    const choices = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    choices.sort(() => Math.random() - 0.5);

    buttons.forEach((btn, index) => {
        btn.innerHTML = choices[index];
        btn.dataset.choice = choices[index];
        btn.onclick = () => checkAnswer(choices[index]);
    });
}

function checkAnswer(selectedChoice) {
    const currentQuestion = questions[currentIndex];

    buttons.forEach((btn) => {
        btn.disabled = true;
        if (btn.dataset.choice === currentQuestion.correct_answer) {
            btn.classList.add("correct");
        } else if (btn.dataset.choice === selectedChoice) {
            btn.classList.add("incorrect");
        }
    });

    if (selectedChoice === currentQuestion.correct_answer) {
        score++;
    }

    setTimeout(() => {
        buttons.forEach((btn) => {
            btn.classList.remove("correct", "incorrect");
            btn.disabled = false;
        });

        currentIndex++;

        if (currentIndex < questions.length) {
            displayQuestion();
        } else {
            question.innerHTML = `Quiz Over! Your score: ${score}/${questions.length}`;
            document.querySelector(".answer").style.display = "none";
        }
    }, 1000);
}

getQuestion();