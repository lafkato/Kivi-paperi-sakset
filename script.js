const choices = document.querySelectorAll('.choices img');
const resultText = document.getElementById('result-text');
const resetBtn = document.getElementById('reset-btn');
const userScoreElement = document.getElementById('user-score');
const computerScoreElement = document.getElementById('computer-score');
const fightContainer = document.getElementById('fight-container');

let userScore = 0;
let computerScore = 0;

const computerChoice = () => ['kivi', 'paperi', 'sakset'][Math.floor(Math.random() * 3)];

const determineWinner = (userChoice, compChoice) => {
    if (userChoice === compChoice) return "Tasapeli!";
    if ((userChoice === 'kivi' && compChoice === 'sakset') ||
        (userChoice === 'paperi' && compChoice === 'kivi') ||
        (userChoice === 'sakset' && compChoice === 'paperi')) return "Voitit!";
    return "Tietokone voitti!";
}

const playGame = (userChoice) => {
    const compChoice = computerChoice();
    const result = determineWinner(userChoice, compChoice);
    resultText.innerHTML = `Valitsit: ${userChoice}<br>Tietokone valitsi: ${compChoice}<br>${result}`;
    animateResult(result, userChoice, compChoice);
}

const animateResult = (result, userChoice, compChoice) => {
    resultText.classList.remove('tasapeli', 'voitit', 'tietokone-voitti');
    if (result === "Tasapeli!") {
        resultText.classList.add('tasapeli');
    } else if (result === "Voitit!") {
        resultText.classList.add('voitit');
        userScore++;
        animateScore(userScoreElement);
    } else {
        resultText.classList.add('tietokone-voitti');
        computerScore++;
        animateScore(computerScoreElement);
    }
    animateFight(userChoice, compChoice, result);
}

const animateScore = (scoreElement) => {
    scoreElement.textContent = scoreElement.id === 'user-score' ? userScore : computerScore;
    scoreElement.style.transform = 'scale(1.5)';
    setTimeout(() => {
        scoreElement.style.transform = 'scale(1)';
    }, 500);
}

const animateFight = (userChoice, compChoice, result) => {
    fightContainer.innerHTML = '';
    let userImg = document.createElement('img');
    let compImg = document.createElement('img');

    userImg.src = `${userChoice}.png`;
    compImg.src = `${compChoice}.png`;

    fightContainer.appendChild(userImg);
    fightContainer.appendChild(compImg);

    if (result === "Voitit!") {
        compImg.classList.add('explosion');
    } else if (result === "Tietokone voitti!") {
        userImg.classList.add('explosion');
    }
}

choices.forEach(choice => {
    choice.addEventListener('click', () => playGame(choice.id));
});

resetBtn.addEventListener('click', () => {
    userScore = 0;
    computerScore = 0;
    userScoreElement.textContent = '0';
    computerScoreElement.textContent = '0';
    resultText.textContent = "Valitse kivi, paperi tai sakset aloittaaksesi pelin.";
    fightContainer.innerHTML = '';
});
