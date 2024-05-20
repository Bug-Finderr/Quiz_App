const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;
let score = 0;

const questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choices: ['<script>', '<css>', '<style>', '<span>'],
        answer: 2
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choices: ['text-color', 'font-color', 'text-style', 'color'],
        answer: 3
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choices: ['// Comment', '<!-- Comment -->', '/* Comment */', '<! Comment>'],
        answer: 1
    },
    {
        question: 'Which of the following is NOT a valid CSS property?',
        choices: ['text-color', 'font-size', 'text-align', 'font-family'],
        answer: 0
    },
    {
        question: 'Which of the following is NOT a valid CSS value?',
        choices: ['red', 'blue', 'green', 'purplish'],
        answer: 3
    },
    {
        question: 'Which of the following is NOT a valid HTML tag?',
        choices: ['<div>', '<span>', '<text>', '<body>'],
        answer: 2
    },
    {
        question: 'Which of the following is NOT a valid CSS unit?',
        choices: ['px', 'em', 'pt', 'in'],
        answer: 2
    },
    {
        question: 'Which of the following is NOT a valid CSS selector?',
        choices: ['name', 'class', 'tag', 'id'],
        answer: 0
    },
    {
        question: 'Which of the following is NOT a valid HTML attribute?',
        choices: ['href', 'src', 'class', 'type'],
        answer: 3
    },
    {
        question: 'Which of the following is NOT a valid CSS property?',
        choices: ['border-color', 'text-color', 'background-color', 'color'],
        answer: 1

    }
];

document.addEventListener('DOMContentLoaded', (event) => {
    startGame();
});

const questionNumberElement = document.getElementById('question-number');
const scoreElement = document.getElementById('score-number');
const progressBarFull = document.getElementById('progress-bar-full');

function startGame() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    questionContainerElement.classList.remove('hide');
    localStorage.setItem('totalQuestions', questions.length);
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    questionNumberElement.innerText = `Question ${currentQuestionIndex + 1}/${questions.length}`;
    progressBarFull.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.choices.forEach((choice, index) => {
        const optionButton = document.createElement('div');
        optionButton.classList.add('option-btn');

        const option = document.createElement('div');
        option.classList.add('option');
        option.innerText = String.fromCharCode(65 + index);

        const answerChoice = document.createElement('div');
        answerChoice.classList.add('answer-choice');
        answerChoice.innerText = choice;

        optionButton.appendChild(option);
        optionButton.appendChild(answerChoice);

        if (index === question.answer) {
            optionButton.dataset.correct = true;
        }

        optionButton.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(optionButton);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target.closest('.option-btn');
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
        scoreElement.innerText = `${score}`;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    setTimeout(() => {
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            currentQuestionIndex++;
            setNextQuestion();
        } else {
            localStorage.setItem('mostRecentScore', score);
            window.location.assign('end.html');
        }
    }, 1500); // 1000ms delay before proceeding
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
