const STORE = [
    {
        question: 'In what year was the original Alien released?',
        answers: ['1981','1979','1969','1977'],
        correctAnswer: '1979'
    },
    {
        question: 'What was the name of the featured ship in the movie?',
        answers: ['The Prometheus','The Nostromo','The H.R. Giger','The Morpheus'],
        correctAnswer: 'The Nostromo'
    },
    {
        question: 'What was the name of the android character?',
        answers: ['Anton','Ajax','Axle','Ash'],
        correctAnswer: 'Ash'
    },
    {
        question: 'Which character did NOT appear in the original Alien film?',
        answers: ['Dallas','Parker','Burke','Lambert'],
        correctAnswer: 'Burke'
    },
    {
        question: `What was the name of Ripley's cat?`,
        answers: ['Jones','Walter','David','Ridley'],
        correctAnswer: 'Jones'
    },
];

let score = 0;
let questionNumber = 0;

// start quiz
function startQuiz() {
    $('.start-quiz').on('click', '.start-button', function (event) {
        $('.start-quiz').hide();
        $('.status-bar').show();
        $('.quiz-block').show();
        $('.question-number').text(1);
        $('.score').text(0);
        $('.quiz-block').prepend(generateQuestion());
        console.log('button clicked to start quiz');
    });
}

// generate each question
function generateQuestion() {
    if (questionNumber < STORE.length) {
        return populateQuestion(questionNumber);
    }
    else {
        $('.quiz-block').hide();
        $('.final-review').show();
        finalReview();
    }
}

// populate the content of each question
function populateQuestion(questionIndex) {
    let currentQuestion = $(`<form method='post'>
    <fieldset>
    <legend class="current-question">${STORE[questionIndex].question}</legend>
    <ul class="test">
    </ul>
    </fieldset>
    </form>`);

    let formAppend = $(currentQuestion).find('ul');

    STORE[questionIndex].answers.forEach(function(answerValue, answerIndex) {
        $(`<li class="quiz-option">
        <label for='${answerIndex}'> 
        <input class='radio' type='radio' id='${answerIndex}' value='${answerValue}' name='answer' required>
        <span>${answerValue}</span)
        </label>
        </li>`).appendTo(formAppend);
    });

    $(`<button type='submit' class='submit-button'>Submit</button>`).appendTo(formAppend);
    
    return currentQuestion;
}

// accepts submitted answer, checks whether answer is correct
function submitAnswer() {
    $('.quiz-block').on('submit', function (event) {
        event.preventDefault();
        $('.quiz-block').hide();
        $('.answer-response').show(); 
        let selected = $('input:checked');
        let verify = selected.val();
        let correct = STORE[questionNumber].correctAnswer;
        if (verify === correct) {
            correctResponse();
        }
        else {
            wrongResponse();
        }
        console.log('answer submitted');
    });
}

// response for correct answer
function correctResponse() {
    $('.answer-response').html(
        `<h2>Correct!</h2>
        <div class="correct-image" role="image"></div>
        <p class="feedback">You're doing great!  This knowledge might save you in space!</p>
        <button class="continue-button">Next</button>`
    );
    $('.main-image').attr({
        'src': 'https://user-images.githubusercontent.com/58446465/72304882-e46c7300-3669-11ea-825b-2aa0ff6928ad.jpg',
        'alt': 'Correct answer, happy alien'
    });
    updateScore();
    console.log('message for correct answer returned');
}

// updates score value
function updateScore() {
    score++;
    $('.score').text(score);
    console.log('score updated');
}

//updates question counter
function updateQuestion() {
    questionNumber++;
    $('.question-number').text(questionNumber + 1);
    console.log('question counter updated');
}

//response for wrong answer
function wrongResponse() {
    $('.answer-response').html(
        `<h2>Oh no!  Incorrect!</h2>
        <div class="wrong-image" role="image"></div>
        <p class="feedback">The correct answer was:</p>
        <p>${STORE[questionNumber].correctAnswer}</p>
        <p class="display-correct-answer"></p>
        <button class="continue-button">Next</button>`
    );
    $('.main-image').attr({
        'src': 'https://user-images.githubusercontent.com/58446465/72304887-e9312700-3669-11ea-9353-51dfd6242618.jpg',
        'alt': 'Incorrect answer, alien attack'
    });
    console.log('message for wrong answer returned');
}

// proceeds to next question
function nextQuestion() {
    $('.answer-response').on('click', '.continue-button', function (event) {
        event.preventDefault();
        updateQuestion();
        $('.answer-response').hide();
        $('.quiz-block').show();
        $('.quiz-block form').replaceWith(generateQuestion());
        $('.main-image').attr({
            'src': 'https://m.media-amazon.com/images/M/MV5BMTg4NjEwMzg0OF5BMl5BanBnXkFtZTcwNjM2NTUyMw@@._V1_SY1000_CR0,0,734,1000_AL_.jpg)',
            'alt': 'Alien movie poster'
        });
        console.log('next question button clicked');
    });
}

// the final review showing score and option to restart
function finalReview() {
    $('.status-bar').hide();
    const great = [
        'Great job, Sergeant!',
        `You'd do just fine surviving an <i>Alien</i> movie!`
      ];
    
      const good = [
        'Not bad, Corporal!',
        'A bit rough around the edges, but you did just fine.'
      ];
    
      const bad = [
        'Shape up, Private!',
        'At this rate an alien would have you for breakafast!'
      ];
    let percentScore = (score / STORE.length) * 100;
    if (score >= 4) {
        array = great;
      } else if (score < 4 && score >= 2) {
        array = good;
      } else {
        array = bad;
      }
      return $('.final-review').html(
        `<h3>Your score is ${score} / 5  (${percentScore}%)</h3>
        <h3>${array[0]}</h3>
        <p>${array[1]}</p>
        <button type="submit" class="reset-button button">Restart</button>`
      );
      console.log('final review displayed');
}

// restarts the quiz
function restartQuiz() {
    $('.final-review').on('click', '.reset-button', function (event) {
        event.preventDefault();
        $('.final-review').hide();
        $('.start-quiz').show();
        resetStatus();
    })
    console.log('quiz restarted');
}

// reset status for question number and score
function resetStatus() {
    questionNumber = 0;
    score = 0;
    console.log('stats reset');
}

function makeQuiz() {
    startQuiz();
    submitAnswer();
    nextQuestion();
    restartQuiz();
}
  
$(makeQuiz);
